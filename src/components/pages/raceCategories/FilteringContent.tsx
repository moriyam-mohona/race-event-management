"use client";

import { ChevronUp } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FilterState } from "@/types/Common";
import EventTypeSelector from "./FilterControl/EventTypeSelector";
import CategoryFilter from "./FilterControl/CategoryFilter";
import DistanceFilter from "./FilterControl/DistanceFilter";
import DateFilter from "./FilterControl/DateFilter";
import LocationFilter from "./FilterControl/LocationFilter";
import RaceTypeFilter from "./FilterControl/RaceTypeFilter";

const FilteringContent = () => {
  const router = useRouter();
  // const searchParams = useSearchParams();

  const [filters, setFilters] = useState<FilterState>({
    eventType: "allEvents",
    categories: [],
    distance: {
      min: "",
      max: "",
      unit: "km | har | min | fit",
    },
    date: {
      day: "",
      month: "",
      year: "",
    },
    continent: "",
    country: "",
    region: "",
    raceType: "",
  });

  const updateQuery = (newFilters: FilterState) => {
    const params = new URLSearchParams();

    if (newFilters.eventType) params.set("eventType", newFilters.eventType);
    if (newFilters.categories.length > 0)
      params.set("categories", newFilters.categories.join(","));
    if (newFilters.distance.min)
      params.set("minDistance", newFilters.distance.min);
    if (newFilters.distance.max)
      params.set("maxDistance", newFilters.distance.max);
    if (newFilters.distance.unit) params.set("unit", newFilters.distance.unit);
    if (newFilters.date.day) params.set("day", newFilters.date.day);
    if (newFilters.date.month) params.set("month", newFilters.date.month);
    if (newFilters.date.year) params.set("year", newFilters.date.year);
    if (newFilters.continent) params.set("continent", newFilters.continent);
    if (newFilters.country) params.set("country", newFilters.country);
    if (newFilters.region) params.set("region", newFilters.region);
    if (newFilters.raceType) params.set("raceType", newFilters.raceType);
    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    updateQuery(newFilters);
  };

  const handleCategorySelect = (category: string) => {
    const updatedCategories = filters.categories.includes(category)
      ? filters.categories.filter((c) => c !== category)
      : [...filters.categories, category];

    const newFilters = { ...filters, categories: updatedCategories };
    setFilters(newFilters);
    updateQuery(newFilters);
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
        onTypeChange={(type) =>
          handleFilterChange({ ...filters, eventType: type })
        }
      />

      <CategoryFilter
        selectedCategories={filters.categories}
        onCategorySelect={handleCategorySelect}
        onCategoryRemove={handleCategorySelect} // same toggle
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
        day={filters.date.day}
        month={filters.date.month}
        year={filters.date.year}
        onDateChange={(field, value) =>
          handleFilterChange({
            ...filters,
            date: { ...filters.date, [field]: value },
          })
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
        onRaceTypeChange={(type) => {
          const newFilters = { ...filters, raceType: type };
          setFilters(newFilters);
          updateQuery(newFilters);
        }}
      />
    </div>
  );
};

export default FilteringContent;
