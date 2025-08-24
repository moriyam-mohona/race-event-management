"use client";

import { useSelector } from "react-redux";
import Image from "next/image";
import { RootState } from "@/redux/store";
import img from "@/assets/event.png";
import { useParams } from "next/navigation";
import { useGetSingleEventQuery } from "@/redux/features/event/eventApi";
import { format } from "date-fns";

export default function OrderSummary() {
  const { ticket, addOns } = useSelector((state: RootState) => state.booking);
  const params = useParams();
  const id = params.id;
  const { data: detailEventData } = useGetSingleEventQuery(id);

  const calculateTotal = () => {
    // Ticket total = ticket price * quantity
    const ticketTotal = (ticket.price || 0) * (ticket.quantity || 1);

    // Add-ons total
    let addOnsTotal = 0;
    if (addOns.addedGearInfo && addOns.addedGearInfo.length > 0) {
      addOns.addedGearInfo.forEach((item) => {
        addOnsTotal += (item.price || 0) * (item.quantity || 1);
      });
    }

    return ticketTotal + addOnsTotal;
  };

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div>
        <Image
          src={detailEventData?.data?.eventImages || img}
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
          <div className="flex items-center">
            <p className="text-gray-700">{detailEventData?.data?.title}</p>
            {/* <ExternalLink className="ml-1 h-4 w-4 text-gray-700" /> */}
          </div>
          <p className="text-gray-800">
            {detailEventData?.data?.startDate &&
              detailEventData?.data?.endDate && (
                <>
                  {format(new Date(detailEventData.data.startDate), "d")}-
                  {format(
                    new Date(detailEventData.data.endDate),
                    "d MMM, yyyy"
                  )}
                </>
              )}
          </p>
        </div>

        {ticket.eventType && (
          <div className="mb-4 border-t border-gray-100 pt-4">
            <h3 className="font-medium">{ticket.eventType}</h3>
            <div className="mt-1 flex justify-between">
              <span className="text-sm text-orange-500">
                Participant x {ticket.quantity}
              </span>
              <span className="font-medium">
                $ {((ticket.price ?? 0) * (ticket.quantity ?? 1)).toFixed(2)}{" "}
                USD
              </span>
            </div>
          </div>
        )}

        {addOns.addedGearInfo && addOns.addedGearInfo.length > 0 && (
          <div className="mb-4 border-t border-gray-100 pt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Added Gear
            </h3>
            {addOns.addedGearInfo.map((item, index) => (
              <div key={index} className="mt-2 flex justify-between">
                <span className="text-secondary">
                  {index + 1}. {item.title}
                </span>
                <div className="flex items-center">
                  <span className="font-medium">
                    ${(item.price * (item.quantity || 1)).toFixed(2)} USD
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
          <div className="flex justify-between text-lg md:text-xl font-medium">
            <span className="font-medium">Total</span>
            <span>${calculateTotal().toFixed(2)} USD</span>
          </div>
        </div>
      </div>
    </div>
  );
}
