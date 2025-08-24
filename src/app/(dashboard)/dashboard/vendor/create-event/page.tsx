import CreateEventPage from "@/components/dashboard/VendorDashboard/createEvent/CreateEventPage";
import WithRole from "@/role-wrapper/WithRole";

const CreateEvent = () => {
  return (
    <WithRole allowedRoles={["VENDOR"]}>
      <CreateEventPage />
    </WithRole>
  );
};

export default CreateEvent;
