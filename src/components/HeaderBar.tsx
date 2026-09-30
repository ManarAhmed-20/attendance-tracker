"use client";

import React from "react";
import { useAttendance } from "@/context/AttendanceContext";

export function HeaderBar() {
  const { markAllPresent } = useAttendance();

  return (
    <header dir="rtl" className="bg-white rounded-2xl border border-slate-200/80 p-5 md:p-6 mb-5 shadow-2xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Right Side: Title & Badges */}
        <div className="flex flex-col items-start text-right">
          {/* Top Badges & Time */}
          <div className="flex flex-wrap items-center gap-2 mb-2 text-xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50/80 border border-blue-100 rounded-full text-blue-900 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span>الصف الثالث ثانوي (أ) • فيزياء 1 • الحصة الثالثة</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 font-normal">
              <span>🕒</span>
              <span>الأحد، 15 أكتوبر 2023 - 09:45 صباحاً</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            رصد الحضور الصفي التفاعلي
          </h1>

          {/* Subtitle Description */}
          <p className="text-xs md:text-sm text-slate-500 max-w-2xl">
            قم بتسجيل وتعديل حالة الطلاب في الحصة الحالية، ومزامنة الحالات مباشرة مع النظام الأكاديمي المركزي وولي الأمر.
          </p>
        </div>

        {/* Left Side: Mark All Present Button */}
        <div className="flex items-center self-start md:self-center">
          <button
            onClick={markAllPresent}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold shadow-2xs transition-all active:scale-98 cursor-pointer"
          >
            <span className="text-emerald-600 font-bold text-sm">✓✓</span>
            <span>تحديد الكل حاضر</span>
          </button>
        </div>
      </div>
    </header>
  );
}