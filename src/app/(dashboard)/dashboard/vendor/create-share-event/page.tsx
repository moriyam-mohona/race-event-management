import CreateShareEvent from "@/components/dashboard/VendorDashboard/createShareEvent/CreateShareEvent";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const CreateShareEventPage = () => {
  return (
    <WithRole allowedRoles={["VENDOR"]}>
      <CreateShareEvent />
    </WithRole>
  );
};

export default CreateShareEventPage;
