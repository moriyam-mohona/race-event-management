import SavedEventsPage from "@/components/dashboard/UserDashboard/events/SavedEvents/SavedEventsPage";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const SavedEvents = () => {
  return (
    <WithRole allowedRoles={["USER"]}>
      <SavedEventsPage />
    </WithRole>
  );
};

export default SavedEvents;
