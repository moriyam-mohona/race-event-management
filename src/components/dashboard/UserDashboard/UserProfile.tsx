"use client";

import Loading from "@/components/shared/Loading/Loading";
import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Link from "next/link";
import React from "react";
import { FiEdit3 } from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";

const UserProfile = () => {
  const { data: getme, isLoading } = useGetMeQuery({});
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen space-y-8 max-w-5xl">
      {/* Profile header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl lg:text-4xl font-semibold">Your Profile</h2>
        <Link
          href="/dashboard/user/profile/edit"
          className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-colors"
        >
          <FiEdit3 />
          <span className="hidden md:block">Edit Profile</span>
        </Link>
      </div>

      {/* Profile Details */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileItem label="Full Name" value={getme?.data?.fullName} />
            <ProfileItem label="E-mail" value={getme?.data?.email} />
            <ProfileItem
              label="Date of Birth"
              value={
                getme?.data?.dateOfBirth
                  ? new Date(getme.data.dateOfBirth).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )
                  : "-"
              }
            />
            <ProfileItem label="Gender" value={getme?.data?.gender} />
          </div>
        </CardContent>
      </Card>

      {/* Location Details */}
      <Card className="shadow-md">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Location Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileItem label="Continent" value={getme?.data?.continent} />
            <ProfileItem label="Country" value={getme?.data?.country} />
            <ProfileItem label="Region" value={getme?.data?.region} />
            <ProfileItem label="Zip Code" value={getme?.data?.zipCode} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;

const ProfileItem = ({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) => (
  <div>
    <p className="text-xs uppercase text-gray-400 tracking-wide">{label}</p>
    <p className="text-base font-medium text-gray-800 mt-1">{value || "-"}</p>
  </div>
);
