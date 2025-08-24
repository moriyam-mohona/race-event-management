/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Image from "next/image";
import image from "@/assets/images/Human.png";
import { useGetAllMyCommunityQuery } from "@/redux/features/community/communityApi";
import Link from "next/link";
import Loading from "@/components/shared/Loading/Loading";

const CommunityList = () => {
  const { data: user, isLoading: isUserLoading } = useGetMeQuery({});
  const {
    data: registeredData,
    isLoading: isRegisteredLoading,
    isFetching: isRegisteredFetching,
  } = useGetAllMyCommunityQuery({
    queryObj: [
      {
        name: "isPaidFollower",
        value: "true",
      },
    ],
  });

  // Query for followed communities (isPaidFollower=true)
  const {
    data: followedData,
    isLoading: isFollowedLoading,
    isFetching: isFollowedFetching,
  } = useGetAllMyCommunityQuery({
    queryObj: [
      {
        name: "isPaidFollower",
        value: "false",
      },
    ],
  });

  const registeredCommunities = registeredData?.data?.data || [];
  const followedCommunities = followedData?.data?.data || [];

  if (
    isRegisteredLoading ||
    isRegisteredFetching ||
    isFollowedLoading ||
    isFollowedFetching ||
    isUserLoading
  ) {
    return <Loading />;
  }

  return (
    <div>
      {/* Header Section  */}
      <div className="flex items-end gap-4">
        <Image
          src={user?.data?.profileImage || image}
          alt=""
          width={1000}
          height={1000}
          className="w-36 h-36 object-cover rounded-full bg-gray-100"
        />
        <div className="space-y-2">
          <p className="font-semibold text-4xl text-[#333]">
            {user?.data?.fullName}
          </p>
          <p>{user?.data?.address || "United State"}</p>
        </div>
      </div>
      <div className="my-10">
        <hr />
      </div>
      <div className="space-y-8">
        {/* Registered Communities Section */}
        <div className="border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg md:text-xl font-medium mb-5">
            Registered Communities
          </h2>
          {registeredCommunities.length === 0 ? (
            <p className="text-gray-500 py-4">
              No registered communities found
            </p>
          ) : (
            <div className="space-y-3">
              {registeredCommunities.map((community: any) => (
                <Link
                  key={community?.id}
                  href={`/community/${community?.id}`}
                  className="flex items-center justify-between p-3 rounded-md hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10">
                      <Image
                        src={community?.image || "/default-community.png"}
                        alt={community?.title || "Community"}
                        fill
                        className="rounded-full object-cover bg-gray-50"
                      />
                    </div>
                    <h2 className="text-lg font-medium">{community?.title}</h2>
                  </div>
                  <p className="text-gray-600">
                    {community?._count?.followers || 0} Followers
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Followed Communities Section */}
        <div className="border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg md:text-xl font-medium mb-5">
            Communities You&apos;re Following
          </h2>
          {followedCommunities.length === 0 ? (
            <p className="text-gray-500 py-4">
              You&apos;re not following any communities yet
            </p>
          ) : (
            <div className="space-y-3">
              {followedCommunities.map((community: any) => (
                <Link
                  key={community?.id}
                  href={`/community/${community?.id}`}
                  className="flex items-center justify-between p-3 rounded-md hover:bg-green-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-10 h-10">
                      <Image
                        src={community?.image || "/default-community.png"}
                        alt={community?.title || "Community"}
                        fill
                        className="rounded-full object-cover bg-gray-50"
                      />
                    </div>
                    <h2 className="text-lg font-medium">{community?.title}</h2>
                  </div>
                  <p className="text-gray-600">
                    {community?._count?.followers || 0} Followers
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityList;
