/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "@/components/shared/Loading/Loading";
import { useState } from "react";
import { useGetAllEventsForVendorQuery } from "@/redux/features/vendor/vendorApi";
import VendorEventCard from "./VendorEventCard";

const AllEventsByVendor = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Query for my registered events with dynamic status
  const {
    data: registeredEvents,
    isLoading: isRegisteredLoading,
    isError: isRegisteredError,
  } = useGetAllEventsForVendorQuery({
    queryObj: [
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
  });

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

    // TODO: replace with your event card component
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
        defaultValue="upcoming"
        className="w-full"
        onValueChange={(value) => setActiveTab(value)}
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
    </div>
  );
};

export default AllEventsByVendor;
