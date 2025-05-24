"use client";

import React, { useState } from "react";
import { Search, Filter, Plus } from "lucide-react";
import { posts } from "@/lib/postdata";
import PostCard from "@/components/cards/PostCard";
import CreatePostModal from "./CreatePostModal";

const CommunityPosts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const filteredPosts = posts.filter(
    (post) =>
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto  py-8">
      <div className="mb-6">
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search here"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary hover:bg-primary/80 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center"
          >
            <Plus size={18} className="mr-1" />
            Create a post
          </button>
        </div>

        <div className="flex justify-end">
          <button className="flex items-center text-gray-600 hover:text-primary transition-colors duration-200">
            <span className="mr-1">Filter</span>
            <Filter size={16} />
          </button>
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
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
