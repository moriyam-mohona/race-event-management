import UserProfile from "@/components/dashboard/UserDashboard/UserProfile";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const Profile = () => {
  return (
    <WithRole allowedRoles={["VENDOR"]}>
      <UserProfile />
    </WithRole>
  );
};

export default Profile;
