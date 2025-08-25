"use client";

import React from "react";

const PostsSkeleton = () => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-2xl border shadow-sm p-5 animate-pulse"
        >
          {/* Author Info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 w-32 bg-gray-300 rounded"></div>
                <div className="h-3 w-24 bg-gray-300 rounded"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 w-16 bg-gray-300 rounded"></div>
              <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>

          {/* Post Image Skeleton */}
          <div className="w-full h-[260px] md:h-[320px] bg-gray-300 rounded-xl mb-4"></div>

          {/* Post Text Skeleton */}
          <div className="space-y-2">
            <div className="h-3 w-full bg-gray-300 rounded"></div>
            <div className="h-3 w-5/6 bg-gray-300 rounded"></div>
            <div className="h-3 w-4/6 bg-gray-300 rounded"></div>
          </div>

          {/* Interaction Buttons Skeleton */}
          <div className="flex items-center gap-6 border-t pt-3 mt-4">
            <div className="h-5 w-16 bg-gray-300 rounded"></div>
            <div className="h-5 w-20 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsSkeleton;
