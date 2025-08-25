import React from "react";

const MessageListForCommunitySkeleton = () => {
  return (
    <div>
      <p className="mb-3 font-medium text-lg">Message</p>
      <div className="border rounded-lg overflow-hidden bg-white">
        {/* Tabs Skeleton */}
        <div className="flex gap-2 border-b px-3 py-4">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex-1 h-9 rounded-full bg-gray-200 animate-pulse"
            />
          ))}
        </div>

        {/* Members Section */}
        <div className="p-4">
          <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-3" />

          <div className="space-y-3">
            {[...Array(5)].map((_, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between animate-pulse"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div>
                    <div className="h-4 w-28 bg-gray-200 rounded mb-1" />
                    <div className="h-3 w-16 bg-gray-200 rounded" />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="h-6 w-20 bg-gray-200 rounded-full" />
                  <div className="h-8 w-8 bg-gray-200 rounded-full" />
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Skeleton */}
          <div className="flex justify-center gap-2 mt-4">
            <div className="h-8 w-14 bg-gray-200 rounded" />
            <div className="h-6 w-24 bg-gray-200 rounded" />
            <div className="h-8 w-14 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageListForCommunitySkeleton;
