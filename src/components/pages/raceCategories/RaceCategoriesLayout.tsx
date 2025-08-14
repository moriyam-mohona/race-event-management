"use client";

import EventContent from "./EventContent";
import FilteringContent from "./FilteringContent";
import PopularCategories from "./PopularCategories";

const RaceCategoriesLayout: React.FC = () => {
  return (
    <div className="container mx-auto max-w-7xl p-4">
      <h2 className="text-3xl font-montserrat font-semibold text-gray-800 mb-10">
        Popular Categories
      </h2>
      {/* Popular Categories are displayed at the top */}
      <PopularCategories />

      <div className="w-full flex flex-col md:flex-row gap-10">
        {/* Filtering section */}
        <div className="w-full md:w-1/3">
          <FilteringContent />
        </div>

        {/* Content section */}
        <div className="w-full md:w-2/3">
          <EventContent />
        </div>
      </div>
    </div>
  );
};

export default RaceCategoriesLayout;
