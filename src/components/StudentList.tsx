"use client";
import React from "react";
import { Student } from "@/types";
import { MobileStudentCard } from "./MobileStudentCard";
import { DesktopStudentRow } from "./DesktopStudentRow";

export function StudentList({ students }: { students: Student[] }) {
  return (
    <div className="w-full">
      
      {/* 📱 1. كروت الموبايل (خارج عنصر الجدول تماماً) */}
      <div className="flex flex-col gap-3.5 md:hidden w-full">
        {students.map((student) => (
          <MobileStudentCard key={student.id} student={student} />
        ))}
      </div>

      {/* 💻 2. جدول الديسكتوب (يحتوي فقط على table/tbody/tr/td) */}
      <div className="hidden md:block bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-xs font-semibold">
              <th className="py-3.5 px-4">بيانات الطالب الأكاديمية</th>
              <th className="py-3.5 px-4">معدل الغياب التراكمي</th>
              <th className="py-3.5 px-4">حالة السجل</th>
              <th className="py-3.5 px-4 text-left">الإجراء</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.map((student) => (
              <DesktopStudentRow key={student.id} student={student} />
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}