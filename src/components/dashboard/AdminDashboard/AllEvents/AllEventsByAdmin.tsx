/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "@/components/shared/Loading/Loading";
import { useCallback, useEffect, useMemo, useState } from "react";
import AllEventsByAdminCard from "./AllEventsByAdminCard";
import { useGetAllEventsByAdminQuery } from "@/redux/features/admin/adminApi";
import { Input, Pagination } from "antd";

const { Search } = Input;

const AllEventsByAdmin = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [pagination, setPagination] = useState({ current: 1, pageSize: 9 });
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Keep tab order consistent
  const tabOrder = useMemo(
    () => ["pending", "upcoming", "active", "completed"],
    []
  );

  // Build query params
  const queryObj = useMemo(
    () => [
      { name: "page", value: pagination.current },
      { name: "limit", value: pagination.pageSize },
      { name: "searchField", value: debouncedSearch || "" },
      {
        name: "eventStatus",
        value:
          activeTab === "active"
            ? "ACTIVE"
            : activeTab === "completed"
            ? "COMPLETED"
            : activeTab === "pending"
            ? "PENDING"
            : "APPROVED",
      },
    ],
    [pagination, debouncedSearch, activeTab]
  );

  // Fetch events
  const {
    data: registeredEvents,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllEventsByAdminQuery({ queryObj });

  const totalCount = registeredEvents?.data?.meta?.total || 0;

  // Handle pagination
  const handlePaginationChange = useCallback(
    (page: number, pageSize: number) => {
      setPagination({ current: page, pageSize });
    },
    []
  );

  // Render Events
  const renderEvents = useCallback(
    (events: any[] = [], loading: boolean, failed: boolean, err: any) => {
      if (loading) return <Loading />;

      if (failed) {
        return (
          <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed text-red-500">
            <p className="font-medium">Failed to load events</p>
            <pre className="mt-2 max-w-full overflow-auto text-xs text-gray-400">
              {JSON.stringify(err, null, 2)}
            </pre>
          </div>
        );
      }

      if (!Array.isArray(events) || events.length === 0) {
        return (
          <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
            <p className="text-lg font-medium">No events found</p>
            <p className="text-sm text-muted-foreground">
              Check back later for new updates.
            </p>
          </div>
        );
      }

      return (
        <div>
          {events.map((event: any) => (
            <AllEventsByAdminCard key={event?.id} event={event} />
          ))}
        </div>
      );
    },
    []
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-medium">All Events</h1>
        </div>

        {/* Search Box */}
        <div className="w-full h-12 max-w-sm mb-6">
          <Search
            placeholder="Search event..."
            value={searchTerm}
            className="w-full h-full"
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        defaultValue="pending"
        className="w-full"
        onValueChange={(value: string) => setActiveTab(value)}
      >
        <TabsList className="mb-6 w-full justify-start gap-2 md:gap-6">
          {tabOrder.map((eventStatus) => (
            <TabsTrigger
              key={eventStatus}
              value={eventStatus}
              className="flex-1 md:flex-none capitalize cursor-pointer"
            >
              {eventStatus} Events
            </TabsTrigger>
          ))}
        </TabsList>

        {tabOrder.map((tab) => (
          <TabsContent key={tab} value={tab}>
            {renderEvents(
              tab === activeTab ? registeredEvents?.data?.data ?? [] : [],
              tab === activeTab ? isLoading : false,
              tab === activeTab ? isError : false,
              tab === activeTab ? error : null
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Pagination */}
      <div className="p-4 w-full flex flex-wrap justify-center">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={totalCount}
          disabled={isLoading || isFetching}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default AllEventsByAdmin;
