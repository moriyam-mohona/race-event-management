"use client";

import React from "react";
import banner from "@/assets/community-banner.png";
import profile from "@/assets/event.png";
import Image from "next/image";
import {
  useFollowOrUnfollowACommunityMutation,
  useGetSingleCommunityQuery,
} from "@/redux/features/community/communityApi";
import { useParams } from "next/navigation";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
const CommunityHeader = () => {
  const id = useParams().id;
  const { data: communityData } = useGetSingleCommunityQuery(id);
  const [followOrUnfollow] = useFollowOrUnfollowACommunityMutation();

  const handleToggleFollow = async () => {
    await handleAsyncWithToast(() => followOrUnfollow(id));
  };
  return (
    <div>
      <Image
        src={communityData?.data?.event?.eventImages || banner}
        alt="Community Banner"
        width={1000}
        height={1000}
        className="w-full h-[200px] lg:h-[325px] object-cover rounded-md lg:rounded-lg"
      />

      <div className="flex items-end gap-2 mx-2 lg:mx-4 -mt-4 sm:-mt-10 lg:-mt-12">
        <Image
          src={communityData?.data?.event?.eventImages || profile}
          alt="Community Profile"
          width={1000}
          height={1000}
          className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-full"
        />
        <div className="flex justify-between items-start gap-2 w-full">
          {/* Name & Follower  */}
          <div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
              {communityData?.data?.title}
            </h2>
            <p className="text-sm md:text-base text-gray-500">
              {communityData?.data?._count?.followers || 0}{" "}
              {communityData?.data?._count?.followers === 1
                ? "Follower"
                : "Followers"}
            </p>
          </div>
          {/* Follow Button */}
          <div>
            {" "}
            <button
              onClick={() => handleToggleFollow()}
              className="bg-primary hover:bg-primary/80 text-white px-2 md:px-8 py-2   rounded-lg transition-colors duration-200 text-base cursor-pointer"
            >
              {communityData?.data?.isFollowing == true
                ? "Following"
                : "Follow"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
