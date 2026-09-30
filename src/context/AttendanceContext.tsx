"use client";

import React, { createContext, useContext, useReducer, useEffect, useMemo, useCallback } from "react";
import { Student, StudentStatus } from "@/types";
import { initialStudents } from "@/utils/mockData";

interface AttendanceState {
  students: Student[];
  searchQuery: string;
  toastMessage: string | null;
}

type Action =
  | { type: "SET_STUDENTS"; payload: Student[] }
  | { type: "UPDATE_STATUS"; payload: { id: number; status: StudentStatus } }
  | { type: "MARK_ALL_PRESENT" }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_TOAST"; payload: string | null };

const AttendanceContext = createContext<{
  state: AttendanceState;
  updateStatus: (id: number, status: StudentStatus) => void;
  markAllPresent: () => void;
  setSearchQuery: (query: string) => void;
  stats: { total: number; present: number; absent: number; late: number };
  filteredStudents: Student[];
} | null>(null);

function attendanceReducer(state: AttendanceState, action: Action): AttendanceState {
  switch (action.type) {
    case "SET_STUDENTS":
      return { ...state, students: action.payload };
    case "UPDATE_STATUS": {
      const updated = state.students.map((s) =>
        s.id === action.payload.id ? { ...s, status: action.payload.status } : s
      );
      return { ...state, students: updated };
    }
    case "MARK_ALL_PRESENT": {
      const updated = state.students.map((s) => ({ ...s, status: "Present" as StudentStatus }));
      return { ...state, students: updated };
    }
    case "SET_SEARCH":
      return { ...state, searchQuery: action.payload };
    case "SET_TOAST":
      return { ...state, toastMessage: action.payload };
    default:
      return state;
  }
}

const STORAGE_KEY = "attendance_tracker_data";

export const AttendanceProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(attendanceReducer, {
    students: initialStudents,
    searchQuery: "",
    toastMessage: null,
  });

  // Load persistence
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        dispatch({ type: "SET_STUDENTS", payload: JSON.parse(saved) });
      } catch (e) {
        console.error("Failed to parse localStorage data", e);
      }
    }
  }, []);

  // Save persistence
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.students));
  }, [state.students]);

  // Stable Callbacks to avoid child re-renders
  const updateStatus = useCallback((id: number, status: StudentStatus) => {
    dispatch({ type: "UPDATE_STATUS", payload: { id, status } });
    const student = state.students.find((s) => s.id === id);
    const statusText = status === "Present" ? "حاضر" : status === "Absent" ? "غائب" : "متأخر";
    dispatch({ type: "SET_TOAST", payload: `تم تحديث حالة ${student?.name || ''} إلى ${statusText}` });
  }, [state.students]);

  const markAllPresent = useCallback(() => {
    dispatch({ type: "MARK_ALL_PRESENT" });
    dispatch({ type: "SET_TOAST", payload: "تم تحديد جميع الطلاب كـ حاضر بنجاح" });
  }, []);

  const setSearchQuery = useCallback((query: string) => {
    dispatch({ type: "SET_SEARCH", payload: query });
  }, []);

  // Performance-optimized derived values
  const stats = useMemo(() => {
    const total = state.students.length;
    let present = 0, absent = 0, late = 0;
    for (const s of state.students) {
      if (s.status === "Present") present++;
      else if (s.status === "Absent") absent++;
      else if (s.status === "Late") late++;
    }
    return { total, present, absent, late };
  }, [state.students]);

  const filteredStudents = useMemo(() => {
    const query = state.searchQuery.trim().toLowerCase();
    if (!query) return state.students;
    return state.students.filter((s) => s.name.toLowerCase().includes(query));
  }, [state.students, state.searchQuery]);

  const value = useMemo(
    () => ({ state, updateStatus, markAllPresent, setSearchQuery, stats, filteredStudents }),
    [state, updateStatus, markAllPresent, setSearchQuery, stats, filteredStudents]
  );

  return <AttendanceContext.Provider value={value}>{children}</AttendanceContext.Provider>;
};

export const useAttendance = () => {
  const context = useContext(AttendanceContext);
  if (!context) throw new Error("useAttendance must be used within AttendanceProvider");
  return context;
};