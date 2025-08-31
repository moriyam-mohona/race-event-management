/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MapPin, Calendar, Activity } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import placeholderImage from "@/assets/event.png";
import { format } from "date-fns";
import { FaRegBookmark } from "react-icons/fa";
import { useAddEventToSavedMutation } from "@/redux/features/event/eventApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";

const SavedEventCard: React.FC<any> = ({ event }) => {
  const [addEventToSaved] = useAddEventToSavedMutation();

  const handleAddToBookmark = () => {
    handleAsyncWithToast(() => addEventToSaved(event?.id));
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-4 lg:gap-6 rounded-lg overflow-hidden mb-6 bg-white border border-gray-100 shadow hover:shadow-md transition-shadow duration-300 p-3 sm:p-4 relative">
      {/* Event Image */}
      <div className="w-full md:w-1/3 lg:w-2/5 overflow-hidden flex-shrink-0">
        <Image
          src={event?.eventImages || placeholderImage}
          alt={event?.title}
          width={1000}
          height={1000}
          className="bg-gray-100 w-full h-[200px] md:h-[330px] object-cover object-center rounded-lg"
        />
      </div>

      {/* Event Details */}
      <div className="w-full flex flex-col justify-between mt-3 md:mt-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold font-montserrat text-lg sm:text-xl text-gray-800 mb-2 sm:mb-4">
              {event?.title}
            </h3>
            <button
              onClick={handleAddToBookmark}
              className="cursor-pointer flex-shrink-0"
            >
              <FaRegBookmark className="text-xl font-semibold text-secondary" />
            </button>
          </div>

          <div className="space-y-2 mb-3">
            {/* Address */}
            <div className="flex items-center">
              <MapPin
                size={18}
                className="text-secondary mr-2 sm:mr-3 flex-shrink-0"
              />
              <span className="text-gray-700 text-sm sm:text-base line-clamp-1">
                {event?.address}
              </span>
            </div>

            {/* Dates */}
            <div className="flex items-center">
              <Calendar
                size={18}
                className="text-secondary mr-2 sm:mr-3 flex-shrink-0"
              />
              <span className="text-gray-700 text-sm sm:text-base">
                {event?.startDate && event?.endDate
                  ? `${format(new Date(event.startDate), "d")} - ${format(
                      new Date(event.endDate),
                      "d MMM, yyyy"
                    )}`
                  : ""}
              </span>
            </div>

            {/* Category + Distance */}
            <div className="flex items-center">
              <Activity
                size={18}
                className="text-secondary mr-2 sm:mr-3 flex-shrink-0"
              />
              <span className="text-gray-700 text-sm sm:text-base">
                {event?.category} ({event?.distance} Km)
              </span>
            </div>

            {/* Price */}
            <p className="mt-3 sm:mt-4 text-gray-700 text-lg sm:text-xl font-medium">
              ${event?.price} USD
            </p>

            {/* Short Description */}
            <p className="text-gray-700 text-sm sm:text-base line-clamp-3">
              {event?.description}
            </p>
          </div>
        </div>

        {/* Details Button */}
        <div className="flex items-center justify-end mt-3">
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

export default SavedEventCard;
