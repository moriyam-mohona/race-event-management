/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from "react";
import { MapPin, Calendar, Activity, Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EventViewCard: React.FC<any> = ({ event }) => {
  return (
    <div className="flex flex-col md:flex-row gap-4 lg:gap-6 rounded-lg overflow-hidden mb-6 bg-white border border-gray-100 shadow hover:shadow-md transition-shadow duration-300 p-3 sm:p-4 relative">
      <div className="w-full md:w-1/3 overflow-hidden">
        <Image
          src={event?.imageUrl || "/placeholder.svg"}
          alt={event?.title}
          width={1000}
          height={1000}
          className="w-full h-[200px] md:h-[300px] object-cover object-center rounded-lg"
        />
      </div>

      <div className="w-full md:w-2/3 flex flex-col justify-between mt-3 md:mt-0">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold font-montserrat text-lg sm:text-xl text-gray-800 mb-2 sm:mb-4 pr-2">
              {event?.title}
            </h3>

            <button className="text-secondary hover:text-secondary transition-colors duration-200 flex-shrink-0">
              <Bookmark size={24} />
            </button>
          </div>

          <div className="space-y-1 mb-3">
            <div className="flex items-center">
              <MapPin
                size={18}
                className="text-secondary mr-2 sm:mr-4 flex-shrink-0"
              />
              <span className="text-gray-700 text-sm sm:text-base">
                {event?.location?.city}, {event?.location?.country}
              </span>
            </div>
            <div className="flex items-center">
              <Calendar
                size={18}
                className="text-secondary mr-2 sm:mr-4 flex-shrink-0"
              />
              <span className="text-gray-700 text-sm sm:text-base">
                {event?.date}
              </span>
            </div>
            <div className="flex items-center">
              <Activity
                size={18}
                className="text-secondary mr-2 sm:mr-4 flex-shrink-0"
              />
              <span className="text-gray-700 text-sm sm:text-base">
                {event?.category} ({event?.distance})
              </span>
            </div>
            <p className="mt-3 sm:mt-6 text-gray-700 text-lg sm:text-xl font-medium">
              {event?.price}
            </p>
            <p className="text-gray-700 text-sm sm:text-base line-clamp-2 md:line-clamp-3 lg:line-clamp-none">
              {event?.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end mt-2">
          <Link
            href={`/race-categories/${event?.id}`}
            className="bg-transparent hover:bg-primary text-primary hover:text-white border border-primary px-4 sm:px-6 py-2 sm:py-3 rounded text-sm sm:text-base transition-colors duration-200"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventViewCard;
