/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventViewCard from "@/components/cards/EventViewCard";
import {
  useGetAllMyRegisteredEventsQuery,
  useGetAllSharedEventsQuery,
} from "@/redux/features/event/eventApi";
import Loading from "@/components/shared/Loading/Loading";

const AllEventsPage = () => {
  // Query with status for my registered events
  const { data: activeEvents, isLoading: isActiveLoading } =
    useGetAllMyRegisteredEventsQuery({
      queryObj: [{ name: "status", value: "ACTIVE" }],
    });

  const { data: upcomingEvents, isLoading: isUpcomingLoading } =
    useGetAllMyRegisteredEventsQuery({
      queryObj: [{ name: "status", value: "APPROVED" }],
    });

  const { data: completedEvents, isLoading: isCompletedLoading } =
    useGetAllMyRegisteredEventsQuery({
      queryObj: [{ name: "status", value: "COMPLETED" }],
    });

  const {
    data: sharedEvents,
    isLoading: isSharedLoading,
    isError: isSharedError,
    error: sharedError,
  } = useGetAllSharedEventsQuery({});

  const normalizeEvents = (raw: any[] = []) =>
    Array.isArray(raw) ? raw.map((item: any) => item?.events ?? item) : [];

  const renderEvents = (events: any[], isLoading: boolean) =>
    isLoading ? (
      <Loading />
    ) : !Array.isArray(events) || events.length === 0 ? (
      <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
        <p className="text-lg font-medium">No events found</p>
        <p className="text-sm text-muted-foreground">
          Check back later for new updates.
        </p>
      </div>
    ) : (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event: any) => (
          <EventViewCard key={event?.id} event={event} />
        ))}
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-medium">All Events</h1>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
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

        <TabsContent value="active">
          {renderEvents(activeEvents?.data?.data ?? [], isActiveLoading)}
        </TabsContent>

        <TabsContent value="upcoming">
          {renderEvents(upcomingEvents?.data?.data ?? [], isUpcomingLoading)}
        </TabsContent>

        <TabsContent value="completed">
          {renderEvents(completedEvents?.data?.data ?? [], isCompletedLoading)}
        </TabsContent>

        <TabsContent value="shared">
          {isSharedLoading ? (
            <Loading />
          ) : isSharedError ? (
            <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed text-red-500">
              <p className="font-medium">Failed to load shared events</p>
              <pre className="mt-2 max-w-full overflow-auto text-xs text-gray-400">
                {JSON.stringify(sharedError, null, 2)}
              </pre>
            </div>
          ) : (
            renderEvents(normalizeEvents(sharedEvents?.data?.data ?? []), false)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AllEventsPage;
