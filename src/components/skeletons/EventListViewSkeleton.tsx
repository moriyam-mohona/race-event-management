"use client";

import React from "react";

const EventListViewSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col md:flex-row gap-4 lg:gap-6 rounded-lg overflow-hidden mb-6 bg-white border border-gray-100 shadow animate-pulse p-3 sm:p-4"
        >
          {/* Image Skeleton */}
          <div className="w-full md:w-1/3 h-[200px] md:h-[300px] bg-gray-300 rounded-lg"></div>

          {/* Content Skeleton */}
          <div className="w-full md:w-2/3 flex flex-col justify-between mt-3 md:mt-0 space-y-3">
            {/* Title & Bookmark */}
            <div className="flex items-center justify-between">
              <div className="h-6 w-2/3 bg-gray-300 rounded"></div>
              <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
            </div>

            {/* Event Info */}
            <div className="space-y-2">
              <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
              <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
              <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
            </div>

            {/* Price & Description */}
            <div className="space-y-2">
              <div className="h-5 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-full bg-gray-300 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
            </div>

            {/* Details Button */}
            <div className="flex justify-end">
              <div className="h-8 w-24 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventListViewSkeleton;
