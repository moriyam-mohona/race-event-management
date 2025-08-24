import AllEventsByVendor from "@/components/dashboard/VendorDashboard/allEventsByVendor/AllEventsByVendor";
import WithRole from "@/role-wrapper/WithRole";
import Link from "next/link";
import { FiPlus } from "react-icons/fi";
import { IoShareSocialOutline } from "react-icons/io5";

const AllEvents = () => {
  return (
    <WithRole allowedRoles={["VENDOR"]}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end gap-4">
          <Link
            href="/dashboard/vendor/create-share-event"
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-base font-medium
             bg-gray-100 border border-gray-300 text-gray-800 shadow-sm
             hover:bg-gray-200 hover:shadow-md hover:scale-[1.02]
             transition-all duration-200"
          >
            <IoShareSocialOutline className="w-5 h-5" />
            Share Event
          </Link>

          <Link
            href="/dashboard/vendor/create-event"
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-base font-medium
             bg-[#6BCB77] text-white shadow-sm
             hover:bg-[#5bb566] hover:shadow-md hover:scale-[1.02]
             transition-all duration-200"
          >
            <FiPlus className="w-5 h-5" />
            Create Event
          </Link>
        </div>
      </div>
      <AllEventsByVendor />
    </WithRole>
  );
};

export default AllEvents;
