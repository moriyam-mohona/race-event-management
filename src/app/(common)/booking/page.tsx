"use client";

import BookingFlow from "@/components/pages/booking/BookingFlow";
import { store } from "@/redux/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
      <main className="min-h-screen mt-40 bg-white">
        <BookingFlow />
      </main>
    </Provider>
  );
}
