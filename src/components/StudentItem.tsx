"use client";

import React, { memo } from "react";
import { Student } from "@/types";
import { useAttendance } from "@/context/AttendanceContext";
import { AlertTriangle, CheckCircle2, XCircle, Clock } from "lucide-react";

// Helper function to extract initials: First letter of First Name + First letter of Father Name
function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const father = parts[1]?.[0] || "";
  return father ? `${first}.${father}` : first;
}

export const StudentItem = memo(function StudentItem({ student }: { student: Student }) {
  const { updateStatus } = useAttendance();
  const isHighAbsence = student.absenceRate > 15;
  const avatarText = getInitials(student.name);

  return (
    <tr className="border-b border-gray-100 hover:bg-slate-50/60 transition-colors">
      {/* 1. Student Info & Auto Avatar */}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-200">
            {avatarText}
          </div>
          <h4 className="text-xs md:text-sm font-semibold text-slate-800">{student.name}</h4>
        </div>
      </td>

      {/* 2. Cumulative Absence Rate */}
      <td className="py-3.5 px-4 min-w-[130px]">
        <div className="flex items-center gap-2">
          <span className={`text-xs font-bold ${isHighAbsence ? "text-rose-600" : "text-slate-700"}`}>
            {student.absenceRate}%
          </span>
          <div className="w-16 bg-gray-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full ${isHighAbsence ? "bg-rose-500" : "bg-emerald-500"}`}
              style={{ width: `${Math.min(student.absenceRate * 3, 100)}%` }}
            ></div>
          </div>
        </div>
      </td>

      {/* 3. Smart Warning Badge */}
      <td className="py-3.5 px-4 hidden sm:table-cell">
        {isHighAbsence ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-medium rounded-lg">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            تنبيه حرمان وشيك (متابعة)
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 text-slate-600 text-[11px] font-medium rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            سجل مستقر
          </span>
        )}
      </td>

      {/* 4. Current Session Status Switcher */}
      <td className="py-3.5 px-4 text-left">
        <div className="inline-flex items-center bg-gray-100/90 p-1 rounded-xl gap-1">
          <button
            onClick={() => updateStatus(student.id, "Present")}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              student.status === "Present"
                ? "bg-white text-emerald-700 shadow-xs border border-emerald-200"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            حاضر
          </button>

          <button
            onClick={() => updateStatus(student.id, "Absent")}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              student.status === "Absent"
                ? "bg-rose-600 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            غائب
          </button>

          <button
            onClick={() => updateStatus(student.id, "Late")}
            className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              student.status === "Late"
                ? "bg-amber-500 text-white shadow-xs"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            متأخر
          </button>
        </div>
      </td>
    </tr>
  );
});