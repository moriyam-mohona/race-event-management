import CommunityListPage from "@/components/dashboard/AdminDashboard/ComunityList/CommunityListPage";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const CommunityList = () => {
  return (
    <WithRole allowedRoles={["SUPER_ADMIN"]}>
      <CommunityListPage />
    </WithRole>
  );
};

export default CommunityList;
