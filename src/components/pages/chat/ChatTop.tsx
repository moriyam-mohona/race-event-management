"use client";

import profile from "@/assets/images/Human.png";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CgMenuLeft } from "react-icons/cg";
import ChatMessages from "./ChatMessages";
import { useGetMeQuery } from "@/redux/features/auth/authApi";

const ChatTop = () => {
  const { data: user } = useGetMeQuery({});
  const profileSrc = user?.data?.profileImage || profile;

  return (
    <div className="bg-white p-4 lg:p-6 rounded-xl shadow-md flex items-center gap-4 lg:gap-6 border border-gray-200">
      {/* Mobile Menu */}
      <div className="flex lg:hidden">
        <Sheet>
          <SheetTrigger className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <CgMenuLeft className="text-2xl text-gray-600" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetDescription>
                <div className="flex flex-col w-full lg:hidden">
                  <ChatMessages />
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      {/* Profile Image */}
      <div className="relative w-12 h-12 lg:w-16 lg:h-16 rounded-full overflow-hidden hover:ring-2 hover:ring-gray-300 transition-all">
        <Image
          src={profileSrc}
          alt="Community Profile"
          fill
          className="object-cover"
        />
      </div>

      {/* User Info */}
      <div className="flex flex-col">
        <h2 className="text-lg lg:text-xl font-semibold text-gray-800">
          {user?.data?.fullName || "Unknown User"}
        </h2>
        <p className="text-sm text-gray-500">
          {user?.data?.status || "Hey there! I am using Chat."}
        </p>
      </div>
    </div>
  );
};

export default ChatTop;
