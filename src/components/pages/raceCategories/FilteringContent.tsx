"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FilterState } from "@/types/Common";
import EventTypeSelector from "./FilterControl/EventTypeSelector";
import CategoryFilter from "./FilterControl/CategoryFilter";
import DistanceFilter from "./FilterControl/DistanceFilter";
import DateFilter from "./FilterControl/DateFilter";
import LocationFilter from "./FilterControl/LocationFilter";
import RaceTypeFilter from "./FilterControl/RaceTypeFilter";
import { IoCloseOutline } from "react-icons/io5";

const FilteringContent = () => {
  const router = useRouter();

  const defaultFilters: FilterState = {
    eventType: "allEvents",
    categories: [],
    distance: {
      min: "",
      max: "",
      unit: "km | har | min | fit",
    },
    date: "",
    continent: "",
    country: "",
    region: "",
    raceType: "",
  };

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // Update URL with only active filters
  const updateQuery = (newFilters: FilterState) => {
    const params = new URLSearchParams();

    if (newFilters.eventType && newFilters.eventType !== "allEvents")
      params.set("eventType", newFilters.eventType);

    if (newFilters.categories.length > 0)
      params.set("categories", newFilters.categories.join(","));

    if (newFilters.distance.min)
      params.set("minDistance", newFilters.distance.min);
    if (newFilters.distance.max)
      params.set("maxDistance", newFilters.distance.max);
    if (
      newFilters.distance.unit &&
      newFilters.distance.unit !== "km | har | min | fit"
    )
      params.set("unit", newFilters.distance.unit);

    if (newFilters.date) params.set("date", newFilters.date);
    if (newFilters.continent) params.set("continent", newFilters.continent);
    if (newFilters.country) params.set("country", newFilters.country);
    if (newFilters.region) params.set("region", newFilters.region);
    if (newFilters.raceType) params.set("raceType", newFilters.raceType);

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : "/race-categories");
  };

  // Generic filter change
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    updateQuery(newFilters);
  };

  // Category select toggle
  const handleCategorySelect = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    handleFilterChange({ ...filters, categories: updatedCategories });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters(defaultFilters);
    router.push("/race-categories");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 overflow-auto max-h-[calc(100vh-2rem)]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <div className="flex gap-2">
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 bg-red-500 text-white hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg py-1 px-3 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <IoCloseOutline className="text-lg" />
            Clear Filters
          </button>
        </div>
      </div>

      <EventTypeSelector
        selectedType={filters.eventType}
        onTypeChange={(type) =>
          handleFilterChange({ ...filters, eventType: type })
        }
      />

      <CategoryFilter
        selectedCategories={filters.categories}
        onCategorySelect={handleCategorySelect}
        onCategoryRemove={handleCategorySelect}
      />

      <DistanceFilter
        min={filters.distance.min}
        max={filters.distance.max}
        unit={filters.distance.unit}
        onDistanceChange={(field, value) =>
          handleFilterChange({
            ...filters,
            distance: { ...filters.distance, [field]: value },
          })
        }
        onApply={() => updateQuery(filters)}
      />

      <DateFilter
        date={filters.date}
        onDateChange={(dateString) =>
          handleFilterChange({ ...filters, date: dateString })
        }
      />

      <LocationFilter
        continent={filters.continent}
        country={filters.country}
        region={filters.region}
        onLocationChange={(field, value) =>
          handleFilterChange({ ...filters, [field]: value })
        }
      />

      <RaceTypeFilter
        selectedType={filters.raceType}
        onRaceTypeChange={(type) =>
          handleFilterChange({ ...filters, raceType: type })
        }
      />
    </div>
  );
};

export default FilteringContent;
