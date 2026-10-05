"use client";

import React from "react";
import { useAttendance } from "@/context/AttendanceContext";
import { Clock, CheckCheck } from "lucide-react";
import { SaveSessionButton } from "./SaveSessionButton";

export function HeaderBar() {
  const { markAllPresent } = useAttendance();

  return (
    <header dir="rtl" className="bg-white rounded-2xl border border-slate-200/80 p-4 sm:p-5 md:p-6 mb-1 sm:mb-2 md:mb-0 shadow-2xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        {/* Right Side: Title & Badges */}
        <div className="flex flex-col items-start text-right">
          {/* Top Badges & Time */}
          <div className="flex flex-wrap items-center gap-2 mb-1.5 sm:mb-2 text-[11px] sm:text-xs">
            <div className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 bg-blue-50/80 border border-blue-100 rounded-full text-blue-900 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"></span>
              <span>الصف الثالث ثانوي (أ) • فيزياء 1 • الحصة الثالثة</span>
            </div>
            <div className="flex items-center gap-1 text-slate-400 font-normal">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>الأحد، 15 أكتوبر 2023 - 09:45 صباحاً</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1">
            رصد الحضور الصفي التفاعلي
          </h1>

          {/* Subtitle Description */}
          <p className="text-xs md:text-sm text-slate-500 max-w-2xl hidden sm:block">
            قم بتسجيل وتعديل حالة الطلاب في الحصة الحالية، ومزامنة الحالات مباشرة مع النظام الأكاديمي المركزي وولي الأمر.
          </p>
        </div>

        {/* Left Side: Actions */}
        <div className="flex flex-row items-center gap-2 self-stretch sm:self-center mt-3 sm:mt-0">
          <SaveSessionButton />
          
          <button
            onClick={markAllPresent}
            className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-xs font-semibold shadow-2xs transition-all active:scale-98 cursor-pointer"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600 font-bold" />
            <span>تحديد الكل حاضر</span>
          </button>
        </div>
      </div>
    </header>
  );
}