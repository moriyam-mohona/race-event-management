/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import FollowingCommunitiesOfCommunityPageSkeleton from "@/components/skeletons/FollowingCommunitiesOfCommunityPageSkeleton";
import { useGetAllMyCommunityQuery } from "@/redux/features/community/communityApi";

const FollowingCommunity = () => {
  // Query for followed communities (isPaidFollower=true)
  const {
    data: followedData,
    isLoading,
    isFetching,
  } = useGetAllMyCommunityQuery({
    queryObj: [
      {
        name: "isPaidFollower",
        value: "false",
      },
    ],
  });

  if (isLoading || isFetching) {
    return <FollowingCommunitiesOfCommunityPageSkeleton />;
  }

  return (
    <div className="border rounded-lg bg-white p-4">
      <h2 className="text-gray-800 font-medium mb-4 text-lg">
        Community you are following
      </h2>
      <div className="">
        {followedData?.data?.data.map((community: any) => (
          <div
            key={community?.id}
            className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-gray-700 font-medium">
                {community?.name?.charAt(0)}
              </div>
              <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-200">
                {community?.title}
              </span>
            </div>
            <span className="text-gray-500 hidden md:block text-sm">
              {community?._count?.followers} Followers
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowingCommunity;
