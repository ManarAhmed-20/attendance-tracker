export type StudentStatus = "Present" | "Absent" | "Late";

export interface Student {
  id: number;
  name: string;
  absenceRate: number;
  status: StudentStatus;
}

export interface AttendanceState {
  students: Student[];
  currentPage: number;
  itemsPerPage: number;
  searchQuery: string;
  toast: {
    message: string;
    type: "success" | "error" | "info";
    visible: boolean;
  } | null;
}