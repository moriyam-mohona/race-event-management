"use client";

import React from "react";

const CommunityHeaderSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      {/* Banner Skeleton */}
      <div className="w-full h-[200px] lg:h-[325px] bg-gray-300 rounded-md lg:rounded-lg"></div>

      {/* Profile & Info */}
      <div className="flex items-end gap-2 mx-2 lg:mx-4 -mt-4 sm:-mt-10 lg:-mt-12">
        {/* Profile Image Skeleton */}
        <div className="w-24 h-24 lg:w-32 lg:h-32 bg-gray-300 rounded-full"></div>

        {/* Name, Followers & Button */}
        <div className="flex justify-between items-start gap-2 w-full">
          <div className="space-y-2">
            {/* Community Name Skeleton */}
            <div className="h-6 md:h-8 lg:h-10 w-40 bg-gray-300 rounded"></div>
            {/* Followers Skeleton */}
            <div className="h-4 md:h-5 w-24 bg-gray-300 rounded"></div>
          </div>
          {/* Follow Button Skeleton */}
          <div className="h-8 md:h-10 w-24 md:w-32 bg-gray-300 rounded-xl"></div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeaderSkeleton;
