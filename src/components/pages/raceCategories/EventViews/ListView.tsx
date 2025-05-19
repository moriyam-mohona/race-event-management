import EventViewCard from "@/components/cards/EventViewCard";
import { RaceEvent } from "@/types/Common";
import React from "react";

interface ListViewProps {
  events: RaceEvent[];
}

const ListView: React.FC<ListViewProps> = ({ events }) => {
  return (
    <div className="space-y-4">
      {events.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No events match your filters. Try adjusting your criteria.
          </p>
        </div>
      ) : (
        events.map((event) => <EventViewCard key={event.id} event={event} />)
      )}
    </div>
  );
};

export default ListView;
