"use client";

import React from "react";
import { useAttendance } from "@/context/AttendanceContext";
import { Users, CheckCircle2, XCircle, Clock } from "lucide-react";

export function StatsCards() {
  const { stats } = useAttendance();

  const calculatePercentage = (value: number) => {
    if (!stats.total || stats.total === 0) return "0%";
    return `${((value / stats.total) * 100).toFixed(1)}%`;
  };

  const cards = [
    {
      title: "إجمالي الطلاب",
      value: stats.total,
      unit: "طالب",
      percentage: "100%",
      icon: Users,
      textColor: "text-slate-800",
      borderColor: "border-slate-200",
      gradientBg: "from-slate-100/90 to-white",
      badgeBg: "bg-slate-200/60 text-slate-700",
      iconBg: "bg-slate-200/50 text-slate-700",
    },
    {
      title: "الحاضرون الآن",
      value: stats.present,
      unit: "طالباً",
      percentage: calculatePercentage(stats.present),
      icon: CheckCircle2,
      textColor: "text-emerald-700",
      borderColor: "border-emerald-200/80",
      gradientBg: "from-emerald-50/90 to-white",
      badgeBg: "bg-emerald-100/80 text-emerald-800",
      iconBg: "bg-emerald-100 text-emerald-600",
    },
    {
      title: "الغائبون",
      value: stats.absent,
      unit: "طالباً",
      percentage: calculatePercentage(stats.absent),
      icon: XCircle,
      textColor: "text-rose-700",
      borderColor: "border-rose-200/80",
      gradientBg: "from-rose-50/90 to-white",
      badgeBg: "bg-rose-100/80 text-rose-800",
      iconBg: "bg-rose-100 text-rose-600",
    },
    {
      title: "المتأخرون عن الحصة",
      value: stats.late,
      unit: "طالباً",
      percentage: calculatePercentage(stats.late),
      icon: Clock,
      textColor: "text-amber-700",
      borderColor: "border-amber-200/80",
      gradientBg: "from-amber-50/90 to-white",
      badgeBg: "bg-amber-100/80 text-amber-800",
      iconBg: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5" dir="rtl">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <div
            key={idx}
            className={`relative flex flex-col justify-between p-4 rounded-2xl border ${card.borderColor} bg-gradient-to-b ${card.gradientBg} shadow-sm transition-all hover:shadow-md h-32`}
          >
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold ${card.textColor}`}>
                {card.title}
              </span>
              <div className={`p-2 rounded-xl ${card.iconBg} flex items-center justify-center`}>
                <IconComponent className="w-5 h-5" />
              </div>
            </div>

            <div className="flex items-end justify-between mt-auto">
              <div className="flex items-baseline gap-1">
                <span className={`text-2xl font-black ${card.textColor}`}>{card.value}</span>
                <span className="text-xs font-medium text-slate-500">{card.unit}</span>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${card.badgeBg}`}>
                {card.percentage}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}