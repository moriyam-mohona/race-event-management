"use client";

import BookingFlow from "@/components/pages/booking/BookingFlow";
import { store } from "@/redux/store";
import WithRole from "@/role-wrapper/WithRole";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <WithRole allowedRoles={["USER"]}>
      <Provider store={store}>
        <main className="min-h-screen mt-28 lg:mt-40 bg-white">
          <BookingFlow />
        </main>
      </Provider>
    </WithRole>
  );
}
