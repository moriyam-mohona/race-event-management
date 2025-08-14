/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { MapPin, List } from "lucide-react";
import ListView from "./EventViews/ListView";
import MapView from "./EventViews/MapView";

// interface EventContentProps {
//   filters: FilterState;
// }

const EventContent: React.FC<any> = ({ data }: { data: any }) => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  // Filter events based on the provided filters
  // const filteredEvents = filterEvents(raceEvents, filters);

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "map" : "list");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 h-full">
      <div className="flex justify-between items-center mb-6">
        {/* <h2 className="text-xl font-semibold text-gray-800">
          Events {data?.length > 0 && `(${data.length})`}
        </h2> */}

        <button
          onClick={toggleViewMode}
          className="flex items-center space-x-2 bg-blue-50 hover:bg-blue-100 text-blue-600 px-4 py-2 rounded-lg transition-colors duration-200"
        >
          {viewMode === "list" ? (
            <>
              <MapPin size={18} />
              <span>View map</span>
            </>
          ) : (
            <>
              <List size={18} />
              <span>List View</span>
            </>
          )}
        </button>
      </div>
      {/* <ListView events={data} /> */}

      <div className="h-[calc(100%-4rem)]">
        {viewMode === "list" ? (
          <ListView events={data} />
        ) : (
          <MapView events={data} />
        )}
      </div>
    </div>
  );
};

// Helper function to filter events based on selected filters
// function data(events: RaceEvent[], filters: FilterState): RaceEvent[] {
//   return events.filter((event) => {
//     // Filter by categories if any are selected
//     if (
//       filters.categories.length > 0 &&
//       !filters.categories.includes(event.category)
//     ) {
//       return false;
//     }

//     // Filter by race type
//     if (
//       filters.raceType.hybrid ||
//       filters.raceType.onSite ||
//       filters.raceType.virtual
//     ) {
//       // This is a simplification - in a real app you'd have a race type field on the event
//       const isVirtual = event.location.city === "Any Location";

//       if (filters.raceType.virtual && !isVirtual) return false;
//       if (filters.raceType.onSite && isVirtual) return false;
//       // Hybrid is more complex and would need specific logic
//     }

//     // Filter by location (simple string matching for demo)
//     if (
//       filters.country &&
//       !event.location.country
//         .toLowerCase()
//         .includes(filters.country.toLowerCase())
//     ) {
//       return false;
//     }

//     // More complex filters would go here (distance, date, etc.)

//     return true;
//   });
// }

export default EventContent;
