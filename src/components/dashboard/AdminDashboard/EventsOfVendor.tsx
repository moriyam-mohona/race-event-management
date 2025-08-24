/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import image from "@/assets/profile.png";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  useGetAllEventsOfVendorQuery,
  useGetSingleVendorQuery,
} from "@/redux/features/admin/adminApi";
import { useState } from "react";
import Loading from "@/components/shared/Loading/Loading";
import AllEventsByAdminCard from "./AllEvents/AllEventsByAdminCard";

const EventsOfVendor = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: vendor } = useGetSingleVendorQuery(id);
  const [status, setStatus] = useState<
    "APPROVED" | "PENDING" | "ACTIVE" | "COMPLETED"
  >("PENDING");

  const { data: events, isLoading } = useGetAllEventsOfVendorQuery({
    id,
    queryObj: [{ name: "eventStatus", value: status }],
  });

  const renderEvents = (events: any[]) =>
    events && events.length > 0 ? (
      <div className="">
        {events.map((event) => (
          <AllEventsByAdminCard key={event?.id} event={event} />
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
          src={vendor?.data?.profileImage || image}
          alt="profile"
          width={1000}
          height={1000}
          className="w-16 h-16"
        />
        <div>
          <h1 className="text-2xl font-semibold">{vendor?.data?.fullName}</h1>
        </div>
      </div>

      <h2 className="mt-16 mb-5 font-medium text-2xl">All Events</h2>

      {/* Tabs */}
      <Tabs
        value={status.toLowerCase()}
        onValueChange={(val: string) => setStatus(val.toUpperCase() as any)}
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
