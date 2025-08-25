import React from "react";

const FollowingCommunitiesOfCommunityPageSkeleton = () => {
  return (
    <div className="border rounded-lg bg-white p-4">
      <h2 className="text-gray-800 font-medium mb-4 text-lg">
        Community you are following
      </h2>

      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 rounded-lg animate-pulse"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="h-4 w-32 bg-gray-200 rounded" />
            </div>
            <div className="hidden md:block h-3 w-20 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowingCommunitiesOfCommunityPageSkeleton;
