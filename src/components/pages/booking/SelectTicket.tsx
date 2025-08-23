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
import { useGetSingleEventQuery } from "@/redux/features/event/eventApi";
import { useParams } from "next/navigation";
import { format } from "date-fns";
import Loading from "@/components/shared/Loading/Loading";

export default function SelectTicket() {
  const params = useParams();
  const id = params.id;
  const {
    data: detailEventData,
    isLoading,
    isFetching,
  } = useGetSingleEventQuery(id);

  function formatEventDate(startDate: string, endDate: string) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (
      start.getMonth() === end.getMonth() &&
      start.getFullYear() === end.getFullYear()
    ) {
      // Same month & year → "8-10 Aug, 2025"
      return `${format(start, "d")}-${format(end, "d MMM, yyyy")}`;
    }

    // Different month/year → "28 Aug, 2025 - 2 Sep, 2025"
    return `${format(start, "d MMM, yyyy")} - ${format(end, "d MMM, yyyy")}`;
  }
  function formatEventTime(timeString: string) {
    const date = new Date(timeString);
    return format(date, "HH:mm"); // 08:30, 18:45 etc.
  }

  const dispatch = useDispatch();
  const { ticket } = useSelector((state: RootState) => state.booking);
  const [quantity, setQuantity] = useState(ticket.quantity || 1);

  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= 10) {
      setQuantity(value);
    }
  };

  const handleContinue = () => {
    if (!detailEventData?.data) return;

    const { category, distance, startDate, endDate, time, price } =
      detailEventData.data;

    dispatch(
      setTicket({
        eventType: category,
        distance: `${distance} km`,
        date:
          startDate && endDate ? formatEventDate(startDate, endDate) : "TBA",
        time: time ? formatEventTime(time) : "TBA",
        price: price || 0,
        quantity: quantity,
      })
    );

    dispatch(nextStep());
  };

  if (isLoading || isFetching) return <Loading />;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 lg:p-6">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-700">
          {detailEventData?.data?.category}
        </h2>
        <div className="mt-4 flex flex-col gap-4">
          {/* km  */}
          <div className="flex items-center gap-2">
            <GiCycling className="text-secondary text-2xl" />
            <span className="text-gray-600 font-medium text-sm lg:text-base">
              {detailEventData?.data?.distance} km
            </span>
          </div>
          {/* date  */}
          <div className="flex items-center gap-2">
            <SlCalender className="text-secondary text-lg" />
            <span className="text-gray-600 font-medium text-sm lg:text-base">
              {detailEventData?.data?.startDate &&
              detailEventData?.data?.endDate
                ? formatEventDate(
                    detailEventData.data.startDate,
                    detailEventData.data.endDate
                  )
                : "TBA"}
            </span>
          </div>

          {/* time  */}
          <div className="flex items-center gap-2">
            <MdOutlineWatchLater className="text-secondary text-xl" />

            <span className="text-gray-600 font-medium text-sm lg:text-base">
              {detailEventData?.data?.time
                ? formatEventTime(detailEventData.data.time)
                : "TBA"}
            </span>
          </div>
        </div>
        {/* Age Limit: */}
        <div className="my-5 md:my-10">
          <p className="text-sm lg:text-lg text-gray-600">
            <span className="font-medium text-sm lg:text-base">Age Limit:</span>{" "}
            From {detailEventData?.data?.ageLimit} years old
          </p>
        </div>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="text-xl lg:text-2xl text-gray-600 font-medium">
          ${detailEventData?.data?.price} USD
        </div>
        <div className="flex items-center">
          <span className="mr-2 font-medium hidden md:block"> Person:</span>
          <div className="bg-[#9CDCA4] p-1 rounded-full">
            <Button
              variant="outline"
              size="icon"
              className="w-6 md:h-8 h-6 md:w-8 rounded-full"
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
              className="w-6 md:h-8 h-6 md:w-8 rounded-full"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          className="cursor-pointer w-full text-white font-semibold py-2 rounded-lg bg-primary hover:bg-primary/80"
          onClick={handleContinue}
        >
          Next
        </button>
      </div>
    </div>
  );
}
