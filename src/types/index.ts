// Core status types for student attendance
export type StudentStatus = "Present" | "Absent" | "Late";

// Active filter tab options
export type FilterTab = "all" | "present" | "absent" | "late" | "warning";

export interface Student {
  id: number;
  name: string;
  absenceRate: number;
  status: StudentStatus;
}