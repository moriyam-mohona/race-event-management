"use client";

import { Search, Plus } from "lucide-react";
import PostCard from "@/components/cards/PostCard";
import CreatePostModal from "./CreatePostModal";
import {
  useGetAllCommunityPostsQuery,
  useGetSingleCommunityQuery,
} from "@/redux/features/community/communityApi";
import { useParams } from "next/navigation";
import { Post } from "@/types/Post";
import { useState, useEffect, useRef } from "react";
import { Pagination } from "antd";
import { CiFilter } from "react-icons/ci";
import PostsSkeleton from "@/components/skeletons/PostsSkeleton";

const postCategories = [
  { label: "Ride Share", value: "RIDE_SHARE" },
  { label: "Couch Share", value: "COUCH_SHARE" },
  { label: "Room Share", value: "ROOM_SHARE" },
  { label: "General post", value: "GENERAL_POST" },
];

const CommunityPosts: React.FC = () => {
  const id = useParams().id;

  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(""); // Debounced value
  const [filterValue, setFilterValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowFilterDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Build query object dynamically
  const queryObj = [
    { name: "page", value: pagination.current },
    { name: "limit", value: pagination.pageSize },
    ...(debouncedSearch
      ? [{ name: "searchField", value: debouncedSearch }]
      : []),
    ...(filterValue ? [{ name: "category", value: filterValue }] : []),
  ];

  const { data: singleCommunityDetail } = useGetSingleCommunityQuery(id);

  const {
    data: allCommunityPosts,
    isFetching,
    isLoading,
  } = useGetAllCommunityPostsQuery({ id, queryObj });

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ current: page, pageSize });
  };

  // Reset pagination when search or filter changes
  useEffect(() => {
    setPagination((prev) => ({ ...prev, current: 1 }));
  }, [debouncedSearch, filterValue]);

  const totalCount = allCommunityPosts?.data?.meta?.total || 0;

  if (isLoading || isFetching) {
    return <PostsSkeleton />;
  }

  return (
    <div className="max-w-4xl py-8">
      <div className="mb-6">
        {/* Search and Create Post */}
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

          {singleCommunityDetail?.data?.isPaidFollower && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-primary hover:bg-primary/80 text-white px-2 md:px-4 py-2 rounded-lg transition-colors duration-200 flex items-center cursor-pointer"
            >
              <Plus size={18} className="mr-1" />
              <span className="hidden md:inline">Create a post</span>
            </button>
          )}
        </div>

        {/* Filter Dropdown */}
        <div className="relative flex justify-end mt-4" ref={dropdownRef}>
          <button
            onClick={() => setShowFilterDropdown((prev) => !prev)}
            className="flex items-center text-gray-700 hover:text-primary transition-colors duration-200 bg-white border border-gray-200 shadow-sm hover:shadow-md px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 text-sm"
          >
            <span className="mr-1 font-medium !text-sm">
              {filterValue
                ? postCategories.find((c) => c.value === filterValue)?.label
                : "Filter"}
            </span>
            {/* <ChevronDown size={18} className="text-gray-500" /> */}
            <CiFilter size={18} className="text-gray-500" />
          </button>

          {showFilterDropdown && (
            <div className="absolute right-0 w-52 bg-white border border-gray-200 shadow-lg z-20 overflow-hidden animate-fade-in">
              {postCategories.map((category) => (
                <div
                  key={category.value}
                  className="px-4 py-2 hover:bg-primary/10 hover:text-primary cursor-pointer transition-colors duration-200 text-gray-700  !text-sm"
                  onClick={() => {
                    setFilterValue(category.value);
                    setShowFilterDropdown(false);
                  }}
                >
                  {category.label}
                </div>
              ))}
              <div
                className="px-4 py-2 hover:bg-red-100 hover:text-red-500 cursor-pointer transition-colors duration-200 text-red-500 font-medium !text-sm"
                onClick={() => {
                  setFilterValue("");
                  setShowFilterDropdown(false);
                }}
              >
                Clear Filter
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Posts List */}
      {allCommunityPosts?.data?.data?.length ? (
        allCommunityPosts.data.data.map((post: Post) => (
          <PostCard key={post.id} post={post} />
        ))
      ) : (
        <div className="text-center py-8 text-gray-500">
          <p>No posts found matching your search.</p>
        </div>
      )}

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Pagination */}
      <div className="p-4 w-full flex flex-wrap justify-center">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={totalCount}
          onChange={handlePaginationChange}
          disabled={isFetching}
        />
      </div>
    </div>
  );
};

export default CommunityPosts;
