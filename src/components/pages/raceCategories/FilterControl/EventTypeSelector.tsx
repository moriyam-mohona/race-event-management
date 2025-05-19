import React from "react";

interface EventTypeSelectorProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const EventTypeSelector: React.FC<EventTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  return (
    <div className="mb-4 bg-green-50 p-4 rounded-lg">
      <div className="mb-3">
        <label className="inline-flex items-center mb-1">
          <input
            type="radio"
            className="form-radio h-4 w-4 text-green-600"
            checked={selectedType === "allEvents"}
            onChange={() => onTypeChange("allEvents")}
          />
          <span className="ml-2 text-sm font-medium text-gray-700">
            All Events
          </span>
        </label>
      </div>
      <div>
        <label className="inline-flex items-center mb-1">
          <input
            type="radio"
            className="form-radio h-4 w-4 text-green-600"
            checked={selectedType === "dustiTrainers"}
            onChange={() => onTypeChange("dustiTrainers")}
          />
          <span className="ml-2 text-sm font-medium text-gray-700">
            DustiTrainers Checkout
          </span>
        </label>
        <p className="text-xs text-gray-600 ml-6">
          Show only the events available for registration on DustiTrainers.
          Quick and easy!
        </p>
      </div>
    </div>
  );
};

export default EventTypeSelector;
