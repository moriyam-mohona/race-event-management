import CommunityMember from "@/components/dashboard/AdminDashboard/ComunityList/CommunityMember";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const DisplayCommunityMembersByAdmin = () => {
  return (
    <WithRole allowedRoles={["ADMIN"]}>
      <CommunityMember />
    </WithRole>
  );
};

export default DisplayCommunityMembersByAdmin;
