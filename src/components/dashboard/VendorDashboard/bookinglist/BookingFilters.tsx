"use client";

import type React from "react";

import { useState } from "react";
import { Calendar, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BookingFiltersProps {
  searchQuery: string;
  onSearch: (query: string) => void;
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export function BookingFilters({
  searchQuery,
  onSearch,
  selectedMonth,
  onMonthChange,
}: BookingFiltersProps) {
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
  };

  const months = [
    "Jan, 2024",
    "Feb, 2024",
    "Mar, 2024",
    "Apr, 2024",
    "May, 2024",
    "Jun, 2024",
    "Jul, 2024",
    "Aug, 2024",
    "Sep, 2024",
    "Oct, 2024",
    "Nov, 2024",
    "Dec, 2024",
  ];

  return (
    <>
      <div className="flex items-center">
        <span className="mr-2 text-gray-600 text-sm whitespace-nowrap">
          Sort by
        </span>
        <div className="relative">
          <Select value={selectedMonth} onValueChange={onMonthChange}>
            <SelectTrigger className="w-[140px] border rounded-md">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Select month" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <form onSubmit={handleSearchSubmit} className="relative">
          <Input
            type="search"
            placeholder="Search"
            className="w-full md:w-[300px] pl-9 rounded-md"
            value={localSearch}
            onChange={handleSearchChange}
          />
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
        </form>

        <div className="bg-white"></div>
      </div>
    </>
  );
}
