import React from "react";
import { MapPin, Calendar, Activity } from "lucide-react";
import { Event } from "@/types/Common";
import Image from "next/image";
import { format, isSameMonth, isSameYear } from "date-fns";
import Link from "next/link";

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const start = new Date(event?.startDate?.$date);
  const end = new Date(event?.endDate?.$date);

  const display = isSameYear(start, end)
    ? isSameMonth(start, end)
      ? `${format(start, "d")}-${format(end, "d MMM, yyyy")}` // 8-10 Aug, 2025
      : `${format(start, "d MMM")} - ${format(end, "d MMM, yyyy")}` // 28 Aug - 2 Sep, 2025
    : `${format(start, "d MMM, yyyy")} - ${format(end, "d MMM, yyyy")}`;

  return (
    <div className="border rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <Image
          src={event?.eventImages}
          alt={event?.title}
          width={1000}
          height={1000}
          priority
          className="w-full bg-gray-50/70 h-48 shadow object-cover"
        />
      </div>

      <div className="px-5 py-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 h-14">
          {event?.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-orange-500" />
            <span>{event?.address}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-orange-500" />
            <span>{display}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Activity className="w-4 h-4 mr-2 text-orange-500" />
            <span>{event?.category}</span>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-gray-600">
          <p className="text-xl font-medium text-gray-800">
            $ {event?.price} {event?.currency}
          </p>
          <p className="h-16 *:lg:h-12">
            {event?.description?.split(" ").slice(0, 16).join(" ") +
              (event?.description?.split(" ").length > 16 ? "..." : "")}
          </p>
        </div>
        <div className="mt-10">
          <Link
            href={`/race-categories/${event?._id?.$oid}`}
            className="px-6 py-2 bg-transparent border border-primary text-primary hover:text-white rounded-md hover:bg-primary transition-colors duration-300"
          >
            See more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
