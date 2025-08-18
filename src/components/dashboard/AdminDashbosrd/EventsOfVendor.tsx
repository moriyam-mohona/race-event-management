/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EventViewCard from "@/components/cards/EventViewCard";
import image from "@/assets/profile.png";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useGetAllEventsByVendorQuery } from "@/redux/features/admin/adminApi";
import { useState } from "react";
import Loading from "@/components/shared/Loading/Loading";

const EventsOfVendor = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [status, setStatus] = useState<
    "APPROVED" | "PENDING" | "ACTIVE" | "COMPLETED"
  >("PENDING");

  const { data: events, isLoading } = useGetAllEventsByVendorQuery({
    id,
    queryObj: [{ name: "eventStatus", value: status }],
  });

  const renderEvents = (events: any[]) =>
    events && events.length > 0 ? (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventViewCard key={event?.id} event={event} />
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
      <Tabs
        value={status.toLowerCase()}
        onValueChange={(val) => setStatus(val.toUpperCase() as any)}
        className="w-full"
      >
        <TabsList className="mb-6 w-full justify-start gap-2 md:gap-4">
          <TabsTrigger
            value="pending"
            className="flex-1 md:flex-none capitalize"
          >
            Pending Events
          </TabsTrigger>
          <TabsTrigger
            value="approved"
            className="flex-1 md:flex-none capitalize"
          >
            Upcoming Events
          </TabsTrigger>
          <TabsTrigger
            value="active"
            className="flex-1 md:flex-none capitalize"
          >
            Active Events
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="flex-1 md:flex-none capitalize"
          >
            Completed Events
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          {isLoading ? <Loading /> : renderEvents(events?.data?.data ?? [])}
        </TabsContent>
        <TabsContent value="approved">
          {isLoading ? <Loading /> : renderEvents(events?.data?.data ?? [])}
        </TabsContent>
        <TabsContent value="active">
          {isLoading ? <Loading /> : renderEvents(events?.data?.data ?? [])}
        </TabsContent>
        <TabsContent value="completed">
          {isLoading ? <Loading /> : renderEvents(events?.data?.data ?? [])}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EventsOfVendor;
