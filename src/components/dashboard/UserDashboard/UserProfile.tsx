"use client";

import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Link from "next/link";
import React from "react";
import { FiEdit3 } from "react-icons/fi";

const UserProfile = () => {
  const { data: getme } = useGetMeQuery({});
  console.log(getme);

  return (
    <div className="h-screen">
      {/* Profile header  */}
      <div className="flex  items-center justify-between mb-10">
        <h2 className="text-2xl lg:text-4xl font-medium ">
          Your Profile Information
        </h2>
        <Link
          href="/dashboard/user/profile/edit"
          className="flex items-center gap-2 bg-gray-200 px-5 py-1.5 rounded"
        >
          <FiEdit3 />
          <span className="hidden lg:block">Edit</span>
        </Link>
      </div>

      {/* profile details  */}
      <div className="border border-gray-200 rounded-lg p-5 space-y-6">
        {/* Names  */}
        <div className="flex items-center justify-between">
          {/* Full Name  */}
          <div className="w-full">
            <h2 className="text-base md:text-lg font-medium">Full Name</h2>
            <p className="text-gray-500 text-sm md:text-base">
              {getme?.data?.fullName}
            </p>
          </div>
          {/* Email  */}
          <div className="w-full">
            <h2 className="text-base md:text-lg font-medium">E-mail</h2>
            <p className="text-gray-500 text-sm md:text-base">
              {getme?.data?.email}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {/* Date of Birth  */}
          <div className="w-full">
            <h2 className="text-base md:text-lg font-medium">Date of Birth</h2>
            <p className="text-gray-500 text-sm md:text-base">
              {getme?.data?.dateOfBirth
                ? new Date(getme.data.dateOfBirth).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "-"}
            </p>
          </div>

          {/* Gender  */}
          <div className="w-full">
            <h2 className="text-base md:text-lg font-medium">Gender</h2>
            <p className="text-gray-500 text-sm md:text-base">
              {getme?.data?.gender}
            </p>
          </div>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-medium mt-10 mb-5">
        Location Details
      </h2>
      <div className="border border-gray-200 rounded-lg p-5 space-y-6">
        {/* Names  */}
        <div className="flex items-center justify-between">
          {/* First Name  */}
          <div className="w-full">
            <h2 className="text-base md:text-lg font-medium">Continent</h2>
            <p className="text-gray-500 text-sm md:text-base">
              {getme?.data?.continent}
            </p>
          </div>
          {/* Last Name  */}
          <div className="w-full">
            <h2 className="text-base md:text-lg font-medium">Country</h2>
            <p className="text-gray-500 text-sm md:text-base">
              {getme?.data?.country}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {/* Date of Birth  */}
          <div className="w-full">
            <h2 className="text-base md:text-lg font-medium">Region</h2>
            <p className="text-gray-500 text-sm md:text-base">
              {getme?.data?.region}
            </p>
          </div>
          {/* Zip Code  */}
          <div className="w-full">
            <h2 className="text-base md:text-lg font-medium">Zip code</h2>
            <p className="text-gray-500 text-sm md:text-base">
              {getme?.data?.zipCode}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
