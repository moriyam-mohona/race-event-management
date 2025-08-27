import React from "react";
import ChatTop from "./ChatTop";
import ChatInterface from "./ChatInterface";
import ChatMessages from "./ChatMessages";
import ConnectionRequest from "./ConnectionRequest";

const ChatLayout = () => {
  return (
    <div>
      <ChatTop />
      <div className="flex flex-col lg:flex-row gap-2 xl:gap-10 w-full mt-5 xl:mt-5">
        <div className="block lg:hidden w-full lg:w-1/3 space-y-8">
          <ConnectionRequest />
        </div>
        <div className="hidden lg:flex flex-col w-full lg:w-1/3 space-y-8">
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
