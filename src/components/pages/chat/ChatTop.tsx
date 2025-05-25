import React from "react";
import profile from "@/assets/profile.png";
import Image from "next/image";
const ChatTop = () => {
  return (
    <div className="bg-[#EEEEEE] p-4 lg:p-8 rounded-md shadow flex items-center gap-4">
      <Image
        src={profile}
        alt="Community Profile"
        width={1000}
        height={1000}
        className="w-12 h-12 lg:w-16 lg:h-16 object-cover rounded-full"
      />
      <div>
        <h2 className="text-lg lg:text-xl font-medium">
          Generali Malaga Marathon
        </h2>
        <p className="text-sm text-gray-500">Active Now</p>
      </div>
    </div>
  );
};

export default ChatTop;
