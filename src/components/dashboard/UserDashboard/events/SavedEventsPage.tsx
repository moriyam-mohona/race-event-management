import EventViewCard from "@/components/cards/EventViewCard";
import React from "react";
import { raceEvents } from "@/lib/Events";

const SavedEventsPage = () => {
  // Filter events to show only upcoming and bookmarked events
  const filteredEvents = raceEvents.filter((event) => event.bookmark === true);

  return (
    <div>
      {filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <EventViewCard key={event.id} event={event} />
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No saved upcoming events found.</p>
        </div>
      )}
    </div>
  );
};

export default SavedEventsPage;
