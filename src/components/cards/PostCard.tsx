"use client";

import { useState } from "react";
import { Post } from "@/types/Post";
import Image from "next/image";
import { FiThumbsUp } from "react-icons/fi";
import { BiSolidCommentDetail } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { FaPaperPlane } from "react-icons/fa";
import profile from "@/assets/profile.png";
interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const initialComments = [
    "Have you ever wondered about the innovative tech company, QuantumLeap Solutions?",
    "QuantumLeap’s new AI model is groundbreaking!",
    "I'm curious how they’re handling data privacy in their latest product.",
  ];

  const [comments, setComments] = useState<string[]>(initialComments);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim() === "") return;
    const newComments = [...comments, commentInput];
    setComments(newComments);
    console.log("Posted comment:", commentInput);
    setCommentInput("");
  };

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

  const getInitial = (username: string) => username.charAt(0).toUpperCase();

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

        {/* Post image */}
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

          {/* <button
            className="flex items-center mr-6 text-gray-600 hover:font-semibold transition-colors duration-200"
            onClick={() => setShowCommentBox((prev) => !prev)}
          >
            <BiSolidCommentDetail size={18} className="mr-1" />
            <span className="text-sm">{post.comments}</span>
            <span className="ml-1 text-sm">Comments</span>
          </button> */}
          <button
            className="flex items-center mr-6 text-green-500 hover:font-semibold transition-colors duration-200 "
            onClick={() => setShowComments(!showComments)}
          >
            <BiSolidCommentDetail size={18} />
            <span className="ml-1 text-sm">{comments.length} Comments</span>
          </button>
        </div>

        {/* Comment Box */}
        {showComments && (
          <div className="space-y-4 mt-5">
            {comments.map((text, index) => (
              <div key={index} className="flex items-start gap-3">
                {/* Avatar */}
                <Image
                  src={profile}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full object-cover"
                />
                {/* Comment Content */}
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    Devid Pattel
                  </div>
                  <div className="text-xs text-green-500">Registered</div>
                  <p className="text-sm text-gray-700">{text}</p>
                </div>
              </div>
            ))}

            {/* Comment Input */}
            <form
              onSubmit={handleCommentSubmit}
              className="flex items-center gap-3 border rounded-xl px-3 py-2 mt-2"
            >
              <Image
                src={profile}
                alt="avatar"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
              <Input
                className="border-0 p-0 focus-visible:ring-0 text-sm"
                placeholder="Write your comments"
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
              />
              <button
                type="submit"
                className="text-gray-500 hover:text-blue-500"
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
