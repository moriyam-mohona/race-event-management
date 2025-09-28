/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetSingleEventQuery } from "@/redux/features/event/eventApi";
import Link from "next/link";
import Loading from "@/components/shared/Loading/Loading";

const PublishEvent = () => {
  const eventId = useSelector((state: RootState) => state.event.eventId);
  const { data: eventData, isLoading } = useGetSingleEventQuery({
    id: eventId ?? "",
  });

  if (isLoading) return <Loading />;
  return (
    <div className="space-y-10 max-w-6xl mx-auto px-4 py-8">
      {/* Event Header */}
      <div className="bg-gradient-to-r from-primary/20 to-primary/10 p-6 rounded-2xl shadow-md flex flex-col md:flex-row items-center gap-6">
        {eventData?.data?.eventImages && (
          <Image
            src={eventData.data.eventImages}
            alt={eventData.data.title || "Event Image"}
            width={200}
            height={200}
            className="rounded-xl object-cover shadow-lg"
          />
        )}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {eventData?.data?.title}
          </h2>
          <p className="text-gray-600 md:text-lg">
            {eventData?.data?.description}
          </p>
        </div>
      </div>

      {/* Date & Time */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Start Date",
            value: new Date(eventData?.data?.startDate).toLocaleDateString(),
          },
          {
            label: "End Date",
            value: new Date(eventData?.data?.endDate).toLocaleDateString(),
          },
          {
            label: "Time",
            value: new Date(eventData?.data?.time).toLocaleTimeString(),
          },
        ].map((item) => (
          <div
            key={item.label}
            className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition flex flex-col items-center"
          >
            <p className="text-gray-500 text-sm">{item.label}</p>
            <p className="font-semibold text-lg">{item.value}</p>
          </div>
        ))}
      </div>

      {/* Location */}
      <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-4">Location</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Continent", value: eventData?.data?.continent },
            { label: "Country", value: eventData?.data?.country },
            { label: "Region", value: eventData?.data?.region },
            { label: "Address", value: eventData?.data?.address },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Race & Event Details */}
      <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-4">Race & Event Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Category", value: eventData?.data?.category },
            { label: "Type", value: eventData?.data?.type },
            { label: "Venue Type", value: eventData?.data?.venueType },
            { label: "Season", value: eventData?.data?.season },
            { label: "Size", value: eventData?.data?.size },
            { label: "Price", value: `$${eventData?.data?.price}` },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Race Start & Finish */}
      <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
        <h3 className="text-xl font-semibold mb-4">Race Start & Finish</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Start Address", value: eventData?.data?.startAddress },
            { label: "End Address", value: eventData?.data?.endAddress },
            { label: "Distance", value: `${eventData?.data?.distance} km` },
          ].map((item) => (
            <div key={item.label}>
              <p className="text-sm text-gray-500">{item.label}</p>
              <p className="font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Age Limit */}
      <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition flex justify-between items-center">
        <h3 className="text-xl font-semibold">Age Limit</h3>
        <p className="font-medium text-gray-700">
          {eventData?.data?.ageLimit} years
        </p>
      </div>

      {/* Gear */}
      {eventData?.data?.Gear?.length > 0 && (
        <div className="bg-white rounded-2xl shadow p-6 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold mb-4">Needed Gear</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {eventData.data.Gear.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition"
              >
                <Image
                  src={item.gearImages[0] || "/placeholder.svg"}
                  alt={item.gearTitle}
                  width={60}
                  height={60}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h4 className="font-medium text-gray-800">
                    {item.gearTitle}
                  </h4>
                  <p className="text-sm text-gray-500">{item.categoryName}</p>
                  <p className="font-semibold text-primary">
                    ${item.price} USD
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Done Button */}
      <div className="flex justify-end mt-6">
        <Link
          href="/dashboard/vendor/all-events"
          className="px-8 py-3 rounded-xl text-white bg-primary hover:bg-primary/80 font-semibold transition"
        >
          Done
        </Link>
      </div>
    </div>
  );
};

export default PublishEvent;
