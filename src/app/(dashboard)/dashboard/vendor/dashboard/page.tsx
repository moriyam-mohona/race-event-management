import Graphs from "@/components/dashboard/DashboardRoot/Graphs";
import VendorCardInfo from "@/components/dashboard/VendorDashboard/VendorDashboardRoot/VendorDashboardCard";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <VendorCardInfo />
      <Graphs />
    </div>
  );
};

export default Dashboard;
