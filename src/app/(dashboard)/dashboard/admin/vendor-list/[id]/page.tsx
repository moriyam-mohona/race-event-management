import EventsOfVendor from "@/components/dashboard/AdminDashboard/EventsOfVendor";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const EventOfVendor = () => {
  return (
    <WithRole allowedRoles={["SUPER_ADMIN"]}>
      <EventsOfVendor />
    </WithRole>
  );
};

export default EventOfVendor;
