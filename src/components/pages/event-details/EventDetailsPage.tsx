"use client";

import { eventData } from "@/lib/eventData";
import { EventHeader } from "./EventHeader";
import { EventDescription } from "./EventDescription";
import { EventLocation } from "./EventLocation";
import { NeededGears } from "./NeededGears";
import { EventFAQs } from "./EventFAQs";

const EventDetailsPage = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl space-y-10">
      <EventHeader {...eventData} />
      <div className="pt-10 mt-10 space-y-10">
        <EventDescription {...eventData} />
        <EventLocation {...eventData} />
        <NeededGears {...eventData} />
        <EventFAQs {...eventData} />
      </div>
    </div>
  );
};

export default EventDetailsPage;
