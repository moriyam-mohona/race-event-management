import Graphs from "@/components/dashboard/DashboardRoot/Graphs";
import States from "@/components/dashboard/DashboardRoot/States";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const Dashboard = () => {
  return (
    <WithRole allowedRoles={["ADMIN"]}>
      <States />
      <Graphs />
    </WithRole>
  );
};

export default Dashboard;
