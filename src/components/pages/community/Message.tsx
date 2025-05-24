"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { members as initialMembers } from "@/lib/Members";
import { Member } from "@/types/Post";
import Image from "next/image";

const Message = () => {
  const [activeTab, setActiveTab] = useState("my-chat");
  const [showAllMembers, setShowAllMembers] = useState(false);
  const [members, setMembers] = useState<Member[]>(initialMembers);

  const tabs = [
    { id: "my-chat", label: "My Chat", type: "my" },
    { id: "local-chat", label: "Local Chat", type: "local" },
    { id: "global-chat", label: "Global Chat", type: "global" },
  ];

  const handleConnect = (memberId: string) => {
    setMembers(
      members.map((member) =>
        member.id === memberId
          ? {
              ...member,
              status:
                member.status === "disconnected"
                  ? "pending"
                  : member.status === "pending"
                  ? "connected"
                  : "disconnected",
            }
          : member
      )
    );
  };

  const filteredMembers = members.filter((member) => {
    const currentTabType = tabs.find((tab) => tab.id === activeTab)?.type;
    return member.chatType === currentTabType;
  });

  const displayedMembers = showAllMembers
    ? filteredMembers
    : filteredMembers.slice(0, 5);

  return (
    <div>
      <p className="mb-3 font-medium text-lg">Message</p>
      <div className="border rounded-lg overflow-hidden bg-white">
        {/* Tabs */}
        <div className="flex gap-2 border-b px-3 py-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 rounded-full
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
            {displayedMembers.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      width={1000}
                      height={1000}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white
                      ${
                        member.status === "connected"
                          ? "bg-green-500"
                          : member.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-gray-400"
                      }`}
                    />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium">{member.name}</p>
                    {member.isRegistered && (
                      <span className="text-xs text-green-500">Registered</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleConnect(member.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium flex items-center transition-colors duration-200
                      ${
                        member.status === "connected"
                          ? "bg-green-50 text-green-600 hover:bg-green-100"
                          : member.status === "pending"
                          ? "bg-yellow-50 text-yellow-600 hover:bg-yellow-100"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {member.status === "connected"
                      ? "Connected"
                      : member.status === "pending"
                      ? "Pending"
                      : "Connect"}
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <MessageCircle size={18} className="text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {filteredMembers.length > 5 && (
            <button
              onClick={() => setShowAllMembers(!showAllMembers)}
              className="mt-4 text-sm font-semibold underline text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              {showAllMembers ? "Show less" : "See more"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
