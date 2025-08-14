/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { MapPin, List } from "lucide-react";
import ListView from "./EventViews/ListView";
import MapView from "./EventViews/MapView";
import { useSearchParams } from "next/navigation";
import { Pagination } from "antd";
import { useGetAllApprovedEventsQuery } from "@/redux/features/event/eventApi";

const EventContent: React.FC<any> = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const searchParams = useSearchParams();

  const raceType = searchParams.get("raceType");
  console.log("raceType", raceType);

  const [objectQuery, setObjectQuery] = useState<any>([
    { name: "page", value: page },
    { name: "limit", value: pageSize },
    { name: "active_status", value: "active" },
  ]);

  useEffect(() => {
    setPage(1);
    setPageSize(5);
  }, [raceType]);

  useEffect(() => {
    const queryParams: any[] = [
      { name: "page", value: page },
      { name: "limit", value: pageSize },
    ];

    if (raceType) {
      queryParams.push({ name: "raceType", value: raceType });
    }

    setObjectQuery(queryParams);
  }, [raceType, page, pageSize]);

  const { data: approvedEvent } = useGetAllApprovedEventsQuery({
    queryObj: objectQuery,
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };
  const totalCount = approvedEvent?.data?.meta?.total || 0;

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
          <ListView events={approvedEvent} />
        ) : (
          <MapView events={approvedEvent} />
        )}
        <div className="p-4 w-full flex flex-wrap justify-center">
          <Pagination
            current={page}
            pageSize={pageSize}
            total={totalCount}
            onChange={handlePaginationChange}
          />
        </div>
      </div>
    </div>
  );
};

export default EventContent;
