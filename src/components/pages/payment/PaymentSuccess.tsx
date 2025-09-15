/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetMyPaymentInfoQuery } from "@/redux/features/booking/bookingApi";
import { useParams } from "next/navigation";
import React from "react";
import { CheckCircle } from "lucide-react";
import { format } from "date-fns";
import PaymentSuccessSkeleton from "@/components/skeletons/PaymentSuccessSkeleton";
import Link from "next/link";

const PaymentSuccess = () => {
  const { paymentId } = useParams();
  const { data: payment, isLoading } = useGetMyPaymentInfoQuery(paymentId);

  if (isLoading) {
    return <PaymentSuccessSkeleton />;
  }

  const event = payment?.data?.events;
  const user = payment?.data?.user;

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg space-y-10 p-6">
      {/* Success Header */}
      <div className="flex flex-col items-center text-center gap-4">
        <CheckCircle className="text-green-500 w-16 h-16" />
        <h1 className="text-3xl font-semibold text-gray-900">
          Payment Successful!
        </h1>
        <p className="text-gray-600">
          Thank you, <span className="font-medium">{user?.fullName}</span>! Your
          payment for <span className="font-medium">{event?.title}</span> has
          been completed.
        </p>
      </div>

      {/* Event Details */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-3">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Event Details
        </h2>
        <p>
          <span className="font-medium">Title:</span> {event?.title}
        </p>
        <p>
          <span className="font-medium">Category:</span> {event?.category}
        </p>
        <p>
          <span className="font-medium">Region:</span> {event?.region},{" "}
          {event?.country}
        </p>
        <p>
          <span className="font-medium">Start Date:</span>{" "}
          {event?.startDate ? format(new Date(event.startDate), "PPP") : "-"}
        </p>
        <p>
          <span className="font-medium">End Date:</span>{" "}
          {event?.endDate ? format(new Date(event.endDate), "PPP") : "-"}
        </p>
        <p>
          <span className="font-medium">Distance:</span> {event?.distance} km
        </p>
        <p>
          <span className="font-medium">Time:</span>{" "}
          {event?.time ? format(new Date(event.time), "hh:mm a") : "-"}
        </p>
        <p>
          <span className="font-medium">Venue Type:</span> {event?.venueType}
        </p>
      </div>

      {/* Payment Summary */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-3">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Payment Summary
        </h2>
        <p>
          <span className="font-medium">Paid By:</span> {payment?.data?.email}
        </p>
        <p>
          <span className="font-medium">Total Persons:</span>{" "}
          {payment?.data?.totalPersonCount}
        </p>
        <p>
          <span className="font-medium">Total Amount:</span> $
          {payment?.data?.totalAmount} USD
        </p>
      </div>

      {/* Optional Gear Info */}
      {payment?.data?.addedGearInfo?.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg space-y-3">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            Added Gear
          </h2>
          {payment.data.addedGearInfo.map((gear: any, idx: number) => (
            <p key={idx}>
              <span className="font-medium">{gear.gearName}:</span>{" "}
              {gear.quantity} pcs
            </p>
          ))}
        </div>
      )}

      {/* Explore More Button */}
      <div className="flex justify-center pb-6">
        <Link
          href="/race-categories"
          className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
        >
          Explore More
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
