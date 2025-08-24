import MyCommunityList from "@/components/dashboard/UserDashboard/MyCommunityList/MyCommunityList";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const Community = () => {
  return (
    <WithRole allowedRoles={["USER"]}>
      <MyCommunityList />
    </WithRole>
  );
};

export default Community;
