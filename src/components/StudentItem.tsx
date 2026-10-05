"use client";

import React, { memo } from "react";
import { Student } from "@/types";
import { useAttendance } from "@/context/AttendanceContext";
import { AlertTriangle, CheckCircle2, XCircle, Clock } from "lucide-react";

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
  // رقم أكاديمي وهمي للتجربة بناءً على الـ ID
  const academicNumber = 841000 + student.id; 

  return (
    <tr 
      className={`
        block md:table-row relative overflow-hidden transition-colors
        mb-3 md:mb-0 p-4 md:p-0 
        bg-white md:bg-transparent md:hover:bg-slate-50/60
        border md:border-b md:border-0 
        rounded-2xl md:rounded-none shadow-sm md:shadow-none
        ${isHighAbsence ? 'border-rose-200 md:border-gray-100' : 'border-gray-100'}
      `}
    >
      {/* ========================================= */}
      {/* 📱 1. تصميم الموبايل (كارت مستقل) */}
      {/* ========================================= */}
      <td className="block md:hidden">
        {/* الجزء العلوي: الصورة، الاسم، والتحذير */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border ${isHighAbsence ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>
              {avatarText}
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">{student.name}</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">رقم أكاديمي: {academicNumber}</p>
            </div>
          </div>
          <div>
            {isHighAbsence ? (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-rose-50 text-rose-700 text-[10px] font-bold rounded-lg border border-rose-100">
                <AlertTriangle className="w-3 h-3 text-rose-600" />
                تنبيه حرمان وشيك
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-slate-50 text-slate-500 text-[10px] font-medium rounded-lg border border-slate-100">
                <CheckCircle2 className="w-3 h-3 text-slate-400" />
                سجل مستقر
              </span>
            )}
          </div>
        </div>

        {/* الجزء الأوسط: معدل الغياب */}
        <div className="mb-4">
          <div className="flex justify-between items-center text-[11px] font-medium mb-2">
            <span className="text-slate-500">معدل الغياب التراكمي:</span>
            <span className={`font-bold ${isHighAbsence ? "text-rose-600" : "text-emerald-600"}`}>{student.absenceRate}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-1.5 rounded-full ${isHighAbsence ? "bg-rose-500" : "bg-emerald-500"}`}
              style={{ width: `${Math.min(student.absenceRate * 3, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* الجزء السفلي: أزرار الحالة */}
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => updateStatus(student.id, "Present")}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${student.status === "Present" ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-xs" : "bg-white border-gray-200 text-slate-400 hover:border-emerald-200"}`}
          >
            <CheckCircle2 className="w-4 h-4" /> حاضر
          </button>
          <button
            onClick={() => updateStatus(student.id, "Absent")}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${student.status === "Absent" ? "bg-rose-50 border-rose-500 text-rose-700 shadow-xs" : "bg-white border-gray-200 text-slate-400 hover:border-rose-200"}`}
          >
            <XCircle className="w-4 h-4" /> غائب
          </button>
          <button
            onClick={() => updateStatus(student.id, "Late")}
            className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all border ${student.status === "Late" ? "bg-amber-50 border-amber-500 text-amber-700 shadow-xs" : "bg-white border-gray-200 text-slate-400 hover:border-amber-200"}`}
          >
            <Clock className="w-4 h-4" /> متأخر
          </button>
        </div>
      </td>

      {/* ========================================= */}
      {/* 💻 2. تصميم الديسكتوب (جدول عادي - لم يتغير) */}
      {/* ========================================= */}
      <td className="hidden md:table-cell py-3.5 px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs shrink-0 border border-blue-200">
            {avatarText}
          </div>
          <h4 className="text-sm font-semibold text-slate-800">{student.name}</h4>
        </div>
      </td>

      <td className="hidden md:table-cell py-3.5 px-4 min-w-[130px]">
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

      <td className="hidden md:table-cell py-3.5 px-4">
        {isHighAbsence ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 border border-rose-200 text-rose-700 text-[11px] font-medium rounded-lg">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" /> تنبيه حرمان
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 text-slate-600 text-[11px] font-medium rounded-lg">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0" /> سجل مستقر
          </span>
        )}
      </td>

      <td className="hidden md:table-cell py-3.5 px-4 text-left">
        <div className="inline-flex items-center bg-gray-100/90 p-1 rounded-xl gap-1">
          <button onClick={() => updateStatus(student.id, "Present")} className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${student.status === "Present" ? "bg-white text-emerald-700 shadow-xs border border-emerald-200" : "text-slate-500 hover:text-slate-800"}`}>
            حاضر
          </button>
          <button onClick={() => updateStatus(student.id, "Absent")} className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${student.status === "Absent" ? "bg-rose-600 text-white shadow-xs" : "text-slate-500 hover:text-slate-800"}`}>
            غائب
          </button>
          <button onClick={() => updateStatus(student.id, "Late")} className={`flex items-center gap-1 px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${student.status === "Late" ? "bg-amber-500 text-white shadow-xs" : "text-slate-500 hover:text-slate-800"}`}>
            متأخر
          </button>
        </div>
      </td>
    </tr>
  );
});