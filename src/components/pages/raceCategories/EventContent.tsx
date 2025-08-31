/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { MapPin, List } from "lucide-react";
import ListView from "./EventViews/ListView";
import MapView from "./EventViews/MapView";
import { useSearchParams } from "next/navigation";
import { Pagination } from "antd";
import { useGetAllApprovedEventsQuery } from "@/redux/features/event/eventApi";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import EventListViewSkeleton from "@/components/skeletons/EventListViewSkeleton";

const EventContent: React.FC<any> = () => {
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5); // Default page size for list view
  const searchParams = useSearchParams();

  const user = useAppSelector(selectCurrentUser);
  const userId = user?.id;

  const raceType = searchParams.get("raceType");
  const category = searchParams.get("category");
  const continent = searchParams.get("continent");
  const country = searchParams.get("country");

  const [objectQuery, setObjectQuery] = useState<any>([
    { name: "page", value: page },
    { name: "limit", value: pageSize },
    { name: "userId", value: userId },
  ]);

  // Set appropriate page size based on view mode
  useEffect(() => {
    if (viewMode === "map") {
      setPageSize(100); // Set larger page size for map view
      setPage(1); // Reset to first page when switching to map view
    } else {
      setPageSize(5); // Set smaller page size for list view
    }
  }, [viewMode]);

  useEffect(() => {
    setPage(1);
    // Keep the current page size when filters change
  }, [raceType]);

  useEffect(() => {
    const queryParams: any[] = [
      { name: "page", value: page },
      { name: "limit", value: pageSize },
      { name: "userId", value: userId || "" },
    ];

    if (raceType) {
      queryParams.push({ name: "raceType", value: raceType });
    }
    if (category) {
      queryParams.push({ name: "category", value: category });
    }
    if (continent) {
      queryParams.push({ name: "continent", value: continent });
    }
    if (country) {
      queryParams.push({ name: "country", value: country });
    }

    setObjectQuery(queryParams);
  }, [raceType, category, continent, country, page, pageSize, userId]);

  const {
    data: approvedEvent,
    isLoading,
    isFetching,
    isError,
  } = useGetAllApprovedEventsQuery({
    queryObj: objectQuery,
  });

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const totalCount = approvedEvent?.data?.meta?.total || 0;

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "map" : "list");
  };

  // Don't show pagination for map view since we're loading all events
  const showPagination = viewMode === "list";

  if (isLoading || isFetching) return <EventListViewSkeleton />;
  if (isError) return <div className="text-center">Something went wrong</div>;
  if (!approvedEvent?.data?.data?.length)
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mb-4 text-gray-300 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2a4 4 0 018 0v2m1 0a2 2 0 002 2H6a2 2 0 002-2m6-10V7a4 4 0 10-8 0v2"
          />
        </svg>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No Events Found
        </h2>
        <p className="text-gray-400">
          Try adjusting your filters or check back later.
        </p>
      </div>
    );

  return (
    <div className="bg-white rounded-lg  h-full">
      <div className="flex justify-between items-center mb-6">
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

      <div className="h-[calc(100%-4rem)]">
        {viewMode === "list" ? (
          <ListView events={approvedEvent} />
        ) : (
          <MapView events={approvedEvent} />
        )}

        {showPagination && (
          <div className="p-4 w-full flex flex-wrap justify-center mt-10">
            <Pagination
              current={page}
              pageSize={pageSize}
              total={totalCount}
              onChange={handlePaginationChange}
              disabled={isFetching}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventContent;
