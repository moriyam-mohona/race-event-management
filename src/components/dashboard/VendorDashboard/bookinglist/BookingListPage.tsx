"use client";

import { useState } from "react";
import { BookingTabs } from "./BookingTabs";
import { BookingFilters } from "./BookingFilters";
import { BookingList } from "./BookingList";

export default function BookingListPage() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed">(
    "upcoming"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState("Jul, 2024");

  const handleTabChange = (tab: "upcoming" | "completed") => {
    setActiveTab(tab);
    setCurrentPage(1); // Reset to first page when changing tabs
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
    setCurrentPage(1); // Reset to first page when changing month
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <BookingTabs activeTab={activeTab} onTabChange={handleTabChange} />

          <div className="flex flex-col md:flex-row gap-3 items-center">
            <BookingFilters
              searchQuery={searchQuery}
              onSearch={handleSearch}
              selectedMonth={selectedMonth}
              onMonthChange={handleMonthChange}
            />
          </div>
        </div>

        <BookingList
          activeTab={activeTab}
          searchQuery={searchQuery}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          selectedMonth={selectedMonth}
        />
      </div>
    </div>
  );
}
