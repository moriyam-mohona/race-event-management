/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GoPerson } from "react-icons/go";
import profile from "@/assets/images/profile.jpg";
import Image from "next/image";
import { FiLogOut } from "react-icons/fi";
import { LuMessagesSquare } from "react-icons/lu";
import { LiaListAltSolid } from "react-icons/lia";
import { BsBookmark } from "react-icons/bs";
import { LuLayoutDashboard } from "react-icons/lu";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import Swal from "sweetalert2";
import { useGetMeQuery } from "@/redux/features/auth/authApi";

const sidebars: Record<
  string,
  { name: string; href: string; icon: React.ReactNode }[]
> = {
  SUPER_ADMIN: [
    {
      name: "Dashboard",
      href: "/dashboard/admin/dashboard",
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
  USER: [
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
  VENDOR: [
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
  ],
};

// Skeleton component
const SidebarSkeleton = () => {
  return (
    <div className="h-full flex flex-col justify-between items-center animate-pulse">
      <div className="mt-20 flex flex-col items-center gap-5 w-full px-4">
        {/* Profile Image Skeleton */}
        <div className="w-28 h-28 rounded-full bg-gray-200" />

        {/* Name Skeleton */}
        <div className="h-5 w-32 bg-gray-200 rounded mt-4" />

        {/* ID Skeleton */}
        <div className="h-4 w-20 bg-gray-200 rounded mt-2" />

        {/* Divider */}
        <div className="w-full my-4">
          <hr className="h-2 border-t border-gray-200" />
        </div>

        {/* Sidebar Links Skeleton */}
        <div className="flex flex-col gap-3 w-full">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="w-full h-10 bg-gray-200 rounded" />
          ))}
        </div>
      </div>

      {/* Logout Button Skeleton */}
      <div className="w-full h-10 bg-gray-200 rounded mb-10" />
    </div>
  );
};

const Sidebar = ({ role }: { role: string }) => {
  const pathname = usePathname();
  const links = sidebars[role] || [];
  const dispatch = useAppDispatch();
  const { data: getme, isLoading } = useGetMeQuery({});

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log out",
    });

    if (result.isConfirmed) {
      try {
        await dispatch(logout());
        Swal.fire({
          title: "Logged out!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Logout failed. Please try again.",
          icon: "error",
        });
      }
    }
  };

  if (isLoading) return <SidebarSkeleton />;

  return (
    <div className="h-full flex flex-col justify-between items-center">
      {/* Top section */}
      <div className="mt-20 flex flex-col items-center gap-5">
        <div className="flex flex-col items-center">
          <Image
            src={getme?.data?.profileImage || profile}
            alt="profile"
            width={1000}
            height={1000}
            className="w-28 h-28 bg-gray-100 rounded-full object-cover border border-gray-200"
          />
          <h2 className="mt-5 text-2xl font-medium">{getme?.data?.fullName}</h2>
          {getme?.data?.uniqueId && (
            <p className="text-gray-600">I D - {getme?.data?.uniqueId}</p>
          )}
        </div>
        <div className="w-full my-4">
          <hr className="h-2 border-t border-gray-200" />
        </div>
        <nav className="w-full px-2">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href}>
                <button
                  className={`w-full flex items-center justify-center gap-3 border rounded px-8 py-2 mb-3 transition-colors duration-200 cursor-pointer ${
                    isActive
                      ? "bg-green-50/60 text-green-900 font-semibold"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xl">{link.icon}</span>
                  {link.name}
                </button>
              </Link>
            );
          })}
        </nav>
      </div>
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 bg-red-500 text-white font-semibold text-sm px-5 py-2 rounded-lg shadow-md hover:bg-red-600 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-300 mb-10"
      >
        <FiLogOut className="text-xl" />
        Log out
      </button>
    </div>
  );
};

export default Sidebar;
