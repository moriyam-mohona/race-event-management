"use client";

import React from "react";
import { Wallet, CreditCard, Settings, DollarSign } from "lucide-react";
import { useGetVendorDashboardCardInfoQuery } from "@/redux/features/vendor/vendorApi";

// Mapping each stat to an icon
const iconMap: Record<string, React.ReactNode> = {
  "Total Sale": <DollarSign className="h-6 w-6 text-white" />,
  "Booking Income": <Wallet className="h-6 w-6 text-white" />,
  "Gear Income": <CreditCard className="h-6 w-6 text-white" />,
  "Withdrawable Amount": <Settings className="h-6 w-6 text-white" />,
};

const VendorCardInfo = () => {
  const { data: vendorStats } = useGetVendorDashboardCardInfoQuery({});

  // Convert API object into an array of { name, value }
  const stats = vendorStats?.data
    ? [
        { name: "Total Sale", value: vendorStats.data.totalSale },
        { name: "Booking Income", value: vendorStats.data.bookingIncome },
        { name: "Gear Income", value: vendorStats.data.gearIncome },
        {
          name: "Withdrawable Amount",
          value: vendorStats.data.withdrawAbleAmount,
        },
      ]
    : [];

  return (
    <div className="py-8">
      <h1 className="text-2xl md:text-3xl font-medium mb-6">
        Dashboard Summary
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-1 md:gap-6">
        {stats.map((stat, index) => (
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

export default VendorCardInfo;
