"use client";

import { useGetMeQuery } from "@/redux/features/auth/authApi";
import Image from "next/image";
import image from "@/assets/images/Human.png";

const CommunityList = () => {
  const { data: user } = useGetMeQuery({});
  console.log(user);
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
      <div className="border border-gray-200 rounded-lg p-5">
        <h2 className="text-2xl font-semibold">Registered Community</h2>
      </div>
    </div>
  );
};

export default CommunityList;
