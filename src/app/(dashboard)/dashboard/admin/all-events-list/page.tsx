import AllEventsByAdmin from "@/components/dashboard/AdminDashboard/AllEvents/AllEventsByAdmin";
import WithRole from "@/role-wrapper/WithRole";

const AllEvents = () => {
  return (
    <WithRole allowedRoles={["SUPER_ADMIN"]}>
      <AllEventsByAdmin />
    </WithRole>
  );
};

export default AllEvents;
