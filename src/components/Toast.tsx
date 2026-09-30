"use client";

import React from "react";
import { useAttendance } from "@/context/AttendanceContext";

export function Toast() {
  const { state } = useAttendance();

  if (!state.toastMessage) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-medium flex items-center gap-2 animate-bounce">
      <span>✨</span>
      <span>{state.toastMessage}</span>
    </div>
  );
}