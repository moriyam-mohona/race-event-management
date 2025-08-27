/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { Check, X } from "lucide-react";
import {
  useAcceptOrRejectConnectionMutation,
  useGetAllConnectionRequestQuery,
} from "@/redux/features/chat/chatApi";
import placeholder from "@/assets/images/Human.png";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import ConnectionRequestSkeleton from "@/components/skeletons/ConnectionRequestSkeleton";

interface Member {
  id: string;
  fullName: string;
  profileImage: string | null;
}

const ConnectionRequest: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const { data: connectionData, isLoading: connectionLoading } =
    useGetAllConnectionRequestQuery({});
  const [acceptOrRejectConnection] = useAcceptOrRejectConnectionMutation();

  const members: Member[] =
    connectionData?.data?.data.map((item: any) => ({
      id: item.id,
      fullName: item.sender.fullName,
      profileImage: item.sender.profileImage,
    })) || [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleConnectionAction = (
    connectionId: string,
    status: "accept" | "reject"
  ) => {
    const payload = { connectionId, status };
    handleAsyncWithToast(() => acceptOrRejectConnection(payload));
  };

  return (
    <div className="relative w-80">
      {/* Trigger Button */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="w-full flex justify-between items-center px-4 py-2 border rounded-lg shadow-sm hover:bg-gray-50 transition"
      >
        <span>Connection Requests ({members.length})</span>
        <X
          className={`w-4 h-4 transition-transform ${
            isDropdownOpen ? "rotate-45" : ""
          }`}
        />
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-12 left-0 w-full bg-white border rounded-lg shadow-lg max-h-80 overflow-y-auto mt-2"
        >
          {/* Show skeleton only if loading */}
          {connectionLoading ? (
            <ConnectionRequestSkeleton />
          ) : members.length === 0 ? (
            <div className="text-center p-6 text-gray-500">
              <p>No connection requests</p>
            </div>
          ) : (
            <ul className="divide-y">
              {members.map((member) => (
                <li
                  key={member.id}
                  className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      <Image
                        src={member.profileImage || placeholder}
                        alt={member.fullName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <span className="font-medium text-gray-800">
                      {member.fullName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {/* Reject Button */}
                    <button
                      onClick={() =>
                        handleConnectionAction(member.id, "reject")
                      }
                      className="p-2 text-red-500 bg-gray-100 hover:text-white hover:bg-red-500 rounded-full transition cursor-pointer"
                      title="Reject"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Accept Button */}
                    <button
                      onClick={() =>
                        handleConnectionAction(member.id, "accept")
                      }
                      className="p-2 text-green-600 bg-gray-100 hover:text-white hover:bg-green-600 rounded-full transition cursor-pointer"
                      title="Accept"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ConnectionRequest;
