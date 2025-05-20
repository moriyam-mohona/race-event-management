"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { RootState } from "@/redux/store";
import { nextStep, setTicket } from "@/redux/features/booking/bookingSlice";

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
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="mb-6">
        <h2 className="text-xl font-medium">Cycling</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            <span>5 km</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-orange-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span>8-10 Aug, 2025</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clipRule="evenodd"
              />
            </svg>
            <span>08:30</span>
          </div>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Age Limit:</span> From 18 years old
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="text-2xl font-bold">$100.00 USD</div>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() => handleQuantityChange(quantity - 1)}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="mx-3 w-8 text-center">{quantity}</span>
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

      <div className="mt-8">
        <Button
          className="w-full bg-blue-500 hover:bg-blue-600"
          onClick={handleContinue}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
