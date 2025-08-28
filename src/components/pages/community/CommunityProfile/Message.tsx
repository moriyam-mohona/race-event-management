/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import Image from "next/image";
// import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  useGetAllUserListForChatQuery,
  useSendConnectionRequestMutation,
} from "@/redux/features/chat/chatApi";
import MessageListForCommunitySkeleton from "@/components/skeletons/MessageListForCommunitySkeleton";
import { TbUserPlus } from "react-icons/tb";
import { socket } from "@/provider/SoketProvider";

const Message = () => {
  const [activeTab, setActiveTab] = useState<"local" | "global">("local");
  const [page, setPage] = useState(1);
  const limit = 5; // page size

  const { id } = useParams();
  const router = useRouter();

  // Query API with type + pagination
  const { data, isLoading, isFetching } = useGetAllUserListForChatQuery({
    id,
    data: {
      queryObj: [
        { name: "type", value: activeTab }, // local or global
        { name: "page", value: page.toString() },
        { name: "limit", value: limit.toString() },
      ],
    },
  });
  const [sendConnectionRequest] = useSendConnectionRequestMutation();

  const handleSendConnectionRequest = async (userId: string) => {
    try {
      await sendConnectionRequest(userId).unwrap();
    } catch (error) {
      console.error("Error sending connection request:", error);
    }
  };

  const handleCreateNewChat = (userId: string) => {
    // Logic to create a new chat with the user
    console.log("Create chat with user ID:", userId);
    // You can redirect to the chat page or open a chat modal here

    if (userId && socket) {
      socket.send(
        JSON.stringify({
          type: "joinPrivateChat",
          user2Id: userId,
        })
      );
      router.push("/chat");

      // setUser2Id(user2Id);

      // socket.onmessage = (event) => {
      //   const data = JSON.parse(event.data);
      //   const chatRoomId = data?.chatroomId;
      //   if (chatRoomId) {
      //     setChatRoomId(chatRoomId);
      //   }
      // };
    }
  };

  const chatUsers = data?.data?.data || [];
  const total = data?.data?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const tabs = [
    { id: "local", label: "Local Chat" },
    { id: "global", label: "Global Chat" },
  ];

  if (isLoading || isFetching) {
    return <MessageListForCommunitySkeleton />;
  }

  return (
    <div>
      <p className="mb-3 font-medium text-lg">Message</p>
      <div className="border rounded-lg overflow-hidden bg-white">
        {/* Tabs */}
        <div className="flex gap-2 border-b px-3 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as "local" | "global");
                setPage(1); // reset to first page when tab changes
              }}
              className={`flex-1 py-2 md:px-4 text-sm font-medium transition-colors duration-200 rounded-full
                ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "text-gray-600 hover:bg-gray-50 border border-primary"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Members Section */}
        <div className="p-4">
          <h2 className="text-gray-700 font-medium mb-3">Members</h2>

          <div className="space-y-3">
            {chatUsers.map((member: any) => (
              <div
                key={member?.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    {member?.profileImage ? (
                      <Image
                        src={member?.profileImage}
                        alt={member?.fullName}
                        width={1000}
                        height={1000}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-semibold">
                        {member?.fullName?.charAt(0)}
                      </div>
                    )}

                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                          ${
                            member?.connectionStatus === "CONNECTED"
                              ? "bg-green-500"
                              : member?.connectionStatus === "PENDING_SENT"
                              ? "bg-yellow-500"
                              : "bg-gray-400"
                          }`}
                    />
                  </div>

                  <div>
                    <p className="text-gray-800 font-medium">
                      {member?.fullName}
                    </p>
                    <span className="text-xs text-gray-500">
                      {member?.country}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {(member?.connectionStatus === "PENDING" ||
                    member?.connectionStatus === "CONNECTED") && (
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        member?.connectionStatus === "CONNECTED"
                          ? "bg-green-50 text-green-600"
                          : member?.connectionStatus === "PENDING"
                          ? "bg-yellow-50 text-yellow-600"
                          : "bg-gray-50 text-gray-600"
                      }`}
                    >
                      {member?.connectionStatus}
                    </span>
                  )}
                  {member?.connectionStatus === "NONE" && (
                    <button
                      onClick={() => handleSendConnectionRequest(member?.id)}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg 
               border border-gray-300 bg-white text-gray-800 
               hover:bg-gray-100 transition-colors duration-200"
                    >
                      <TbUserPlus className="text-lg" />
                      Connect
                    </button>
                  )}

                  {member?.connectionStatus === "PENDING_SENT" && (
                    <button
                      disabled
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full 
               border border-yellow-400 bg-yellow-100 text-yellow-800 
               cursor-not-allowed text-xs"
                    >
                      Request Sent
                    </button>
                  )}

                  {member?.connectionStatus === "CONNECTED" && (
                    <>
                      <button
                        onClick={() => handleCreateNewChat(member?.id)}
                        // href="/chat"
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
                      >
                        <MessageCircle size={18} className="text-gray-500" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1 text-sm border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1 text-sm border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
