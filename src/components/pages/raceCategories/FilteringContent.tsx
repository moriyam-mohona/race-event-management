"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FilterState } from "@/types/Common";
import EventTypeSelector from "./FilterControl/EventTypeSelector";
import CategoryFilter from "./FilterControl/CategoryFilter";
import DateFilter from "./FilterControl/DateFilter";
import LocationFilter from "./FilterControl/LocationFilter";
import RaceTypeFilter from "./FilterControl/RaceTypeFilter";
import { IoCloseOutline } from "react-icons/io5";
import { InputNumber, Divider } from "antd";

const FilteringContent = () => {
  const router = useRouter();

  const defaultFilters: FilterState = {
    eventType: "allEvents",
    categories: [],
    distance: { min: "", max: "", unit: "" },
    date: "",
    continent: "",
    country: "",
    region: "",
    raceType: "",
  };

  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  /** Helper to update URL query based on active filters */
  const updateQuery = (newFilters: FilterState) => {
    const params = new URLSearchParams();

    if (newFilters.eventType && newFilters.eventType !== "allEvents")
      params.set("eventType", newFilters.eventType);

    if (newFilters.categories.length > 0)
      params.set("categories", newFilters.categories.join(","));

    // Distance: single numeric value
    if (newFilters.distance.min)
      params.set("distance", newFilters.distance.min);

    if (newFilters.date) params.set("date", newFilters.date);
    if (newFilters.continent) params.set("continent", newFilters.continent);
    if (newFilters.country) params.set("country", newFilters.country);
    if (newFilters.region) params.set("region", newFilters.region);
    if (newFilters.raceType) params.set("raceType", newFilters.raceType);

    const queryString = params.toString();
    router.push(queryString ? `?${queryString}` : "/race-categories");
  };

  /** Generic filter change handler */
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    updateQuery(newFilters);
  };

  /** Toggle category selection */
  const handleCategorySelect = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    handleFilterChange({ ...filters, categories: updatedCategories });
  };

  /** Clear all filters */
  const clearFilters = () => {
    setFilters(defaultFilters);
    router.push("/race-categories");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 max-h-[calc(100vh-2rem)] overflow-auto space-y-4">
      {/* Header with Clear button */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Filters</h2>
        <button
          onClick={clearFilters}
          className="flex items-center gap-1 bg-red-500 text-white hover:bg-red-600 transition-all duration-300 shadow-md hover:shadow-lg py-1 px-3 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          {" "}
          <IoCloseOutline className="text-lg" /> Clear Filters{" "}
        </button>
      </div>

      <Divider />

      {/* Event Type */}
      <EventTypeSelector
        selectedType={filters.eventType}
        onTypeChange={(type) =>
          handleFilterChange({ ...filters, eventType: type })
        }
      />

      <Divider />

      {/* Category */}
      <CategoryFilter
        selectedCategories={filters.categories}
        onCategorySelect={handleCategorySelect}
        onCategoryRemove={handleCategorySelect}
      />

      <Divider />

      {/* Distance (single numeric value) */}
      <div className="mb-4">
        <h3 className="font-medium mb-2">Distance (km)</h3>
        <InputNumber
          min={0}
          placeholder="Enter distance"
          value={
            filters.distance.min ? Number(filters.distance.min) : undefined
          }
          onChange={(value) =>
            handleFilterChange({
              ...filters,
              distance: {
                ...filters.distance,
                min: value ? String(value) : "",
              },
            })
          }
          style={{ width: "100%" }}
        />
      </div>

      <Divider />

      {/* Date */}
      <DateFilter
        date={filters.date}
        onDateChange={(dateString) =>
          handleFilterChange({ ...filters, date: dateString })
        }
      />

      <Divider />

      {/* Location */}
      <LocationFilter
        continent={filters.continent}
        country={filters.country}
        region={filters.region}
        onLocationChange={(field, value) =>
          handleFilterChange({ ...filters, [field]: value })
        }
      />

      <Divider />

      {/* Race Type */}
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
