"use client";

import React from "react";
import { useAttendance } from "@/context/AttendanceContext";
import { Clock, Check } from "lucide-react";
import { SaveSessionButton } from "./SaveSessionButton";

export function HeaderBar() {
  const { markAllPresent } = useAttendance();

  return (
    <header dir="rtl" className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 mb-4 md:mb-0 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        
        {/* الجزء الأيمن (في المنتصف للموبايل، وعلى اليمين للديسكتوب) */}
        <div className="flex flex-col  md:text-right w-full md:w-auto">
          
          {/* الشارات العلوية والوقت (فوق بعض في الموبايل وبجوار بعض في الديسكتوب) */}
          <div className="flex flex-col md:flex-row  gap-2 md:gap-3 mb-3 md:mb-2 text-[13px] md:text-xs">
            
            {/* الشارة الزرقاء */}
            <div className="inline-flex  gap-1.5 px-3 py-1 bg-[#F4F7FF] border border-blue-100 rounded-full text-blue-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
              <span>الصف الثالث ثانوي (أ) • فيزياء 1 • الحصة الثالثة</span>
            </div>
            
            {/* الوقت والتاريخ */}
            <div className="flex  gap-1.5 text-slate-400 mt-1 md:mt-0 font-medium">
              <Clock className="w-4 h-4 md:w-3.5 md:h-3.5 shrink-0" />
              <span>الأحد، 15 أكتوبر 2023 - 09:45 ص</span>
            </div>
          </div>

          {/* العنوان الرئيسي */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            رصد الحضور الصفي
          </h1>

          {/* النص الوصفي (ظاهر في الموبايل ومُنسق في المنتصف)[cite: 3] */}
          <p className="text-[13px] md:text-sm text-slate-500 max-w-[340px] md:max-w-2xl leading-relaxed">
            قم بتسجيل وتعديل حالة الطلاب في الحصة الحالية، ومزامنة الحالات مباشرة مع النظام الأكاديمي المركزي وولي الأمر.
          </p>
        </div>

        {/* الجزء الأيسر: الأزرار */}
        <div className="flex flex-row items-center gap-2 self-stretch md:self-center mt-3 md:mt-0">
          
          {/* إخفاء زر الحفظ في الموبايل وعرضه في الديسكتوب فقط[cite: 3] */}
          <div className="hidden md:block">
            <SaveSessionButton />
          </div>
          
          {/* زر تحديد الكل حاضر[cite: 3] */}
          <button
            onClick={markAllPresent}
            className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 md:py-2 bg-white hover:bg-emerald-50 border border-emerald-400 rounded-xl text-emerald-700 text-sm font-bold shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <span>تحديد الكل حاضر</span>
            <Check className="w-4 h-4 font-bold stroke-[3]" />
          </button>
        </div>
      </div>
    </header>
  );
}