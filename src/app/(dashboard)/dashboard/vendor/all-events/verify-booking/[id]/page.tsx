import VerifyList from "@/components/dashboard/VendorDashboard/verifyList/VerifyList";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const VerifyListPage = () => {
  return (
    <WithRole allowedRoles={["VENDOR"]}>
      <VerifyList />
    </WithRole>
  );
};

export default VerifyListPage;
