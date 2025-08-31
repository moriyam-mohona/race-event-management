"use client";

import { useState } from "react";
import ChatTop from "./ChatTop";
import ChatInterface from "./ChatInterface";
import ChatMessages from "./ChatMessages";
import ConnectionRequest from "./ConnectionRequest";
// import ChatMessagesWithCommunity from "./chatWithCommunity/ChatMessagesWithCommunity";
// import ChatInterfaceWithCommunity from "./chatWithCommunity/ChatInterfaceWithCommunity";

const ChatLayout = () => {
  const [user2Id, setUser2Id] = useState<string | null>(null);
  // const [communityId, setCommunityId] = useState<string | null>(null);
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);

  return (
    <div>
      <ChatTop />
      <div className="flex flex-col lg:flex-row gap-2 xl:gap-10 w-full mt-5 xl:mt-5">
        <div className="block lg:hidden w-full lg:w-1/3 space-y-8">
          <ConnectionRequest />
        </div>
        <div className="hidden lg:flex flex-col w-full lg:w-1/3 space-y-8">
          <ConnectionRequest />
          <ChatMessages setUser2Id={setUser2Id} setChatRoomId={setChatRoomId} />
          {/* <ChatMessagesWithCommunity
            setUser2Id={setUser2Id}
            setCommunityId={setCommunityId}
            setChatRoomId={setChatRoomId}
          /> */}
        </div>
        <div className="w-full lg:w-2/3">
          {/* <ChatInterfaceWithCommunity
            chatRoomId={chatRoomId}
            user2Id={user2Id}
            communityId={communityId}
          /> */}
          <ChatInterface
            chatRoomId={chatRoomId}
            user2Id={user2Id}
            // communityId={communityId}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
