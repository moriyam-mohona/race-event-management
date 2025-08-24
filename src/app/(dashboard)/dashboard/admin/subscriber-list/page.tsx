import SubscriberListPage from "@/components/dashboard/AdminDashboard/SubscriberListPage";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const SubscriberList = () => {
  return (
    <WithRole allowedRoles={["SUPER_ADMIN"]}>
      <SubscriberListPage />
    </WithRole>
  );
};

export default SubscriberList;
