import SavedEventsPage from "@/components/dashboard/UserDashboard/events/SavedEventsPage";
import React from "react";

const SavedEvents = () => {
  return (
    <div>
      <h2 className="text-3xl font-semibold mt-4 mb-8">Saved Race List</h2>
      <SavedEventsPage />
    </div>
  );
};

export default SavedEvents;
