import CommunityChats from "@/components/pages/community/CommunityChats";
import CommunityHeader from "@/components/pages/community/CommunityHeader";
import CommunityPosts from "@/components/pages/community/CommunityPosts";

const Community = () => {
  return (
    <div className="mt-36 container mx-auto px-3">
      <CommunityHeader />
      <div className="my-10">
        <hr className="h-2 border-t border-gray-200" />
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-4 px-4">
        <div className="w-full lg:w-2/3">
          <CommunityPosts />
        </div>
        <div className="w-full lg:w-1/3">
          <CommunityChats />
        </div>
      </div>
    </div>
  );
};

export default Community;
