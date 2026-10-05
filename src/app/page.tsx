"use client";

import { AttendanceProvider, useAttendance } from "@/context/AttendanceContext";
import { HeaderBar } from "@/components/HeaderBar";
import { StatsCards } from "@/components/StatsCards";
import { SearchAndFilters } from "@/components/SearchAndFilters";
import { Toast } from "@/components/Toast";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { StudentList } from "@/components/StudentList";

function DashboardContent() {
  const { filteredStudents } = useAttendance();

  return (
    // Responsive container: Allows scrolling on mobile, fixes screen height on desktop
    <main className="min-h-screen md:h-screen w-full overflow-y-auto md:overflow-hidden bg-slate-50 text-slate-900 p-3 sm:p-4 md:p-6 flex flex-col font-sans" dir="rtl">
      <div className="max-w-6xl w-full mx-auto flex flex-col h-full gap-3 sm:gap-4">
        {/* Header section with course details & quick actions */}
        <HeaderBar />

        {/* Statistical cards counter */}
        <StatsCards />

        {/* Search bar and filter tabs */}
        <SearchAndFilters />

        {/* قائمة الطلاب (تتولى التبديل تلقائياً بين الكروت للموبايل والجدول للديسكتوب) */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {filteredStudents.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200/80 p-12 text-center text-slate-400 text-xs">
              لا توجد نتائج تطابق خيارات البحث الحالية.
            </div>
          ) : (
            <StudentList students={filteredStudents} />
          )}
        </div>
      </div>

      {/* Global toast notifications component */}
      <Toast />
      <StickyMobileBar />
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