/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { useState } from "react";

const ChatMessages = () => {
  const [showAll, setShowAll] = useState(false);
  const [activeTab, setActiveTab] = useState("inbox");

  const generateInboxMembers = () => [
    {
      id: 1,
      name: "Alex Rodriguez",
      location: "Spain",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      type: "user",
      status: null,
    },
    {
      id: 2,
      name: "Emma Thompson",
      location: "United Kingdom",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b400?w=40&h=40&fit=crop&crop=face",
      type: "user",
      status: "Online",
    },
    {
      id: 3,
      name: "Marcus Johnson",
      location: "United States",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      type: "user",
      status: "Verified",
    },
    {
      id: 4,
      name: "Sophie Chen",
      location: "Canada",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      type: "user",
      status: "Active",
    },
    {
      id: 5,
      name: "James Wilson",
      location: "Australia",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      type: "user",
      status: null,
    },
    {
      id: 6,
      name: "Lisa Park",
      location: "South Korea",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      type: "user",
      status: "Online",
    },
    {
      id: 7,
      name: "David Miller",
      location: "Germany",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=face",
      type: "user",
      status: "Verified",
    },
  ];
  const generateCommunityMembers = () => [
    {
      id: 1,
      name: "Generali Malaga Marathon",
      location: "Local Chat",
      avatar: null,
      type: "marathon",
      status: null,
      memberCount: "2.5k members",
    },
    {
      id: 2,
      name: "Tech Entrepreneurs Hub",
      location: "Global Community",
      avatar: null,
      type: "business",
      status: "Verified Community",
      memberCount: "12.3k members",
    },
    {
      id: 3,
      name: "London Running Club",
      location: "Local Chat",
      avatar: null,
      type: "sports",
      status: null,
      memberCount: "856 members",
    },
    {
      id: 4,
      name: "Digital Nomads Network",
      location: "Global Chat",
      avatar: null,
      type: "lifestyle",
      status: "Featured",
      memberCount: "45.2k members",
    },
    {
      id: 5,
      name: "Barcelona Food Lovers",
      location: "Local Community",
      avatar: null,
      type: "food",
      status: null,
      memberCount: "3.1k members",
    },
    {
      id: 6,
      name: "Startup Founders Circle",
      location: "Global Network",
      avatar: null,
      type: "business",
      status: "Premium",
      memberCount: "8.7k members",
    },
    {
      id: 7,
      name: "Photography Enthusiasts",
      location: "Creative Community",
      avatar: null,
      type: "creative",
      status: "Active",
      memberCount: "15.6k members",
    },
    {
      id: 8,
      name: "Fitness Motivation Group",
      location: "Health & Wellness",
      avatar: null,
      type: "fitness",
      status: null,
      memberCount: "9.2k members",
    },
  ];

  const inboxMembers = generateInboxMembers();
  const communityMembers = generateCommunityMembers();

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
      // Simple avatar placeholder without colors
      const letter = member.name.charAt(0).toUpperCase();
      return (
        <div className="w-10 h-10 rounded-full bg-green-800/10 flex items-center justify-center">
          <span className="text-green-800 font-medium">{letter}</span>
        </div>
      );
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
          {displayedMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center space-x-3 hover:bg-green-500/10 rounded-lg p-1 transition-colors cursor-pointer"
            >
              {renderAvatar(member)}
              <div className="flex-1">
                <h4 className="font-medium text-gray-800">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.location}</p>
              </div>
            </div>
          ))}
        </div>

        {/* See more button */}
        {!showAll && currentMembers.length > 4 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-4 text-gray-600 font-medium underline hover:text-gray-800 transition-colors"
          >
            See more
          </button>
        )}

        {showAll && (
          <button
            onClick={() => setShowAll(false)}
            className="mt-4 text-gray-600 font-medium underline hover:text-gray-800 transition-colors"
          >
            Show less
          </button>
        )}
      </div>
    </div>
  );
};

export default ChatMessages;
