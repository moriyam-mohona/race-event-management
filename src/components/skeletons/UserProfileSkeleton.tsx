"use client";

import { Card, CardContent } from "@/components/ui/card";

const UserProfileSkeleton = () => {
  return (
    <div className="min-h-screen space-y-8 animate-pulse">
      {/* Profile header skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 bg-gray-200 rounded-md" />
        <div className="h-10 w-32 bg-gray-200 rounded-xl" />
      </div>

      {/* Personal Info Skeleton */}
      <Card className="shadow-md">
        <CardContent className="p-6 space-y-4">
          <div className="h-5 w-40 bg-gray-200 rounded-md" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="space-y-2">
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="h-5 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Location Info Skeleton */}
      <Card className="shadow-md">
        <CardContent className="p-6 space-y-4">
          <div className="h-5 w-40 bg-gray-200 rounded-md" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="space-y-2">
                <div className="h-3 w-20 bg-gray-200 rounded" />
                <div className="h-5 w-32 bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfileSkeleton;
