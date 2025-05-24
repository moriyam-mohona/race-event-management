import React from "react";
import Link from "next/link";
import { GoPerson } from "react-icons/go";
import profile from "@/assets/profile.png";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { LuMessagesSquare } from "react-icons/lu";
import { LiaListAltSolid } from "react-icons/lia";
import { BsBookmark } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";

const sidebars: Record<
  string,
  { name: string; href: string; icon: React.ReactNode }[]
> = {
  admin: [
    {
      name: "Dashboard",
      href: "/dashboard/vendor/dashboard",
      icon: <GoPerson />,
    },
    { name: " Profile", href: "/dashboard/admin/profile", icon: <GoPerson /> },
    {
      name: " Vendor List",
      href: "/dashboard/admin/vendor-list",
      icon: <GoPerson />,
    },
    {
      name: " Community",
      href: "/dashboard/admin/community-list",
      icon: <GoPerson />,
    },
    {
      name: " All Events",
      href: "/dashboard/admin/all-events-list",
      icon: <GoPerson />,
    },
    {
      name: " Subscriber",
      href: "/dashboard/admin/subscriber-list",
      icon: <GoPerson />,
    },
  ],
  user: [
    { name: "Profile", href: "/dashboard/user/profile", icon: <GoPerson /> },
    {
      name: "Community",
      href: "/dashboard/user/community",
      icon: <LuMessagesSquare />,
    },
    {
      name: "All Events",
      href: "/dashboard/user/all-events",
      icon: <LiaListAltSolid />,
    },
    {
      name: "Saved Events",
      href: "/dashboard/user/saved-events",
      icon: <BsBookmark />,
    },
  ],
  vendor: [
    {
      name: "Dashboard",
      href: "/dashboard/vendor/dashboard",
      icon: <LuLayoutDashboard />,
    },
    { name: "Profile", href: "/dashboard/vendor/profile", icon: <GoPerson /> },
    {
      name: "All Events",
      href: "/dashboard/vendor/all-events",
      icon: <LiaListAltSolid />,
    },
    {
      name: "Booking List",
      href: "/dashboard/vendor/booking-list",
      icon: <IoCalendarOutline />,
    },
  ],
};

const Sidebar = ({ role }: { role: string }) => {
  const links = sidebars[role] || [];

  return (
    <div className="h-full flex flex-col justify-between items-center">
      {/* Top section */}
      <div className="mt-20 flex flex-col items-center gap-5">
        <div className="flex flex-col items-center">
          <Image
            src={profile}
            alt="profile"
            width={1000}
            height={1000}
            className="w-24 h-24"
          />
          <h2 className="mt-5 text-2xl font-medium">Username</h2>
          <p className="text-gray-600">I D - 1244</p>
        </div>
        <div className="w-full my-4">
          <hr className="h-2 border-t border-gray-200" />
        </div>
        <nav className="space-y-2">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <button className="w-full flex items-center justify-center gap-3 border rounded bg-green-50/60 px-8 py-2 mb-3">
                <span className="text-xl">{link.icon}</span> {link.name}
              </button>
            </Link>
          ))}
        </nav>
      </div>
      <button className="flex items-center gap-2 text-[#FF7474] font-medium text-lg mb-10">
        <FiLogOut />
        Log out
      </button>
    </div>
  );
};

export default Sidebar;
