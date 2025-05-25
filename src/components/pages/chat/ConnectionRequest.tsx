"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { User, UserPlus, X } from "lucide-react";
import icon from "@/assets/icons/connect.png";

interface Member {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "active" | "offline" | string;
  mutualConnections: number;
  location: string;
}

const ConnectionRequest: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [members, setMembers] = useState<Member[]>([]);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLDivElement | null>(null);

  // Generate dummy members data
  const generateMembers = (): Member[] => [
    {
      id: 1,
      name: "Devid Pattel",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      status: "online",
      mutualConnections: 12,
      location: "United Kingdom",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b400?w=40&h=40&fit=crop&crop=face",
      status: "active",
      mutualConnections: 8,
      location: "United States",
    },
    {
      id: 3,
      name: "Mike Chen",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      status: "online",
      mutualConnections: 15,
      location: "Canada",
    },
    {
      id: 4,
      name: "Emma Wilson",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      status: "offline",
      mutualConnections: 6,
      location: "Australia",
    },
    {
      id: 5,
      name: "Alex Rodriguez",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face",
      status: "active",
      mutualConnections: 22,
      location: "Spain",
    },
    {
      id: 6,
      name: "Lisa Park",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=40&h=40&fit=crop&crop=face",
      status: "online",
      mutualConnections: 9,
      location: "South Korea",
    },
    {
      id: 7,
      name: "James Miller",
      avatar:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=face",
      status: "active",
      mutualConnections: 18,
      location: "Germany",
    },
    {
      id: 8,
      name: "Sophie Turner",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop&crop=face",
      status: "online",
      mutualConnections: 11,
      location: "France",
    },
  ];

  useEffect(() => {
    setMembers(generateMembers());
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleAcceptConnection = (memberId: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== memberId));
    console.log(`Accepted connection from member with ID: ${memberId}`);
  };

  const handleDeclineConnection = (memberId: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== memberId));
    console.log(`Declined connection from member with ID: ${memberId}`);
  };

  const displayedMembers = showAll ? members : members.slice(0, 5);
  const remainingCount = members.length;

  return (
    <div className="relative px-8">
      {/* Button */}
      <div
        ref={buttonRef}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="border shadow-sm rounded-md flex justify-between items-center px-4 cursor-pointer hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2 px-2 py-3">
          <Image
            src={icon}
            alt="icon"
            height={1000}
            width={1000}
            className="w-4 h-4"
          />
          <h2 className="font-light">Connection Request</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-secondary rounded-full font-medium">
            {remainingCount}
          </span>
          <div
            className={`transform transition-transform duration-200 ${
              isDropdownOpen ? "rotate-180" : ""
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-16 left-0 right-0 bg-white border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden"
        >
          <div className="px-4 py-3 border-b bg-gray-50">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800">Members</h3>
              <button
                onClick={() => setIsDropdownOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {displayedMembers.length === 0 ? (
              <div className="px-4 py-8 text-center text-gray-500">
                <User className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No connection requests</p>
              </div>
            ) : (
              <div className="p-2">
                {displayedMembers.map((member) => (
                  <div
                    key={member.id}
                    className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Image
                          src={member.avatar}
                          alt={member.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-normal">{member.name}</h4>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDeclineConnection(member.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Decline"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleAcceptConnection(member.id)}
                        className="flex items-center gap-1 px-3 py-1.5 border hover:border-gray-400 rounded-lg hover:bg-green-100 text-sm transition-colors"
                      >
                        <UserPlus className="w-3 h-3" />
                        Accept
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {members.length > 5 && (
              <div className="px-4 py-3 border-t bg-gray-50">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="w-full text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  {showAll ? "Show less" : `See ${members.length - 5} more`}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionRequest;
