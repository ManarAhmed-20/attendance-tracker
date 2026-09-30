"use client";

import { AttendanceProvider, useAttendance } from "@/context/AttendanceContext";
import { HeaderBar } from "@/components/HeaderBar";
import { StatsCards } from "@/components/StatsCards";
import { SearchAndFilters } from "@/components/SearchAndFilters";
import { StudentItem } from "@/components/StudentItem";
import { Toast } from "@/components/Toast";

function DashboardContent() {
  const { filteredStudents } = useAttendance();

  return (
    <main className="h-screen w-screen overflow-hidden bg-slate-50 text-slate-900 p-4 md:p-6 flex flex-col font-sans" dir="rtl">
      <div className="max-w-6xl w-full mx-auto flex flex-col h-full">
        {/* Header & Quick Actions */}
        <HeaderBar />

        {/* Dynamic Counters */}
        <StatsCards />

        {/* Search Bar & Filter Tabs */}
        <SearchAndFilters />

        {/* Scrollable Table Container */}
        <div className="flex-1 bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden flex flex-col">
          <div className="overflow-y-auto flex-1 scrollbar-thin">
            <table className="w-full text-right border-collapse">
              <thead className="bg-slate-50/80 sticky top-0 z-10 border-b border-gray-200/80 backdrop-blur-xs text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3 px-4">بيانات الطالب الأكاديمية</th>
                  <th className="py-3 px-4">معدل الغياب التراكمي</th>
                  <th className="py-3 px-4 hidden sm:table-cell">حالة المتابعة</th>
                  <th className="py-3 px-4 text-left">رصد الحصة الحالية</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-slate-400 text-xs">
                      لا توجد نتائج تطابق خيارات البحث الحالية.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => (
                    <StudentItem key={student.id} student={student} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Toast />
    </main>
  );
}

export default function Home() {
  return (
    <AttendanceProvider>
      <DashboardContent />
    </AttendanceProvider>
  );
}