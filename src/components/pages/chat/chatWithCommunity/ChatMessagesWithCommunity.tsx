/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { socket } from "@/provider/SoketProvider";
import {
  useGetAllCommunityListQuery,
  useGetAllConversationListQuery,
} from "@/redux/features/chat/chatApi";
import Image from "next/image";
import { useState } from "react";

interface ChatMessagesProps {
  setUser2Id: (user2Id: string) => void;
  setChatRoomId: (chatRoomId: string) => void;
}

const ChatMessagesWithCommunity = ({
  setUser2Id,
  setChatRoomId,
}: ChatMessagesProps) => {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState("inbox");

  const { data: messageList } = useGetAllConversationListQuery({});
  const { data: communityList } = useGetAllCommunityListQuery({});

  const inboxMembers =
    messageList?.data?.conversationList?.map((privateMessage: any) => ({
      id: privateMessage.conversationId,
      name: privateMessage.participants.username || "Unknown User",
      userId: privateMessage.participants?.userId,
      location: "", // You can set location if you have it
      avatar: privateMessage.participants.image || null,
      type: "user",
      status: privateMessage.unseen > 0 ? "Unseen" : null,
    })) || [];

  const communityMembers =
    communityList?.data?.data?.map((com: any) => ({
      id: com.id,
      name: com.title,
      location: "Community",
      avatar: null,
      type: "community",
      status: null,
    })) || [];

  const currentMembers =
    activeTab === "inbox" ? inboxMembers : communityMembers;
  const displayedMembers = showAll
    ? currentMembers
    : currentMembers.slice(0, 4);

  const renderAvatar = (member: any) => {
    if (member.avatar) {
      return (
        <Image
          src={member.avatar}
          alt={member.name}
          width={40}
          height={40}
          className="w-10 h-10 rounded-full object-cover"
        />
      );
    } else {
      const letter = member.name.charAt(0).toUpperCase();
      return (
        <div className="w-10 h-10 rounded-full bg-green-800/10 flex items-center justify-center">
          <span className="text-green-800 font-medium">{letter}</span>
        </div>
      );
    }
  };

  const handleSendMessage = (user2Id: string) => {
    console.log("Send message to chat ID:", user2Id);

    if (user2Id && socket) {
      socket.send(
        JSON.stringify({
          type: "joinPrivateChat",
          user2Id: user2Id,
        })
      );

      setUser2Id(user2Id);

      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const chatRoomId = data?.chatroomId;
        if (chatRoomId) {
          setChatRoomId(chatRoomId);
        }
      };
    }
  };

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-800 mb-4">Message</h2>
      <div className="border border-gray-200 rounded-xl p-5">
        <div className="flex space-x-3 mb-6">
          <button
            onClick={() => {
              setActiveTab("inbox");
              setShowAll(false);
            }}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === "inbox"
                ? "bg-primary text-white"
                : "border border-primary text-primary hover:bg-blue-50"
            }`}
          >
            Inbox
          </button>
          <button
            onClick={() => {
              setActiveTab("communities");
              setShowAll(false);
            }}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              activeTab === "communities"
                ? "bg-primary text-white"
                : "border border-primary text-primary hover:bg-blue-50"
            }`}
          >
            Communities
          </button>
        </div>

        {/* Members Section */}
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Members</h3>

        <div className="space-y-4">
          {displayedMembers.map((member: any) => (
            <div
              key={member?.userId}
              className="flex items-center space-x-3 hover:bg-green-500/10 rounded-lg p-1 transition-colors cursor-pointer"
              onClick={() => handleSendMessage(member?.userId || member?.id)}
            >
              {renderAvatar(member)}
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{member?.name}</h4>
                <p className="text-sm text-gray-600">{member?.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* See more / Show less button */}
        {currentMembers.length > 4 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="mt-4 text-gray-600 font-medium underline hover:text-gray-800 transition-colors"
          >
            {showAll ? "Show less" : "See more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatMessagesWithCommunity;
