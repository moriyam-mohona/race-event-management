/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Wallet, CreditCard, Settings, DollarSign, Users } from "lucide-react";

// Mock: Replace with real auth context or state
function useUserRole(): UserRole {
  return "vendor"; // e.g. 'vendor', 'admin', etc.
}

// Dummy stat data function based on user role
type UserRole = "vendor" | "admin";

const getStatsByRole = (role: UserRole) => {
  const baseStats: Record<
    UserRole,
    { label: string; value: string; icon: React.ReactNode }[]
  > = {
    vendor: [
      {
        label: "Total Sale",
        value: "$121,100",
        icon: <Wallet className="h-6 w-6 text-white" />,
      },
      {
        label: "Booking Income",
        value: "$9,000",
        icon: <CreditCard className="h-6 w-6 text-white" />,
      },
      {
        label: "Gear Income",
        value: "$1,000",
        icon: <Settings className="h-6 w-6 text-white" />,
      },
    ],
    admin: [
      {
        label: "Total Revenue",
        value: "$500,000",
        icon: <DollarSign className="h-6 w-6 text-white" />,
      },
      {
        label: "Vendors Onboarded",
        value: "120",
        icon: <Users className="h-6 w-6 text-white" />,
      },
    ],
  };
  return baseStats[role] || [];
};

// Reusable card component
const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <div className="flex items-center gap-4 rounded-xl bg-green-50 px-6 py-10 shadow-sm">
    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-800">
      {icon}
    </div>
    <div className="space-y-2">
      <div className="text-xl lg:text-3xl font-medium">{value}</div>
      <div className="text-muted-foreground">{label}</div>
    </div>
  </div>
);

// Main page
const States = () => {
  const role = useUserRole();
  const stats = getStatsByRole(role);

  return (
    <div className=" py-8">
      <h1 className="text-2xl md:text-3xl font-medium mb-6">
        Dashboard Summary
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-6">
        {stats.map((stat: any, index: any) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default States;
