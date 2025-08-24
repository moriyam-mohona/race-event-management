/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "@/components/shared/Loading/Loading";
import { useState } from "react";
import { useGetAllEventsForVendorQuery } from "@/redux/features/vendor/vendorApi";
import VendorEventCard from "./VendorEventCard";
import { Pagination } from "antd";

const AllEventsByVendor = () => {
  const [activeTab, setActiveTab] = useState("pending");
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  // Build queryObj dynamically with pagination + status
  const queryObj = [
    { name: "page", value: pagination.current },
    { name: "limit", value: pagination.pageSize },
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
  ];

  // API Query
  const {
    data: registeredEvents,
    isLoading: isRegisteredLoading,
    isFetching: isRegisteredFetching,
    isError: isRegisteredError,
  } = useGetAllEventsForVendorQuery({ queryObj });

  const totalCount = registeredEvents?.data?.meta?.total || 0;

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({
      current: page,
      pageSize,
    });
  };

  const renderEvents = (
    events: any[] = [],
    isLoading: boolean,
    isError: boolean
  ) => {
    if (isLoading) {
      return <Loading />;
    }

    if (isError) {
      return (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed text-red-500">
          <p className="font-medium">Failed to load events</p>
        </div>
      );
    }

    if (!Array.isArray(events) || events.length === 0) {
      return (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
          <p className="text-lg font-medium">No events found</p>
        </div>
      );
    }

    return (
      <ul className="space-y-4">
        {events.map((event) => (
          <VendorEventCard key={event?.id} event={event} />
        ))}
      </ul>
    );
  };

  const getCurrentEvents = () => {
    return registeredEvents?.data?.data ?? [];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-medium">All Events</h1>
      </div>

      <Tabs
        defaultValue="pending"
        className="w-full"
        onValueChange={(value) => {
          setActiveTab(value);
          setPagination({ current: 1, pageSize: pagination.pageSize }); // reset to page 1 when switching tab
        }}
      >
        <TabsList className="mb-6 w-full justify-start gap-2 md:gap-6">
          {["pending", "upcoming", "active", "completed"].map((status) => (
            <TabsTrigger
              key={status}
              value={status}
              className="flex-1 md:flex-none capitalize cursor-pointer"
            >
              {status} Events
            </TabsTrigger>
          ))}
        </TabsList>

        {["pending", "upcoming", "active", "completed"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            {renderEvents(
              tab === activeTab ? getCurrentEvents() : [],
              tab === activeTab ? isRegisteredLoading : false,
              tab === activeTab ? isRegisteredError : false
            )}
          </TabsContent>
        ))}
      </Tabs>

      <div className="p-4 w-full flex flex-wrap justify-center">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={totalCount}
          onChange={handlePaginationChange}
          disabled={isRegisteredFetching}
        />
      </div>
    </div>
  );
};

export default AllEventsByVendor;
