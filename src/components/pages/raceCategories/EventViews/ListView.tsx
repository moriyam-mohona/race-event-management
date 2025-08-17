/* eslint-disable @typescript-eslint/no-explicit-any */
import EventViewCard from "@/components/cards/EventViewCard";

const ListView: React.FC<any> = ({ events }) => {
  return (
    <div className="space-y-4">
      {events?.data?.data.map((event: any) => (
        <EventViewCard key={event?._id?.$oid} event={event} />
      ))}
    </div>
  );
};

export default ListView;
