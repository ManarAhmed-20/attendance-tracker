"use client";

import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from "react";
import { Student, StudentStatus, FilterTab } from "@/types";
import { initialStudents } from "@/utils/mockData";

// Extended student type internally to track initial baseline absence rate
export interface AttendanceStudent extends Student {
  baseAbsenceRate: number; // Baseline cumulative rate before current session adjustment
}

interface AttendanceState {
  students: AttendanceStudent[];
  searchQuery: string;
  activeTab: FilterTab;
  toastMessage: string | null;
}

type Action =
  | { type: "SET_STUDENTS"; payload: AttendanceStudent[] }
  | { type: "UPDATE_STATUS"; payload: { id: number; status: StudentStatus } }
  | { type: "MARK_ALL_PRESENT" }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_TAB"; payload: FilterTab }
  | { type: "SET_TOAST"; payload: string | null };

const AttendanceContext = createContext<{
  state: AttendanceState;
  updateStatus: (id: number, status: StudentStatus) => void;
  markAllPresent: () => void;
  setSearchQuery: (query: string) => void;
  setActiveTab: (tab: FilterTab) => void;
  stats: { total: number; present: number; absent: number; late: number; warning: number };
  filteredStudents: AttendanceStudent[];
} | null>(null);

// Calculate cumulative rate based on 20 sessions per semester (+5% if absent in current session)
function calculateDynamicAbsence(baseRate: number, status: StudentStatus): number {
  if (status === "Absent") {
    return Math.min(100, baseRate + 5); // Add 5% for current session absence
  }
  return baseRate;
}

function attendanceReducer(state: AttendanceState, action: Action): AttendanceState {
  switch (action.type) {
    case "SET_STUDENTS":
      return { ...state, students: action.payload };

    case "UPDATE_STATUS": {
      const updated = state.students.map((student) => {
        if (student.id === action.payload.id) {
          const newStatus = action.payload.status;
          const newAbsenceRate = calculateDynamicAbsence(student.baseAbsenceRate, newStatus);
          return {
            ...student,
            status: newStatus,
            absenceRate: newAbsenceRate,
          };
        }
        return student;
      });
      return { ...state, students: updated };
    }

    case "MARK_ALL_PRESENT": {
      const updated = state.students.map((student) => ({
        ...student,
        status: "Present" as StudentStatus,
        absenceRate: student.baseAbsenceRate,
      }));
      return { ...state, students: updated };
    }

    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };

    case "SET_TAB":
      return { ...state, activeTab: action.payload };

    case "SET_TOAST":
      return { ...state, toastMessage: action.payload };

    default:
      return state;
  }
}

const STORAGE_KEY = "attendance_tracker_v3_data";

export const AttendanceProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize baseAbsenceRate alongside initial data
  const initialData: AttendanceStudent[] = useMemo(
    () =>
      initialStudents.map((s) => ({
        ...s,
        baseAbsenceRate: s.status === "Absent" ? Math.max(0, s.absenceRate - 5) : s.absenceRate,
      })),
    []
  );

  const [state, dispatch] = useReducer(attendanceReducer, {
    students: initialData,
    searchQuery: "",
    activeTab: "all",
    toastMessage: null,
  });

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        dispatch({ type: "SET_STUDENTS", payload: JSON.parse(saved) });
      } catch (e) {
        console.error("Failed to parse stored data:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.students));
  }, [state.students]);

  const updateStatus = useCallback((id: number, status: StudentStatus) => {
    dispatch({ type: "UPDATE_STATUS", payload: { id, status } });
    const student = state.students.find((s) => s.id === id);
    const statusText = status === "Present" ? "حاضر" : status === "Absent" ? "غائب (+5%)" : "متأخر";

    dispatch({ type: "SET_TOAST", payload: `تم تحديد ${student?.name || "الطالب"} كـ (${statusText})` });

    setTimeout(() => {
      dispatch({ type: "SET_TOAST", payload: null });
    }, 2500);
  }, [state.students]);

  const markAllPresent = useCallback(() => {
    dispatch({ type: "MARK_ALL_PRESENT" });
    dispatch({ type: "SET_TOAST", payload: "تم تحويل جميع الطلاب إلى حالة (حاضر) وإعادة ضبط نسبة الحصة" });

    setTimeout(() => {
      dispatch({ type: "SET_TOAST", payload: null });
    }, 2500);
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: "SET_SEARCH", payload: query });
  }, []);

  const setActiveTab = useCallback((tab: FilterTab) => {
    dispatch({ type: "SET_TAB", payload: tab });
  }, []);

  const stats = useMemo(() => {
    let present = 0, absent = 0, late = 0, warning = 0;
    for (const s of state.students) {
      if (s.status === "Present") present++;
      if (s.status === "Absent") absent++;
      if (s.status === "Late") late++;
      if (s.absenceRate > 15) warning++;
    }
    return {
      total: state.students.length,
      present: present + late,
      absent,
      late,
      warning,
    };
  }, [state.students]);

  const filteredStudents = useMemo(() => {
    const query = state.searchQuery.trim().toLowerCase();

    return state.students.filter((student) => {
      const matchesSearch = student.name.toLowerCase().includes(query);
      if (!matchesSearch) return false;

      if (state.activeTab === "present") return student.status === "Present" || student.status === "Late";
      if (state.activeTab === "absent") return student.status === "Absent";
      if (state.activeTab === "late") return student.status === "Late";
      if (state.activeTab === "warning") return student.absenceRate > 15;

      return true;
    });
  }, [state.students, state.searchQuery, state.activeTab]);

  const value = useMemo(
    () => ({
      state,
      updateStatus,
      markAllPresent,
      setSearchQuery,
      setActiveTab,
      stats,
      filteredStudents,
    }),
    [state, updateStatus, markAllPresent, setSearchQuery, setActiveTab, stats, filteredStudents]
  );

  return <AttendanceContext.Provider value={value}>{children}</AttendanceContext.Provider>;
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) throw new Error("useAttendance must be used within AttendanceProvider");
  return context;
};