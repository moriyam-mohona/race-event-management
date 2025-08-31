/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Image from "next/image";
import image from "@/assets/images/Human.png";
import { useGetAllMyCommunityQuery } from "@/redux/features/community/communityApi";
import Link from "next/link";
import Loading from "@/components/shared/Loading/Loading";
import { useCallback, useState } from "react";
import { Pagination } from "antd";

const CommunityList = () => {
  const [registeredPagination, setRegisteredPagination] = useState({
    current: 1,
    pageSize: 3,
  });
  const [followedPagination, setFollowedPagination] = useState({
    current: 1,
    pageSize: 3,
  });
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
      {
        name: "page",
        value: registeredPagination.current,
      },
      {
        name: "limit",
        value: registeredPagination.pageSize,
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
      {
        name: "page",
        value: followedPagination.current,
      },
      {
        name: "limit",
        value: followedPagination.pageSize,
      },
    ],
  });

  const registeredCommunities = registeredData?.data?.data || [];
  const followedCommunities = followedData?.data?.data || [];

  const totalRegisteredCount = registeredData?.data?.meta?.total || 0;
  const totalFollowedCount = followedData?.data?.meta?.total || 0;

  // Handle pagination
  const handleRegisteredPaginationChange = useCallback(
    (page: number, pageSize: number) => {
      setRegisteredPagination({ current: page, pageSize });
    },
    []
  );
  const handleFollowedPaginationChange = useCallback(
    (page: number, pageSize: number) => {
      setFollowedPagination({ current: page, pageSize });
    },
    []
  );

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
                        src={
                          community?.event?.eventImages ||
                          "/default-community.png"
                        }
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

              <div className="p-4 w-full flex flex-wrap justify-center">
                <Pagination
                  current={registeredPagination.current}
                  pageSize={registeredPagination.pageSize}
                  total={totalRegisteredCount}
                  disabled={isRegisteredLoading || isRegisteredFetching}
                  onChange={handleRegisteredPaginationChange}
                />
              </div>
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
                        src={
                          community?.event?.eventImages ||
                          "/default-community.png"
                        }
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
              <div className="p-4 w-full flex flex-wrap justify-center">
                <Pagination
                  current={followedPagination.current}
                  pageSize={followedPagination.pageSize}
                  total={totalFollowedCount}
                  disabled={isFollowedLoading || isFollowedFetching}
                  onChange={handleFollowedPaginationChange}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityList;
