"use client";

interface BookingTabsProps {
  activeTab: "upcoming" | "completed";
  onTabChange: (tab: "upcoming" | "completed") => void;
}

export function BookingTabs({ activeTab, onTabChange }: BookingTabsProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onTabChange("upcoming")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          activeTab === "upcoming"
            ? "bg-primary text-white"
            : "bg-white text-primary border border-primary"
        }`}
      >
        Upcoming Booking
      </button>
      <button
        onClick={() => onTabChange("completed")}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          activeTab === "completed"
            ? "bg-primary text-white"
            : "bg-white text-primary border border-primary"
        }`}
      >
        Completed Booking
      </button>
    </div>
  );
}
