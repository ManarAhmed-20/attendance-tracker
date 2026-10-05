"use client";

import React, { useState } from "react";
import { useAttendance } from "@/context/AttendanceContext";
import { Save, AlertTriangle, FileSpreadsheet } from "lucide-react";

export function SaveSessionButton() {
  const { state, stats, saveSession } = useAttendance();
  const [isOpen, setIsOpen] = useState(false);

  // دالة تحويل البيانات إلى CSV وتحميلها
  const downloadCSV = () => {
    // 1. تجهيز عناوين الأعمدة
    const headers = ["الرقم", "اسم الطالب", "حالة الحضور", "نسبة الغياب التراكمية (%)"];
    
    // 2. تجهيز الصفوف
    const rows = state.students.map((student) => {
      const statusAr = 
        student.status === "Present" ? "حاضر" : 
        student.status === "Absent" ? "غائب" : "متأخر";
      
      return `${student.id},"${student.name}",${statusAr},${student.absenceRate}%`;
    });

    // 3. دمج العناوين مع الصفوف وإضافة BOM لدعم اللغة العربية في Excel
    const csvContent = "\uFEFF" + [headers.join(","), ...rows].join("\n");
    
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    
    const date = new Date().toLocaleDateString('en-GB').replace(/\//g, '-');
    link.setAttribute("href", url);
    link.setAttribute("download", `تقرير_الحضور_${date}.csv`);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleConfirm = () => {
    saveSession();
    setIsOpen(false);
  };

  const handleConfirmAndExport = () => {
    downloadCSV();
    saveSession();
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm hover:shadow active:scale-95 cursor-pointer"
      >
        <Save className="w-4 h-4" />
        حفظ الرصد
      </button>

      {/* (Modal) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div 
            className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200" 
            dir="rtl"
          >
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-2">تأكيد حفظ سجل الحضور</h3>
              <p className="text-sm text-slate-600 mb-5">
                هل أنت متأكد من حفظ نتائج هذه الجلسة؟ سيتم تثبيت نسب الغياب بشكل دائم وتجهيز السجل للحصة القادمة.
              </p>

              <div className="bg-slate-50 p-4 rounded-xl mb-6 space-y-3 border border-slate-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">إجمالي الحضور والمتأخرين:</span>
                  <span className="font-bold text-emerald-600">{stats.present} طالب</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-slate-600 font-medium">إجمالي الغياب:</span>
                  <span className="font-bold text-rose-600">{stats.absent} طالب</span>
                </div>
                
                {stats.warning > 0 && (
                  <div className="flex justify-between items-center text-sm pt-3 mt-1 border-t border-slate-200">
                    <span className="text-slate-600 font-medium flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-rose-500" />
                      طلاب تجاوزوا نسبة الخطر:
                    </span>
                    <span className="font-bold text-rose-600">{stats.warning}</span>
                  </div>
                )}
              </div>

              {/* أزرار التحكم */}
              <div className="flex flex-col gap-2">
                <button
                  onClick={handleConfirmAndExport}
                  className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  حفظ وتنزيل كـ CSV
                </button>
                
                <div className="flex gap-2 mt-1">
                  <button
                    onClick={handleConfirm}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                  >
                    حفظ فقط
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 py-2.5 rounded-xl text-sm font-semibold transition-colors cursor-pointer"
                  >
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}