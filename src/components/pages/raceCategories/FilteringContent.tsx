import React from "react";
import { ChevronUp } from "lucide-react";
import { FilterState } from "@/types/Common";
import EventTypeSelector from "./FilterControl/EventTypeSelector";
import CategoryFilter from "./FilterControl/CategoryFilter";
import DistanceFilter from "./FilterControl/DistanceFilter";
import DateFilter from "./FilterControl/DateFilter";
import LocationFilter from "./FilterControl/LocationFilter";
import RaceTypeFilter from "./FilterControl/RaceTypeFilter";

interface FilteringContentProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

const FilteringContent: React.FC<FilteringContentProps> = ({
  filters,
  onFilterChange,
}) => {
  const handleEventTypeChange = (type: string) => {
    onFilterChange({
      ...filters,
      eventType: type,
    });
  };

  const handleCategorySelect = (category: string) => {
    if (!filters.categories.includes(category)) {
      onFilterChange({
        ...filters,
        categories: [...filters.categories, category],
      });
    }
  };

  const handleCategoryRemove = (category: string) => {
    onFilterChange({
      ...filters,
      categories: filters.categories.filter((c) => c !== category),
    });
  };

  const handleDistanceChange = (
    field: "min" | "max" | "unit",
    value: string
  ) => {
    onFilterChange({
      ...filters,
      distance: {
        ...filters.distance,
        [field]: value,
      },
    });
  };

  const handleDateChange = (field: "day" | "month" | "year", value: string) => {
    onFilterChange({
      ...filters,
      date: {
        ...filters.date,
        [field]: value,
      },
    });
  };

  const handleLocationChange = (
    field: "continent" | "country" | "region",
    value: string
  ) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  const handleRaceTypeChange = (
    field: "hybrid" | "onSite" | "virtual",
    value: boolean
  ) => {
    onFilterChange({
      ...filters,
      raceType: {
        ...filters.raceType,
        [field]: value,
      },
    });
  };

  const applyDistanceFilter = () => {
    // This would typically trigger a more complex filtering operation
    // For now, it's just a placeholder as the filter changes are already tracked
    console.log("Applying distance filter:", filters.distance);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 overflow-auto max-h-[calc(100vh-2rem)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
        <button className="text-gray-400 hover:text-gray-600">
          <ChevronUp size={20} />
        </button>
      </div>

      <EventTypeSelector
        selectedType={filters.eventType}
        onTypeChange={handleEventTypeChange}
      />

      <CategoryFilter
        selectedCategories={filters.categories}
        onCategorySelect={handleCategorySelect}
        onCategoryRemove={handleCategoryRemove}
      />

      <DistanceFilter
        min={filters.distance.min}
        max={filters.distance.max}
        unit={filters.distance.unit}
        onDistanceChange={handleDistanceChange}
        onApply={applyDistanceFilter}
      />

      <DateFilter
        day={filters.date.day}
        month={filters.date.month}
        year={filters.date.year}
        onDateChange={handleDateChange}
      />

      <LocationFilter
        continent={filters.continent}
        country={filters.country}
        region={filters.region}
        onLocationChange={handleLocationChange}
      />

      <RaceTypeFilter
        hybrid={filters.raceType.hybrid}
        onSite={filters.raceType.onSite}
        virtual={filters.raceType.virtual}
        onRaceTypeChange={handleRaceTypeChange}
      />
    </div>
  );
};

export default FilteringContent;
