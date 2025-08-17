/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventViewCard from "@/components/cards/EventViewCard";
import {
  useGetAllMyRegisteredEventsQuery,
  useGetAllSharedEventsQuery,
} from "@/redux/features/event/eventApi";
import Loading from "@/components/shared/Loading/Loading";
import { useState } from "react";

const AllEventsPage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Query for my registered events with dynamic status
  const {
    data: registeredEvents,
    isLoading: isRegisteredLoading,
    isError: isRegisteredError,
    error: registeredError,
  } = useGetAllMyRegisteredEventsQuery(
    {
      queryObj: [
        {
          name: "status",
          value:
            activeTab === "active"
              ? "ACTIVE"
              : activeTab === "completed"
              ? "COMPLETED"
              : "APPROVED",
        },
      ],
    },
    { skip: activeTab === "shared" }
  );

  // Query for shared events
  const {
    data: sharedEvents,
    isLoading: isSharedLoading,
    isError: isSharedError,
    error: sharedError,
  } = useGetAllSharedEventsQuery({}, { skip: activeTab !== "shared" });

  const normalizeEvents = (raw: any[] = []) =>
    Array.isArray(raw) ? raw.map((item: any) => item?.events ?? item) : [];

  const renderEvents = (
    events: any[],
    isLoading: boolean,
    isError: boolean,
    error: any
  ) => {
    if (isLoading) {
      return <Loading />;
    }

    if (isError) {
      return (
        <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed text-red-500">
          <p className="font-medium">Failed to load events</p>
          <pre className="mt-2 max-w-full overflow-auto text-xs text-gray-400">
            {JSON.stringify(error, null, 2)}
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event: any) => (
          <EventViewCard key={event?.id} event={event} />
        ))}
      </div>
    );
  };

  const getCurrentEvents = () => {
    if (activeTab === "shared") {
      return normalizeEvents(sharedEvents?.data?.data ?? []);
    }
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
          {["active", "upcoming", "completed", "shared"].map((status) => (
            <TabsTrigger
              key={status}
              value={status}
              className="flex-1 md:flex-none capitalize"
            >
              {status} Events
            </TabsTrigger>
          ))}
        </TabsList>

        {["active", "upcoming", "completed", "shared"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            {renderEvents(
              tab === activeTab ? getCurrentEvents() : [],
              tab === activeTab && activeTab === "shared"
                ? isSharedLoading
                : tab === activeTab && activeTab !== "shared"
                ? isRegisteredLoading
                : false,
              tab === activeTab && activeTab === "shared"
                ? isSharedError
                : tab === activeTab && activeTab !== "shared"
                ? isRegisteredError
                : false,
              tab === activeTab && activeTab === "shared"
                ? sharedError
                : tab === activeTab && activeTab !== "shared"
                ? registeredError
                : null
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AllEventsPage;
