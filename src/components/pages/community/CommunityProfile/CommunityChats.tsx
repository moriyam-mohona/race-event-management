import React from "react";
import Message from "./Message";
import FollowingCommunity from "./FollowingCommunity";

const CommunityChats = () => {
  return (
    <div className="space-y-10">
      <Message />
      <FollowingCommunity />
    </div>
  );
};

export default CommunityChats;
