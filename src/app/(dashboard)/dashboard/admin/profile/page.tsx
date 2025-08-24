import UserProfile from "@/components/dashboard/UserDashboard/UserProfile";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const AdminProfile = () => {
  return (
    <WithRole allowedRoles={["SUPER_ADMIN"]}>
      <UserProfile />
    </WithRole>
  );
};

export default AdminProfile;
