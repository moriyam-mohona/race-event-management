import React from "react";
import ChatTop from "./ChatTop";
import ChatInterface from "./ChatInterface";
import ChatMessages from "./ChatMessages";
import ConnectionRequest from "./ConnectionRequest";

const ChatLayout = () => {
  return (
    <div>
      <ChatTop />
      <div className="flex gap-10 w-full mt-10">
        <div className="w-full lg:w-1/3 space-y-8">
          <ConnectionRequest />
          <ChatMessages />
        </div>
        <div className="w-full lg:w-2/3">
          <ChatInterface />
        </div>
      </div>
    </div>
  );
};

export default ChatLayout;
