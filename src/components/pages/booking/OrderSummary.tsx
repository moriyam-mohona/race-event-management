"use client";

import { useSelector } from "react-redux";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { RootState } from "@/redux/store";

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
    <div className="rounded-lg border border-gray-200 bg-white p-4">
      <div className="mb-4">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RdRpRRinEgaR9qvGMumCGgOjX6B0hZ.png"
          alt="Marathon Runner"
          width={400}
          height={200}
          className="h-32 w-full rounded-md object-cover"
        />
      </div>

      <div className="mb-4">
        <h3 className="text-sm font-medium text-gray-600">Your Order For:</h3>
        <div className="flex items-center">
          <p className="font-medium">Generali Malaga Marathon</p>
          <ExternalLink className="ml-1 h-4 w-4 text-gray-400" />
        </div>
        <p className="text-sm text-gray-600">8-10 Aug, 2025</p>
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
        <div className="flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-medium">
            ${calculateTotal().toFixed(2)} USD
          </span>
        </div>
      </div>
    </div>
  );
}
