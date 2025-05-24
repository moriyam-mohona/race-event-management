import React from "react";
import { Share } from "lucide-react";
import { Post } from "@/types/Post";
import Image from "next/image";
import { FiThumbsUp } from "react-icons/fi";
import { BiSolidCommentDetail } from "react-icons/bi";

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const getInitial = (username: string) => {
    return username.charAt(0).toUpperCase();
  };

  const getBgColor = (username: string) => {
    const colors = [
      "bg-blue-200",
      "bg-green-200",
      "bg-yellow-200",
      "bg-purple-200",
      "bg-pink-200",
      "bg-indigo-200",
    ];
    const hash = username
      .split("")
      .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  const renderAvatar = (size: "sm" | "md" | "lg" = "md") => {
    const user = post.author;
    return (
      <div
        className={`${
          sizeClasses[size]
        } rounded-full flex items-center justify-center ${getBgColor(
          user.username
        )} text-gray-700 font-medium overflow-hidden`}
      >
        {user.avatar ? (
          <Image
            src={user.avatar}
            alt={user.username}
            width={1000}
            height={1000}
            className="w-12 h-12 object-cover"
          />
        ) : (
          <span>{getInitial(user.username)}</span>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-200 hover:shadow-md mb-4">
      <div className="p-4">
        {/* Author info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            {renderAvatar("md")}
            <div className="ml-3">
              <h3 className="font-medium text-gray-800">
                {post.author.username}
              </h3>
              <div className="flex items-center text-xs">
                <span
                  className={`${
                    post.author.isRegistered
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {post.author.isRegistered ? "Registered" : "Unregistered"}
                </span>
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-gray-500">{post.author.role}</span>
              </div>
            </div>
          </div>
          <span className="text-sm text-gray-500">
            {formatDate(post.createdAt)}
          </span>
        </div>

        {/* Post image if exists */}
        {post.imageUrl && (
          <div className="mt-3 mb-4 rounded-2xl">
            <Image
              src={post.imageUrl}
              alt="Post attachment"
              width={1000}
              height={1000}
              className="w-full h-[300px] object-cover max-h-96 rounded-2xl"
            />
          </div>
        )}

        {/* Post content */}
        <div className="mb-3">
          <p className="text-gray-700 whitespace-pre-line font-normal">
            {post.content}
          </p>
        </div>

        {/* Interaction buttons */}
        <div className="flex items-center pt-4 border-t border-gray-100 mt-2">
          <button className="flex items-center mr-6 text-gray-600 hover:font-semibold transition-colors duration-200">
            <FiThumbsUp size={18} className="mr-1 font-bold" />
            <span className="text-sm">{post.likes}</span>
            <span className="ml-1 text-sm">Like</span>
          </button>
          <button className="flex items-center mr-6 text-gray-600 hover:font-semibold transition-colors duration-200">
            <BiSolidCommentDetail size={18} className="mr-1" />
            <span className="text-sm">{post.comments}</span>
            <span className="ml-1 text-sm">Comments</span>
          </button>
          <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors duration-200 ml-auto">
            <Share size={18} className="mr-1" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
