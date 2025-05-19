import React from "react";

interface DistanceFilterProps {
  min: string;
  max: string;
  unit: string;
  onDistanceChange: (field: "min" | "max" | "unit", value: string) => void;
  onApply: () => void;
}

const DistanceFilter: React.FC<DistanceFilterProps> = ({
  min,
  max,
  unit,
  onDistanceChange,
}) => {
  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2">Distance</h3>
      <div className="flex items-center space-x-2 mb-2">
        <input
          type="text"
          placeholder="min"
          value={min}
          onChange={(e) => onDistanceChange("min", e.target.value)}
          className="border rounded p-2 w-20 text-center text-sm"
        />
        <input
          type="text"
          placeholder="max"
          value={max}
          onChange={(e) => onDistanceChange("max", e.target.value)}
          className="border rounded p-2 w-20 text-center text-sm"
        />
        <div className="relative">
          <select
            value={unit}
            onChange={(e) => onDistanceChange("unit", e.target.value)}
            className="border rounded p-2 pr-8 appearance-none text-sm"
          >
            <option value="km">km</option>
            <option value="har">har</option>
            <option value="min">min</option>
            <option value="fit">fit</option>
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

export default DistanceFilter;
