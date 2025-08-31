/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { MapPin, Calendar, Activity, MoreVertical } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import placeholderImage from "@/assets/event.png";
import { format } from "date-fns";
import { Dropdown } from "antd";
import { useStopEventRegistrationMutation } from "@/redux/features/vendor/vendorApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";

const VendorEventCard: React.FC<any> = ({ event }) => {
  const [stopEventRegistration] = useStopEventRegistrationMutation();

  // Toggle Registration Handler
  const toggleRegistration = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    const data = { isRegistrationOpen: newStatus };

    await handleAsyncWithToast(() =>
      stopEventRegistration({
        id,
        data,
      })
    );
  };

  // Dropdown Menu
  const menu = {
    items:
      event?.type === "SHARED"
        ? [
            {
              key: "remove",
              label: "Remove",
            },
          ]
        : [
            {
              key: "community",
              label: event?.Community ? (
                <Link
                  href={`/community/${event?.Community?.id}`}
                  className="text-primary hover:underline"
                >
                  Community
                </Link>
              ) : (
                <span className="text-gray-400 cursor-not-allowed">
                  Community
                </span>
              ),
            },
            {
              key: "toggle-registration",
              label: event?.isRegistrationOpen
                ? "Stop Registration"
                : "Open Registration",
            },
            { key: "remove", label: "Remove" },
          ],
    onClick: ({ key }: { key: string }) => {
      if (key === "community") {
        console.log("Go to Community | Event ID:", event?.id);
      } else if (key === "toggle-registration") {
        toggleRegistration(event?.id, event?.isRegistrationOpen);
      } else if (key === "remove") {
        console.log("Remove Event | Event ID:", event?.id);
      }
    },
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 rounded-2xl overflow-hidden mb-8 bg-white/90 backdrop-blur border border-gray-100 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 relative">
      {/* Event Image */}
      <div className="w-full md:w-1/3 lg:w-2/5 flex-shrink-0 overflow-hidden rounded-xl">
        <Image
          src={event?.eventImages || placeholderImage}
          alt={event?.title}
          width={1000}
          height={1000}
          className="w-full h-[180px] md:h-[340px] object-cover object-center rounded-xl transform hover:scale-105 transition-transform duration-500 bg-gray-100"
        />
      </div>

      {/* Event Details */}
      <div className="w-full flex flex-col justify-between mt-4 md:mt-0">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold font-montserrat text-xl md:text-2xl text-gray-900 tracking-tight">
              {event?.title}
            </h3>

            {/* Dropdown Action Menu */}
            {event?.eventStatus === "PENDING" ||
              (event?.eventStatus === "APPROVED" && (
                <Dropdown
                  menu={menu}
                  trigger={["click"]}
                  placement="bottomRight"
                >
                  <button className="p-2 rounded-full hover:bg-gray-100 transition">
                    <MoreVertical className="text-gray-600" />
                  </button>
                </Dropdown>
              ))}
          </div>

          {/* Event Info */}
          <div className="space-y-3 mt-4">
            {/* Address */}
            <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
              <MapPin size={18} className="text-primary flex-shrink-0" />
              <span className="truncate">{event?.address}</span>
            </div>

            {/* Dates */}
            <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
              <Calendar size={18} className="text-primary flex-shrink-0" />
              <span>
                {event?.startDate && event?.endDate
                  ? `${format(new Date(event.startDate), "d")} - ${format(
                      new Date(event.endDate),
                      "d MMM, yyyy"
                    )}`
                  : ""}
              </span>
            </div>

            {/* Category + Distance */}
            <div className="flex items-center gap-2 text-gray-700 text-sm sm:text-base">
              <Activity size={18} className="text-primary flex-shrink-0" />
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs sm:text-sm text-gray-800">
                {event?.category} • {event?.distance} Km
              </span>
            </div>

            {/* Price */}
            <p className="mt-4 text-xl sm:text-2xl font-bold text-primary">
              ${event?.price}{" "}
              <span className="text-gray-500 text-base">USD</span>
            </p>

            {/* Short Description */}
            <p className="text-gray-600 text-sm sm:text-base line-clamp-3 mt-2">
              {event?.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 mt-2">
          <Link
            href={
              event?.type === "SHARED"
                ? `/dashboard/vendor/all-events/verify-booking/${event?.id}`
                : `/dashboard/vendor/all-events/${event?.id}`
            }
            className="flex items-center justify-center gap-2 bg-primary text-white hover:bg-primary/90 px-5 py-2 rounded-xl text-sm sm:text-base shadow transition"
          >
            View Booking
          </Link>

          <Link
            href={`/race-categories/${event?.id}`}
            className="flex items-center justify-center gap-2 border border-primary text-primary hover:bg-primary hover:text-white px-5 py-2 rounded-xl text-sm sm:text-base transition"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorEventCard;
