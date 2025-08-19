import AllEventsByVendor from "@/components/dashboard/VendorDashboard/allEventsByVendor/AllEventsByVendor";
import Link from "next/link";
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
      <AllEventsByVendor />
    </div>
  );
};

export default AllEvents;
