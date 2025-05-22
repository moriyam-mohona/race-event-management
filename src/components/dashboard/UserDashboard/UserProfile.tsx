import Link from "next/link";
import React from "react";
import { FiEdit3 } from "react-icons/fi";

const UserProfile = () => {
  return (
    <div className="h-screen">
      {/* Profile header  */}
      <div className="flex  items-center justify-between mb-10">
        <h2 className="text-2xl lg:text-[40px] font-medium ">
          Your Profile Information
        </h2>
        <Link
          href="/dashboard/user/profile/edit"
          className="flex items-center gap-2 bg-gray-200 px-5 py-1.5 rounded"
        >
          <FiEdit3 />
          <span className="hidden lg:block"> Edit</span>
        </Link>
      </div>

      {/* profile details  */}
      <div className="border border-gray-200 rounded-lg p-5 space-y-6">
        {/* Names  */}
        <div className="flex items-center justify-between">
          {/* First Name  */}
          <div className="w-full">
            <h2 className="text-lg font-medium">First Name</h2>
            <p className="text-gray-500">name</p>
          </div>
          {/* Last Name  */}
          <div className="w-full">
            <h2 className="text-lg font-medium">Last Name</h2>
            <p className="text-gray-500">Last Name</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {/* Date of Birth  */}
          <div className="w-full">
            <h2 className="text-lg font-medium">Date of Birth</h2>
            <p className="text-gray-500">sdas</p>
          </div>
          {/* Gender  */}
          <div className="w-full">
            <h2 className="text-lg font-medium">Gender</h2>
            <p className="text-gray-500">Gender</p>
          </div>
        </div>
        <div className="w-full">
          <h2 className="text-lg font-medium">E-mail</h2>
          <p className="text-gray-500">demo@gmail.com</p>
        </div>
      </div>

      <h2 className="text-2xl font-medium mt-10 mb-5">Location Details</h2>
      <div className="border border-gray-200 rounded-lg p-5 space-y-6">
        {/* Names  */}
        <div className="flex items-center justify-between">
          {/* First Name  */}
          <div className="w-full">
            <h2 className="text-lg font-medium">Continent</h2>
            <p className="text-gray-500">name</p>
          </div>
          {/* Last Name  */}
          <div className="w-full">
            <h2 className="text-lg font-medium">Country</h2>
            <p className="text-gray-500">Last Name</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {/* Date of Birth  */}
          <div className="w-full">
            <h2 className="text-lg font-medium">Region</h2>
            <p className="text-gray-500">sdas</p>
          </div>
          {/* Gender  */}
          <div className="w-full">
            <h2 className="text-lg font-medium">Zip code/ Postal code</h2>
            <p className="text-gray-500">Gender</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
