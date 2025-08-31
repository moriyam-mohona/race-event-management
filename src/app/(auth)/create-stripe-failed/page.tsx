import CreateStripeAccountFailed from "@/components/dashboard/VendorDashboard/allEventsByVendor/CreateStripeAccountFailed";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const CreateStripeFailedPage = () => {
  return (
    <WithRole allowedRoles={["VENDOR"]}>
      <CreateStripeAccountFailed />
    </WithRole>
  );
};

export default CreateStripeFailedPage;
