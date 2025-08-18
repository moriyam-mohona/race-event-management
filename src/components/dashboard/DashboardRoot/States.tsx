/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { Wallet, CreditCard, Settings } from "lucide-react";
import { useGetAdminCardsDataQuery } from "@/redux/features/admin/adminApi";

// Icon mapping for first set of admin cards
const iconMap: Record<string, React.ReactNode> = {
  "Uploaded Events": <Settings className="h-6 w-6 text-white" />,
  "Active Events": <Wallet className="h-6 w-6 text-white" />,
  "Active Gears": <CreditCard className="h-6 w-6 text-white" />,
};

const States = () => {
  const { data } = useGetAdminCardsDataQuery({});
  const stats = data?.data?.[0] || []; // only first array

  return (
    <div className="py-8">
      <h1 className="text-2xl md:text-3xl font-medium mb-6">
        Dashboard Summary
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-6">
        {stats.map((stat: any, index: number) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-xl bg-green-50 px-6 py-10 shadow-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-800">
              {iconMap[stat.name] || (
                <Settings className="h-6 w-6 text-white" />
              )}
            </div>
            <div className="space-y-2">
              <div className="text-xl lg:text-3xl font-medium">
                {stat.value ?? 0}
              </div>
              <div className="text-muted-foreground">{stat.name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default States;
