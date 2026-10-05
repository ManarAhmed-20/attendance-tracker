"use client";

import React from "react";
import { RefreshCw } from "lucide-react";
import { SaveSessionButton } from "./SaveSessionButton";

export function StickyMobileBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-slate-200 p-3 pb-safe shadow-[0_-10px_20px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto">
        {/* حالة المزامنة من الصورة */}
        <div className="flex items-center gap-2.5">
          <div className="bg-emerald-50 p-2 rounded-full border border-emerald-100">
            <RefreshCw className="w-4 h-4 text-emerald-600 animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-slate-700">المزامنة التلقائية</span>
            <span className="text-[9px] text-slate-400">آخر تحديث منذ ثوانٍ</span>
          </div>
        </div>

        {/* زر الحفظ (نستخدم نفس الزر مع إعطائه عرض كامل وحجم مناسب) */}
        <div className="w-[140px] [&>button]:w-full [&>button]:justify-center [&>button]:py-2.5">
          <SaveSessionButton />
        </div>
      </div>
    </div>
  );
}