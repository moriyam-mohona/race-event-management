import AllEventsPage from "@/components/dashboard/UserDashboard/events/AllEventsPage";
import CreateEventPage from "@/components/dashboard/VendorDashboard/CreateEventPage";
import Link from "next/link";
import React from "react";
import { FiPlus } from "react-icons/fi";

const AllEvents = () => {
  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end">
          <Link
            href="/dashboard/vendor/create-event"
            className="bg-[#6BCB77] text-white px-4 py-1.5 flex items-center gap-2 rounded-md text-lg"
          >
            <FiPlus className="w-5 h-5" />
            Create Event
          </Link>
        </div>
      </div>
      <CreateEventPage />
      <AllEventsPage />
    </div>
  );
};

export default AllEvents;
