"use client";

import React from "react";

const ConnectionRequestSkeleton: React.FC = () => {
  // Generate 3-5 skeleton items for placeholder
  const skeletons = Array.from({ length: 3 });

  return (
    <div className="relative w-80">
      <div className="w-full flex justify-between items-center px-4 py-2 border rounded-lg shadow-sm bg-gray-100 animate-pulse">
        <span className="h-4 w-32 bg-gray-300 rounded"></span>
        <div className="h-4 w-4 bg-gray-300 rounded"></div>
      </div>

      <div className="absolute top-12 left-0 w-full bg-white border rounded-lg shadow-lg max-h-80 overflow-y-auto mt-2">
        <ul className="divide-y">
          {skeletons.map((_, idx) => (
            <li
              key={idx}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="flex items-center gap-3">
                {/* Profile Circle */}
                <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse"></div>
                {/* Name placeholder */}
                <div className="h-4 w-24 bg-gray-300 rounded animate-pulse"></div>
              </div>

              <div className="flex items-center gap-2">
                {/* Reject button skeleton */}
                <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
                {/* Accept button skeleton */}
                <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse"></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ConnectionRequestSkeleton;
