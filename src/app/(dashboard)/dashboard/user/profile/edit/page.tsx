import UpdateUserProfile from "@/components/dashboard/UserDashboard/UpdateUserProfile";
import WithRole from "@/role-wrapper/WithRole";

const ProfileEdit = () => {
  return (
    <WithRole allowedRoles={["VENDOR", "SUPER_ADMIN", "USER"]}>
      <UpdateUserProfile />
    </WithRole>
  );
};

export default ProfileEdit;
