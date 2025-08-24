import React from "react";
import banner from "@/assets/community-banner.png";
import profile from "@/assets/event.png";
import Image from "next/image";
const CommunityHeader = () => {
  return (
    <div>
      <Image
        src={banner}
        alt="Community Banner"
        width={1000}
        height={1000}
        className="w-full h-[200px] lg:h-[325px] object-cover rounded-md lg:rounded-xl"
      />

      <div className="flex items-end gap-2 mx-2 lg:mx-4 -mt-4 sm:-mt-10 lg:-mt-12">
        <Image
          src={profile}
          alt="Community Profile"
          width={1000}
          height={1000}
          className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-full"
        />
        <div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold">
            Generali Malaga Marathon
          </h2>
          <p className="text-sm md:text-base text-gray-500">1000 Followers</p>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
