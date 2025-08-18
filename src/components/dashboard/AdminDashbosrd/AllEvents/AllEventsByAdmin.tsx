/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Loading from "@/components/shared/Loading/Loading";
import { useState } from "react";
import AllEventsByAdminCard from "./AllEventsByAdminCard";
import { useGetAllEventsByAdminQuery } from "@/redux/features/admin/adminApi";

const AllEventsByAdmin = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const {
    data: registeredEvents,
    isLoading: isRegisteredLoading,
    isError: isRegisteredError,
    error: registeredError,
  } = useGetAllEventsByAdminQuery({
    queryObj: [
      {
        name: "eventStatus",
        value:
          activeTab === "active"
            ? "ACTIVE"
            : activeTab === "completed"
            ? "COMPLETED"
            : "APPROVED",
      },
    ],
  });

  const renderEvents = (
    events: any[] = [],
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
      <div>
        {events.map((event: any) => (
          <AllEventsByAdminCard key={event?.id} event={event} />
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-medium">All Events</h1>
      </div>

      <Tabs
        defaultValue="upcoming"
        className="w-full"
        onValueChange={(value: string) => setActiveTab(value)}
      >
        <TabsList className="mb-6 w-full justify-start gap-2 md:gap-6">
          {["upcoming", "active", "completed"].map((eventStatus) => (
            <TabsTrigger
              key={eventStatus}
              value={eventStatus}
              className="flex-1 md:flex-none capitalize"
            >
              {eventStatus} Events
            </TabsTrigger>
          ))}
        </TabsList>

        {["upcoming", "active", "completed"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            {renderEvents(
              tab === activeTab ? registeredEvents?.data?.data ?? [] : [],
              tab === activeTab ? isRegisteredLoading : false,
              tab === activeTab ? isRegisteredError : false,
              tab === activeTab ? registeredError : null
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AllEventsByAdmin;
