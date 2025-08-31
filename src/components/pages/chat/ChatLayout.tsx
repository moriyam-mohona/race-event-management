"use client";

import { useState } from "react";
import ChatInterface from "./ChatInterface";
import ChatMessages from "./ChatMessages";
import ChatTop from "./ChatTop";
import ConnectionRequest from "./ConnectionRequest";
import ChatInterfaceWithCommunity from "./chatWithCommunity/ChatInterfaceWithCommunity";

const ChatLayout = () => {
  const [user2Id, setUser2Id] = useState<string | null>(null);
  const [communityId, setCommunityId] = useState<string | null>(null);
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("inbox");

  console.log(activeTab);
  console.log(communityId, "communityId");
  console.log(user2Id, "user2Id");
  console.log(chatRoomId, "chatRoomId");

  return (
    <div>
      <ChatTop />
      <div className="flex flex-col lg:flex-row gap-2 xl:gap-10 w-full mt-5 xl:mt-5">
        <div className="block lg:hidden w-full lg:w-1/3 space-y-8">
          <ConnectionRequest />
        </div>
        <div className="hidden lg:flex flex-col w-full lg:w-1/3 space-y-8">
          <ConnectionRequest />
          <ChatMessages
            setUser2Id={setUser2Id}
            setChatRoomId={setChatRoomId}
            setCommunityId={setCommunityId}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          {/* <ChatMessagesWithCommunity
            setUser2Id={setUser2Id}
            setCommunityId={setCommunityId}
            setChatRoomId={setChatRoomId}
          /> */}
        </div>
        <div className="w-full lg:w-2/3">
          {activeTab === "inbox" && !communityId && chatRoomId && user2Id ? (
            <ChatInterface chatRoomId={chatRoomId} user2Id={user2Id} />
          ) : activeTab === "communities" &&
            communityId &&
            !user2Id &&
            !chatRoomId ? (
            <ChatInterfaceWithCommunity communityId={communityId} />
          ) : (
            <div className="h-[70vh] flex flex-col items-center justify-center">
              <p className="text-gray-500">
                {activeTab === "inbox"
                  ? "Select a chat to start messaging"
                  : "Select a community to start messaging"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
