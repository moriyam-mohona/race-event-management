import React from "react";

interface RaceTypeFilterProps {
  selectedType: "VIRTUAL" | "ON_SITE" | "";
  onRaceTypeChange: (type: "VIRTUAL" | "ON_SITE") => void;
}

const RaceTypeFilter: React.FC<RaceTypeFilterProps> = ({
  selectedType,
  onRaceTypeChange,
}) => {
  const options = ["VIRTUAL", "ON_SITE"] as const;

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
