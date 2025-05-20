"use client";

import { useSelector } from "react-redux";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { RootState } from "@/redux/store";
import img from "@/assets/event.png";
export default function OrderSummary() {
  const { ticket, addOns } = useSelector((state: RootState) => state.booking);

  const calculateTotal = () => {
    let total = ticket.price || 0;

    if (addOns.selectedItems) {
      addOns.selectedItems.forEach((item) => {
        total += item.price;
      });
    }

    return total;
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div>
        <Image
          src={img}
          alt="Marathon Runner"
          width={1000}
          height={1000}
          className="h-60 w-full rounded-md object-cover"
        />
      </div>

      <div className="p-5">
        <div className="mb-4 space-y-2">
          <h3 className="text-lg font-medium text-gray-800 mb-4">
            Your Order For:
          </h3>
          <div className="flex items-center underline">
            <p className="text-gray-700">Generali Malaga Marathon</p>
            <ExternalLink className="ml-1 h-4 w-4 text-gray-700" />
          </div>
          <p className="text-gray-800">8-10 Aug, 2025</p>
        </div>

        {ticket.eventType && (
          <>
            <div className="mb-4 mt-6">
              <h3 className="font-medium">Needed Gear For this Race</h3>
              <div className="mt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked
                    readOnly
                    className="text-blue-500"
                  />
                  <span className="text-sm">Running Shoes</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={false}
                    readOnly
                    className="text-blue-500"
                  />
                  <span className="text-sm">Sports Watch</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={false}
                    readOnly
                    className="text-blue-500"
                  />
                  <span className="text-sm">Running Shorts</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={false}
                    readOnly
                    className="text-blue-500"
                  />
                  <span className="text-sm">Water Bottle</span>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={false}
                    readOnly
                    className="text-blue-500"
                  />
                  <span className="text-sm">Hydration Pack</span>
                </div>
              </div>
            </div>

            <div className="mb-4 border-t border-gray-100 pt-4">
              <h3 className="font-medium">{ticket.eventType}</h3>
              <div className="mt-1 flex justify-between">
                <span className="text-sm text-orange-500">Participant 01</span>
                <span className="font-medium">
                  ${ticket.price?.toFixed(2)} USD
                </span>
              </div>
            </div>
          </>
        )}

        {addOns.selectedItems && addOns.selectedItems.length > 0 && (
          <div className="mb-4 border-t border-gray-100 pt-4">
            <h3 className="font-medium">Added Gear</h3>
            {addOns.selectedItems.map((item, index) => (
              <div key={index} className="mt-2 flex justify-between">
                <span className="text-sm">
                  {index + 1}. {item.name}
                </span>
                <div className="flex items-center">
                  <span className="font-medium">
                    ${item.price.toFixed(2)} USD
                  </span>
                  {item.quantity > 1 && (
                    <span className="ml-1 rounded-full bg-gray-100 px-2 text-xs text-gray-600">
                      {item.quantity}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-xl font-medium">
            <span className="font-medium">Total</span>
            <span className="font-medium">
              ${calculateTotal().toFixed(2)} USD
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
