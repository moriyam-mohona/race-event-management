import React from "react";

interface DateFilterProps {
  day: string;
  month: string;
  year: string;
  onDateChange: (field: "day" | "month" | "year", value: string) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  day,
  month,
  year,
  onDateChange,
}) => {
  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2">Date | Month | Year</h3>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="dd"
          value={day}
          onChange={(e) => onDateChange("day", e.target.value)}
          className="border rounded p-2 w-20 text-center text-sm"
          maxLength={2}
        />
        <input
          type="text"
          placeholder="mm"
          value={month}
          onChange={(e) => onDateChange("month", e.target.value)}
          className="border rounded p-2 w-20 text-center text-sm"
          maxLength={2}
        />
        <div className="relative">
          <select
            value={year}
            onChange={(e) => onDateChange("year", e.target.value)}
            className="border rounded p-2 pr-8 appearance-none text-sm"
          >
            <option value="">yyyy</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
