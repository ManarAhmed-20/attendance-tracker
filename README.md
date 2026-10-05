# 📊 Interactive Attendance Tracker

A modern, fast, and responsive web application built with **Next.js**, **TypeScript**, and **Tailwind CSS** for real-time student attendance management.

---

## ✨ Features

- **⚡ Real-time Attendance Status Tracking:** Mark students as Present, Absent, or Late with instant updates.
- **📊 Dynamic Cumulative Absence Calculation:** Automatically updates attendance percentages based on single-session impacts (based on 20 sessions per semester).
- **⚠️ Smart Warning System:** Automatically triggers early-warning alerts for students exceeding attendance risk thresholds (>15%).
- **📝 Save & Export Sessions:** Finalize daily attendance, commit cumulative records, and export reports directly as CSV files with Arabic encoding support.
- **🔍 Instant Search & Filter Tabs:** Filter students dynamically by status (*All, Present, Absent, Late, Warning*) or search by name.
- **💾 Local Storage Persistence:** Preserves student attendance states across page reloads.
- **📱 Fully Responsive & RTL Support:** Native Arabic interface with a clean UI, mobile-first card layouts, sticky action bars, and adaptable designs for all screen sizes.

---

## 🛠️️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router & Turbopack)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started (Local Setup)

Follow these steps to run the project locally on your machine.

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v18.0 or higher recommended)
- [Git](https://git-scm.com/)

### Installation & Run Steps

1. **Clone the Repository**
   ```bash
   git clone https://github.com/ManarAhmed-20/attendance-tracker.git
   cd attendance-tracker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📂 Folder Structure

```text
attendance-tracker/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   └── page.tsx           # Main Dashboard Page
│   ├── components/
│   │   ├── HeaderBar.tsx       # Header & Quick Actions
│   │   ├── SearchAndFilters.tsx # Search Bar & Filter Tabs
│   │   ├── StatsCards.tsx      # Overview Counters
│   │   ├── StudentItem.tsx     # Student Row/Card Component
│   │   ├── SaveSessionButton.tsx # Save & CSV Export Logic
│   │   ├── StickyMobileBar.tsx # Mobile Bottom Action Bar
│   │   └── Toast.tsx           # Status Notifications
│   ├── context/
│   │   └── AttendanceContext.tsx # Centralized State (Local Storage)
│   ├── types/                  # TypeScript Interfaces
│   └── utils/                  # Mock Initial Data
├── public/
└── package.json
```

---

## 📄 License

This project is created for educational and practical demonstration purposes.