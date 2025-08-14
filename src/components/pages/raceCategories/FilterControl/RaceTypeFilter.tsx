import React from "react";

interface RaceTypeFilterProps {
  selectedType: "HYBRID" | "VIRTUAL" | "ON_SITE" | "SHARED" | "";
  onRaceTypeChange: (type: "HYBRID" | "VIRTUAL" | "ON_SITE" | "SHARED") => void;
}

const RaceTypeFilter: React.FC<RaceTypeFilterProps> = ({
  selectedType,
  onRaceTypeChange,
}) => {
  const options = ["HYBRID", "VIRTUAL", "ON_SITE", "SHARED"] as const;

  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2">Race Type</h3>
      <div className="space-x-3">
        {options.map((type) => (
          <label key={type} className="inline-flex items-center">
            <input
              type="radio"
              name="raceType"
              checked={selectedType === type}
              onChange={() => onRaceTypeChange(type)}
              className="form-radio h-4 w-4 text-blue-600"
            />
            <span className="ml-2 text-sm text-gray-700">{type}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RaceTypeFilter;
