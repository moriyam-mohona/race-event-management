import AllEventsPage from "@/components/dashboard/UserDashboard/events/AllEventsPage";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const AllEvents = () => {
  return (
    <WithRole allowedRoles={["USER"]}>
      <AllEventsPage />
    </WithRole>
  );
};

export default AllEvents;
