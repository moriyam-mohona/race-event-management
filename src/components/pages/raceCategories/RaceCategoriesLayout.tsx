"use client";

import React, { useState } from "react";
import EventContent from "./EventContent";
import FilteringContent from "./FilteringContent";
import PopularCategories from "./PopularCategories";
import { FilterState } from "@/types/Common";

const RaceCategoriesLayout: React.FC = () => {
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
    raceType: {
      hybrid: false,
      onSite: false,
      virtual: false,
    },
  });

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleCategorySelect = (category: string) => {
    if (!filters.categories.includes(category)) {
      setFilters({
        ...filters,
        categories: [...filters.categories, category],
      });
    } else {
      setFilters({
        ...filters,
        categories: filters.categories.filter((c) => c !== category),
      });
    }
  };

  return (
    <div className="container mx-auto max-w-7xl p-4">
      <h2 className="text-3xl font-montserrat font-semibold text-gray-800 mb-10">
        Popular Categories
      </h2>
      {/* Popular Categories are displayed at the top */}
      <PopularCategories
        selectedCategories={filters.categories}
        onCategorySelect={handleCategorySelect}
      />

      <div className="w-full flex flex-col md:flex-row gap-10">
        {/* Filtering section */}
        <div className="w-full md:w-1/3">
          <FilteringContent
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </div>

        {/* Content section */}
        <div className="w-full md:w-2/3">
          <EventContent filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default RaceCategoriesLayout;
