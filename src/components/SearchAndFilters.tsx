"use client";

import React from "react";
import { useAttendance } from "@/context/AttendanceContext";
import { FilterTab } from "@/types";
import { Search, AlertTriangle } from "lucide-react";

export function SearchAndFilters() {
  const { state, setSearchQuery, setActiveTab, stats } = useAttendance();

  const tabs: { id: FilterTab; label: string; icon?: React.ReactNode; count?: number }[] = [
    { id: "all", label: "الكل", count: stats.total },
    { id: "present", label: "حاضر", count: stats.present },
    { id: "absent", label: "غائب", count: stats.absent },
    { id: "late", label: "متأخر", count: stats.late },
    {
      id: "warning",
      label: "يحتاج متابعة",
      icon: <AlertTriangle className="w-3.5 h-3.5 text-red-500" />,
      count: stats.warning,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 mb-4" dir="rtl">
      {/* Instant Search Bar */}
      <div className="relative flex-1">
        <input
          type="text"
          value={state.searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="بحث فوري باسم الطالب..."
          className="w-full pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-slate-800 placeholder-slate-400"
        />
        <Search className="absolute right-3.5 top-3 w-4 h-4 text-slate-400" />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-slate-200/60 p-1 rounded-xl overflow-x-auto scrollbar-none">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              state.activeTab === tab.id
                ? "bg-white text-slate-800 shadow-xs font-semibold"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <span>{tab.label}</span>
            {tab.icon}
            {tab.count !== undefined && <span className="opacity-75">({tab.count})</span>}
          </button>
        ))}
      </div>
    </div>
  );
}