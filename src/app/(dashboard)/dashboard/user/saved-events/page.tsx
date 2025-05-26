import SavedEventsPage from "@/components/dashboard/UserDashboard/events/SavedEventsPage";
import React from "react";

const SavedEvents = () => {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-medium mt-4 mb-8">
        Saved Race List
      </h2>
      <SavedEventsPage />
    </div>
  );
};

export default SavedEvents;
