import CommunityProfile from "@/components/pages/community/CommunityProfile/CommunityProfile";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const CommunityProfilePage = () => {
  return (
    <WithRole allowedRoles={["VENDOR", "SUPER_ADMIN", "USER"]}>
      <CommunityProfile />
    </WithRole>
  );
};

export default CommunityProfilePage;
