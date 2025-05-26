"use client";

import { useState } from "react";
import UploadedRaceReport from "./UploadedRaceReport";
import UserActivitiesReports from "./UserActivitiesReports";
import OverRevenueInsight from "./OverRevenueInsight";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Graphs = () => {
  const [sortBy, setSortBy] = useState("Jul, 2024");

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
    <div className="">
      <div className="mb-6 flex flex-col gap-2 items-center md:items-end justify-between">
        {/* <h2 className="text-2xl md:text-3xl font-medium">
          Dashboard Analytics
        </h2> */}

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Select month" />
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

      <div className="flex flex-col md:flex-row gap-5">
        <UploadedRaceReport />
        <UserActivitiesReports />
      </div>
      <OverRevenueInsight />
    </div>
  );
};

export default Graphs;
