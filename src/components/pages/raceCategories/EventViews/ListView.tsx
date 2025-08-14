/* eslint-disable @typescript-eslint/no-explicit-any */
import EventViewCard from "@/components/cards/EventViewCard";

const ListView: React.FC<any> = ({ events }) => {
  console.log(events?.data?.data);
  return (
    <div className="space-y-4">
      {/* {events.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">
            No events match your filters. Try adjusting your criteria.
          </p>
        </div>
      ) : (
        events.map((event) => <EventViewCard key={event?.id} event={event} />)
      )} */}

      {events?.data?.data.map((event: any) => (
        <EventViewCard key={event?._id?.$oid} event={event} />
      ))}
    </div>
  );
};

export default ListView;
