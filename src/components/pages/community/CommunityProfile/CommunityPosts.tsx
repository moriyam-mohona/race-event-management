"use client";

import { Search, Filter, Plus } from "lucide-react";
import PostCard from "@/components/cards/PostCard";
import CreatePostModal from "./CreatePostModal";
import {
  useGetAllCommunityPostsQuery,
  useGetSingleCommunityQuery,
} from "@/redux/features/community/communityApi";
import { useParams } from "next/navigation";
import { Post } from "@/types/Post";
import { useState } from "react";

const CommunityPosts: React.FC = () => {
  const id = useParams().id;
  const { data: singleCommunityDetail } = useGetSingleCommunityQuery(id);
  const { data: allCommunityPosts } = useGetAllCommunityPostsQuery({ id });

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="max-w-4xl py-8">
      <div className="mb-6">
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search here"
              // value={searchTerm}
              // onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
          {singleCommunityDetail?.data?.isPaidFollower === true ? (
            <>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary/80 text-white px-2 md:px-4 py-2 rounded-lg transition-colors duration-200 flex items-center cursor-pointer"
              >
                <Plus size={18} className="mr-1" />
                <span className="hidden md:inline">Create a post</span>
              </button>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="flex justify-end mt-10 ">
          <button className="flex items-center text-gray-600 hover:text-primary transition-colors duration-200 border border-gray-200 px-4 py-2 rounded-lg">
            <span className="mr-1">Filter</span>
            <Filter size={16} />
          </button>
        </div>
      </div>

      {allCommunityPosts?.data?.data?.length > 0 ? (
        allCommunityPosts?.data?.data?.map((post: Post) => (
          <PostCard key={post?.id} post={post} />
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No posts found matching your search.</p>
        </div>
      )}

      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default CommunityPosts;
