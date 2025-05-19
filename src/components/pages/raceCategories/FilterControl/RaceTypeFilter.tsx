import React from "react";

interface RaceTypeFilterProps {
  hybrid: boolean;
  onSite: boolean;
  virtual: boolean;
  onRaceTypeChange: (
    field: "hybrid" | "onSite" | "virtual",
    value: boolean
  ) => void;
}

const RaceTypeFilter: React.FC<RaceTypeFilterProps> = ({
  hybrid,
  onSite,
  virtual,
  onRaceTypeChange,
}) => {
  return (
    <div className="mb-4">
      <h3 className="font-medium mb-2">Race Type</h3>
      <div className="space-x-3">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={hybrid}
            onChange={() => onRaceTypeChange("hybrid", !hybrid)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-sm text-gray-700">Hybrid</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={onSite}
            onChange={() => onRaceTypeChange("onSite", !onSite)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-sm text-gray-700">On site</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={virtual}
            onChange={() => onRaceTypeChange("virtual", !virtual)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
          <span className="ml-2 text-sm text-gray-700">Virtual</span>
        </label>
      </div>
    </div>
  );
};

export default RaceTypeFilter;
