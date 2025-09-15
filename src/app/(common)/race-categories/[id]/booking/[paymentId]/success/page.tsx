import PaymentSuccess from "@/components/pages/payment/PaymentSuccess";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const PaymentSuccessPage = () => {
  return (
    <WithRole allowedRoles={["USER"]}>
      <div className="min-h-screen mt-28 lg:my-40 bg-white">
        <PaymentSuccess />
      </div>
    </WithRole>
  );
};

export default PaymentSuccessPage;
