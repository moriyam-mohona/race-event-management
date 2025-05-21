"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { raceEvents } from "@/lib/Events";
import EventViewCard from "@/components/cards/EventViewCard";

const AllEventsPage = () => {
  const eventsByStatus = {
    upcoming: raceEvents.filter((event) => event.status === "upcoming"),
    completed: raceEvents.filter((event) => event.status === "completed"),
  };

  const renderEvents = (events: typeof raceEvents) =>
    events.length > 0 ? (
      <div>
        {events.map((event) => (
          <EventViewCard key={event.id} event={event} />
        ))}
      </div>
    ) : (
      <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-dashed">
        <p className="text-lg font-medium">No events found</p>
        <p className="text-sm text-muted-foreground">
          Check back later for new updates.
        </p>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">All Events</h1>
        <p className="mt-2 text-muted-foreground">
          Browse and register for upcoming events or view past events.
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6 w-full justify-start gap-2 md:gap-10">
          {["upcoming", "completed"].map((status) => (
            <TabsTrigger
              key={status}
              value={status}
              className="flex-1 md:flex-none capitalize"
            >
              {status} Events
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="upcoming">
          {renderEvents(eventsByStatus.upcoming)}
        </TabsContent>
        <TabsContent value="completed">
          {renderEvents(eventsByStatus.completed)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AllEventsPage;
