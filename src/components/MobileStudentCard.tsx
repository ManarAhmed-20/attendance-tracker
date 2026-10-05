"use client";
import React, { memo } from "react";
import { Student } from "@/types";
import { useAttendance } from "@/context/AttendanceContext";
import { AlertTriangle, Check, X, Clock } from "lucide-react";

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] || "";
  const father = parts[1]?.[0] || "";
  return father ? `${first}.${father}` : first;
}

export const MobileStudentCard = memo(function MobileStudentCard({
  student,
}: {
  student: Student;
}) {
  const { updateStatus } = useAttendance();
  const isHighAbsence = student.absenceRate > 15;
  const avatarText = getInitials(student.name);
//   const academicNumber = 841000 + student.id;

  return (
    <div
      className={`relative w-full bg-white rounded-2xl border p-4 shadow-xs flex flex-col gap-3.5 overflow-hidden transition-all ${
        isHighAbsence ? "border-rose-200" : "border-slate-200/80"
      }`}
    >
      {/* الخط الأحمر العلوي لكروت التحذير */}
      {isHighAbsence && (
        <div className="absolute top-0 right-0 left-0 h-1 bg-rose-500" />
      )}

      {/* 1. الجزء العلوي: الأفاتار، الاسم، والشارة */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border ${
              isHighAbsence
                ? "bg-purple-50 text-purple-700 border-purple-100"
                : "bg-blue-50 text-blue-700 border-blue-100"
            }`}
          >
            {avatarText}
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-slate-800 leading-snug">
              {student.name}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {/* رقم أكاديمي: {academicNumber} */}
            </p>
          </div>
        </div>

        {/* شارة الحالة[cite: 3] */}
        <div className="shrink-0">
          {isHighAbsence ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-rose-50 text-rose-700 text-[11px] font-bold rounded-lg border border-rose-100">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              تنبيه حرمان وشيك
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-50 text-slate-500 text-[11px] font-medium rounded-lg border border-slate-200/60">
              <Check className="w-3.5 h-3.5 text-slate-400" />
              سجل مستقر
            </span>
          )}
        </div>
      </div>

      {/* 2. الجزء الأوسط: معدل الغياب وشريط التقدم[cite: 3] */}
      <div
        className={`p-2.5 rounded-xl flex flex-col gap-1.5 ${
          isHighAbsence ? "bg-rose-50/40" : "bg-slate-50/80"
        }`}
      >
        <div className="flex justify-between items-center text-xs font-semibold">
          <span className="text-slate-500">معدل الغياب التراكمي:</span>
          <span
            className={isHighAbsence ? "text-rose-600 font-bold" : "text-slate-700 font-bold"}
          >
            {student.absenceRate}%
          </span>
        </div>
        <div className="w-full bg-slate-200/70 rounded-full h-1.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isHighAbsence ? "bg-rose-500" : "bg-emerald-400"
            }`}
            style={{ width: `${Math.min(student.absenceRate * 3, 100)}%` }}
          ></div>
        </div>
      </div>

      {/* 3. الجزء السفلي: أزرار الحالة الثلاثة[cite: 3] */}
      <div className="grid grid-cols-3 gap-2 pt-0.5">
        <button
          onClick={() => updateStatus(student.id, "Present")}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            student.status === "Present"
              ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-xs"
              : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
          }`}
        >
          <Check className="w-4 h-4 stroke-[2.5]" /> حاضر
        </button>

        <button
          onClick={() => updateStatus(student.id, "Absent")}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            student.status === "Absent"
              ? "bg-rose-50 border-rose-500 text-rose-700 shadow-xs"
              : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
          }`}
        >
          <X className="w-4 h-4 stroke-[2.5]" /> غائب
        </button>

        <button
          onClick={() => updateStatus(student.id, "Late")}
          className={`flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
            student.status === "Late"
              ? "bg-amber-50 border-amber-500 text-amber-700 shadow-xs"
              : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"
          }`}
        >
          <Clock className="w-4 h-4 stroke-[2.5]" /> متأخر
        </button>
      </div>
    </div>
  );
});