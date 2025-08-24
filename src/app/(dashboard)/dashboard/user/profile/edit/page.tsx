import UpdateUserProfile from "@/components/dashboard/UserDashboard/UpdateUserProfile";
import WithRole from "@/role-wrapper/WithRole";

const ProfileEdit = () => {
  return (
    <WithRole allowedRoles={["USER"]}>
      <UpdateUserProfile />
    </WithRole>
  );
};

export default ProfileEdit;
