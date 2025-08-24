/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import { FiThumbsUp } from "react-icons/fi";
import { BiSolidCommentDetail } from "react-icons/bi";
import human from "@/assets/images/Human.png";
import { useCreateLikeOnPostMutation } from "@/redux/features/community/communityApi";
import AllComments from "./AllComments";
import { useState } from "react";

const PostCard: React.FC<any> = ({ post }) => {
  const [createLikeOnPost] = useCreateLikeOnPostMutation();
  const handleToggleLike = async () => {
    await createLikeOnPost(post?.id);
  };

  // const [comments, setComments] = useState<string[]>(allComments?.data?.data);
  const [showComments, setShowComments] = useState(false);
  // const [commentInput, setCommentInput] = useState("");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const postCategories = [
    { label: "Ride Share", value: "RIDE_SHARE" },
    { label: "Couch Share", value: "COUCH_SHARE" },
    { label: "Room Share", value: "ROOM_SHARE" },
    { label: "General post", value: "GENERAL_POST" },
  ];

  return (
    <div className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200 mb-6">
      <div className="p-5">
        {/* Author Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Image
              src={post?.user?.profileImage || human}
              alt="Author"
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover bg-gray-100 shadow-sm"
            />
            <div className="ml-3">
              <h3 className="font-semibold text-gray-900">
                {post?.user?.fullName}
              </h3>
              <div className="flex items-center text-xs text-gray-500">
                <span className="text-green-600 font-medium">Registered</span>
                <span className="mx-1">•</span>
                <span className="font-medium">
                  {postCategories.find((cat) => cat.value === post?.category)
                    ?.label || "Unknown"}
                </span>
              </div>
            </div>
          </div>
          <span className="text-xs md:text-sm text-gray-400 font-medium">
            {formatDate(post?.createdAt)}
          </span>
        </div>

        {/* Post Image */}
        {post?.images?.[0] && (
          <div className="overflow-hidden rounded-xl mb-4">
            <Image
              src={post.images[0]}
              alt="Post attachment"
              width={1000}
              height={600}
              className="w-full h-[260px] md:h-[320px] object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        )}

        {/* Post Content */}
        <p className="text-gray-700 text-sm md:text-base whitespace-pre-line leading-relaxed mb-4">
          {post?.description}
        </p>

        {/* Interaction Buttons */}
        <div className="flex items-center gap-6 border-t pt-3">
          <button
            onClick={handleToggleLike}
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors duration-200"
          >
            <FiThumbsUp
              size={18}
              className={post?.isLiked ? "text-primary" : ""}
            />
            <span className="text-sm font-medium">{post?._count?.Like}</span>
            <span className="text-sm">Likes</span>
          </button>
          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors duration-200"
          >
            <BiSolidCommentDetail size={18} />
            <span className="text-sm font-medium">
              {post?._count?.Comment} Comments
            </span>
          </button>
        </div>

        {/* Comments Section */}
        {showComments && <AllComments postId={post?.id} />}
      </div>
    </div>
  );
};

export default PostCard;
