import VendorsListPage from "@/components/dashboard/AdminDashboard/VendorListPage";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const VendorList = () => {
  return (
    <WithRole allowedRoles={["ADMIN"]}>
      <VendorsListPage />
    </WithRole>
  );
};

export default VendorList;
