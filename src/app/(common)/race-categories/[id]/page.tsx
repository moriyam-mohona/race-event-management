import EventDetailsPage from "@/components/pages/event-details/EventDetailsPage";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const RaceDetails = () => {
  return (
    <WithRole allowedRoles={["VENDOR", "SUPER_ADMIN", "USER"]}>
      <div className="my-48 mb-40">
        <EventDetailsPage />
      </div>
    </WithRole>
  );
};

export default RaceDetails;
