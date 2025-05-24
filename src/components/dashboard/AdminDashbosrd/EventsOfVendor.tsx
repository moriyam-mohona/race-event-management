"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { raceEvents } from "@/lib/Events";
import EventViewCard from "@/components/cards/EventViewCard";
import image from "@/assets/profile.png";
import Image from "next/image";
const EventsOfVendor = () => {
  const eventsByStatus = {
    pending: raceEvents.filter((event) => event.status === "pending"),
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
      <div className="mb-8 flex items-center gap-5">
        <Image
          src={image}
          alt="profile"
          width={1000}
          height={1000}
          className="w-20 h-20"
        />
        <div>
          <h1 className="text-2xl font-semibold">Global Marathon</h1>
          <p className="mt-2 text-muted-foreground">I D - 1244</p>
        </div>
      </div>

      <h2 className="mt-16 mb-5 font-medium text-2xl">All Events</h2>
      {/* Tabs */}
      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="mb-6 w-full justify-start gap-2 md:gap-4">
          {["pending", "upcoming", "completed"].map((status) => (
            <TabsTrigger
              key={status}
              value={status}
              className="flex-1 md:flex-none capitalize"
            >
              {status} Events
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="pending">
          {renderEvents(eventsByStatus.pending)}
        </TabsContent>
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

export default EventsOfVendor;
