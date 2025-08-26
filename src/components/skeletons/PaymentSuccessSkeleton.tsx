"use client";

import React from "react";

const PaymentSuccessSkeleton = () => {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg space-y-10 p-6 animate-pulse">
      {/* Success Header */}
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
        <div className="h-8 w-64 bg-gray-300 rounded-md"></div>
        <div className="h-4 w-80 bg-gray-200 rounded-md"></div>
      </div>

      {/* Event Details */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-3">
        <div className="h-6 w-48 bg-gray-300 rounded-md"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-3">
        <div className="h-6 w-48 bg-gray-300 rounded-md"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
        </div>
      </div>

      {/* Optional Gear Info */}
      <div className="bg-gray-50 p-6 rounded-lg space-y-3">
        <div className="h-6 w-48 bg-gray-300 rounded-md"></div>
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
          <div className="h-4 w-full bg-gray-200 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessSkeleton;
