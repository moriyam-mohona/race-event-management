"use client";

// import { eventData } from "@/lib/eventData";
import { EventHeader } from "./EventHeader";
import { EventDescription } from "./EventDescription";
import { EventLocation } from "./EventLocation";
import { NeededGears } from "./NeededGears";
import { EventFAQs } from "./EventFAQs";
import { useGetSingleEventQuery } from "@/redux/features/event/eventApi";
import { useParams } from "next/navigation";

const EventDetailsPage = () => {
  const id = useParams().id;
  const { data: detailEventData } = useGetSingleEventQuery(id);
  const eventData = detailEventData?.data;
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-10">
      <EventHeader data={eventData} />
      <div className="pt-10 mt-10 space-y-10">
        <EventDescription data={eventData} />
        <EventLocation data={eventData} />
        <NeededGears data={eventData} />
        <EventFAQs data={eventData} />
      </div>
    </div>
  );
};

export default EventDetailsPage;
