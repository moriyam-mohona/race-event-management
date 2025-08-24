import CommunityHeader from "@/components/pages/community/CommunityProfile/CommunityHeader";
import CommunityPosts from "./CommunityPosts";
import CommunityChats from "./CommunityChats";

const CommunityProfile = () => {
  return (
    <div className="mt-36 container mx-auto px-3">
      <CommunityHeader />
      <div className="my-10">
        <hr className="h-2 border-t border-gray-200" />
      </div>
      <div className="flex flex-col-reverse lg:flex-row gap-4 lg:px-4">
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

export default CommunityProfile;
