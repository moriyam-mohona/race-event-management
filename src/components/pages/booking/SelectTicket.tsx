"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { RootState } from "@/redux/store";
import { nextStep, setTicket } from "@/redux/features/booking/bookingSlice";
import { GiCycling } from "react-icons/gi";
import { SlCalender } from "react-icons/sl";
import { MdOutlineWatchLater } from "react-icons/md";

export default function SelectTicket() {
  const dispatch = useDispatch();
  const { ticket } = useSelector((state: RootState) => state.booking);
  const [quantity, setQuantity] = useState(ticket.quantity || 1);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleContinue = () => {
    dispatch(
      setTicket({
        eventType: "Cycling",
        distance: "5 km",
        date: "8-10 Aug, 2025",
        time: "08:30",
        price: 100.0,
        quantity: quantity,
      })
    );
    dispatch(nextStep());

    // Log data to console
    console.log("Ticket Selection Data:", {
      eventType: "Cycling",
      distance: "5 km",
      date: "8-10 Aug, 2025",
      time: "08:30",
      price: 100.0,
      quantity: quantity,
    });
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-3xl font-medium text-gray-700">Cycling</h2>
        <div className="mt-4 flex flex-col gap-4">
          {/* km  */}
          <div className="flex items-center gap-2">
            <GiCycling className="text-secondary text-2xl" />
            <span className="text-gray-600 font-medium">5 km</span>
          </div>
          {/* date  */}
          <div className="flex items-center gap-2">
            <SlCalender className="text-secondary text-lg" />

            <span className="text-gray-600 font-medium">8-10 Aug, 2025</span>
          </div>
          {/* time  */}
          <div className="flex items-center gap-2">
            <MdOutlineWatchLater className="text-secondary text-xl" />

            <span className="text-gray-600 font-medium">08:30</span>
          </div>
        </div>
        {/* Age Limit: */}
        <div className="my-10">
          <p className="text-lg text-gray-600">
            <span className="font-medium">Age Limit:</span> From 18 years old
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="text-2xl text-gray-600 font-medium">$100.00 USD</div>
        <div className="flex items-center">
          <span className="mr-2 font-medium"> Person:</span>
          <div className="bg-[#9CDCA4] p-1 rounded-full">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => handleQuantityChange(quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="mx-3 w-8 text-center text-lg font-medium">
              {quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          className="w-full text-white font-semibold py-2 rounded-lg bg-primary hover:bg-primary/80"
          onClick={handleContinue}
        >
          Next
        </button>
      </div>
    </div>
  );
}
