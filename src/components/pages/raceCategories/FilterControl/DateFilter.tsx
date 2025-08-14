"use client";

import React from "react";
import { DatePicker } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";

interface DateFilterProps {
  date: string; // "DD-MM-YYYY"
  onDateChange: (date: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ date, onDateChange }) => {
  const selectedDate = date ? dayjs(date, "DD-MM-YYYY") : null;

  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2">Select Date</h3>
      <DatePicker
        className="w-full"
        value={selectedDate}
        format="DD-MM-YYYY"
        onChange={(value: Dayjs | null) => {
          if (value) {
            onDateChange(value.format("DD-MM-YYYY"));
          } else {
            onDateChange("");
          }
        }}
        placeholder="Select date"
      />
    </div>
  );
};

export default DateFilter;
