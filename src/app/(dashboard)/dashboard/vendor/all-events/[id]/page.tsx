import BookingListPage from "@/components/dashboard/VendorDashboard/bookinglist/BookingListPage";
import WithRole from "@/role-wrapper/WithRole";
import React from "react";

const BookingList = () => {
  return (
    <WithRole allowedRoles={["VENDOR"]}>
      <BookingListPage />
    </WithRole>
  );
};

export default BookingList;
