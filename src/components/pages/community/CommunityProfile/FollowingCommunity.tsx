import React from "react";

interface Community {
  id: string;
  name: string;
  followers: number;
}

const FollowingCommunity = () => {
  const communities: Community[] = [
    { id: "1", name: "React Developers Hub", followers: 847 },
    { id: "2", name: "Next.js Nation", followers: 1234 },
    { id: "3", name: "Tailwind CSS Community", followers: 562 },
    { id: "4", name: "Full Stack JavaScript", followers: 2019 },
    { id: "5", name: "Tech Startup Founders", followers: 3456 },
  ];

  const formatFollowers = (count: number): string => {
    return new Intl.NumberFormat("en-US").format(count);
  };

  return (
    <div className="border rounded-lg bg-white p-4">
      <h2 className="text-gray-800 font-medium mb-4 text-lg">
        Community you are following
      </h2>
      <div className="">
        {communities.map((community) => (
          <div
            key={community.id}
            className="flex items-center justify-between group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-gray-700 font-medium">
                {community.name.charAt(0)}
              </div>
              <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-200">
                {community.name}
              </span>
            </div>
            <span className="text-gray-500 hidden md:block text-sm">
              {formatFollowers(community.followers)} Followers
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FollowingCommunity;
