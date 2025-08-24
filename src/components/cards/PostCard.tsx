/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { FiThumbsUp } from "react-icons/fi";
import { BiSolidCommentDetail } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { FaPaperPlane } from "react-icons/fa";
import human from "@/assets/images/Human.png";
import {
  useCreateCommentOnPostMutation,
  useCreateLikeOnPostMutation,
  useGetAllCommentsQuery,
} from "@/redux/features/community/communityApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";

const PostCard: React.FC<any> = ({ post }) => {
  const [createLikeOnPost] = useCreateLikeOnPostMutation();
  // get all comments of a post
  const id = post?.id;
  const { data: allComments } = useGetAllCommentsQuery({ id });
  // Create Comment On any post
  const [createCommentOnPost] = useCreateCommentOnPostMutation();

  const handleToggleLike = async () => {
    await createLikeOnPost(post?.id);
  };

  const [comments, setComments] = useState<string[]>(allComments?.data?.data);
  const [showComments, setShowComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  // Create a new comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim() === "") return;
    const newComments = [...comments, commentInput];
    setComments(newComments);

    const data = {
      commentContent: commentInput,
    };

    const response = await handleAsyncWithToast(() =>
      createCommentOnPost({ data, id })
    );
    if (response?.data?.success) {
      setCommentInput("");
    }
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

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden transition-all duration-200 hover:shadow-md mb-4">
      <div className="p-4">
        {/* Author info */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <Image
              src={post?.user?.profileImage || human}
              alt="Author"
              width={800}
              height={800}
              className="w-12 h-12 rounded-full object-cover bg-gray-100"
            />
            <div className="ml-3">
              <h3 className="font-medium text-gray-800">
                {post?.user?.fullName}
              </h3>
              <div className="flex items-center text-xs">
                <span
                  className={`${
                    post?.author?.isRegistered
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {post?.author?.isRegistered ? "Registered" : "Unregistered"}
                </span>
                <span className="mx-1 text-gray-400">•</span>
                <span className="text-gray-500">{post?.author?.role}</span>
              </div>
            </div>
          </div>
          <span className="text-sm text-gray-500">
            {formatDate(post?.createdAt)}
          </span>
        </div>

        {/* Post image */}
        {post?.images?.[0] && (
          <div className="mt-3 mb-4 rounded-2xl">
            <Image
              src={post.images[0]}
              alt="Post attachment"
              width={1000}
              height={1000}
              className="bg-gray-100 w-full h-[300px] object-cover max-h-96 rounded-2xl"
            />
          </div>
        )}

        {/* Post content */}
        <div className="mb-3">
          <p className="text-sm text-gray-700 whitespace-pre-line font-normal">
            {post?.description}
          </p>
        </div>

        {/* Interaction buttons */}
        <div className="flex items-center pt-4 border-t border-gray-100 mt-2">
          <button
            onClick={() => handleToggleLike()}
            className="flex items-center mr-6 text-gray-600 hover:font-semibold transition-colors duration-200 cursor-pointer"
          >
            <FiThumbsUp
              size={18}
              className={`mr-1 font-bold ${
                post?.isLiked ? "text-primary" : "text-gray-600"
              }`}
            />

            <span className="text-sm">{post?._count?.Like}</span>
            <span className="ml-1 text-sm">Like</span>
          </button>
          <button
            className="flex items-center mr-6 text-green-500 hover:font-semibold transition-colors duration-200 "
            onClick={() => setShowComments(!showComments)}
          >
            <BiSolidCommentDetail size={18} />
            <span className="ml-1 text-sm">
              {post?._count?.Comment} Comments
            </span>
          </button>
        </div>

        {/* Comment Box */}
        {showComments && (
          <div className="space-y-4 mt-5">
            {allComments?.data?.data?.map((comment: any) => (
              <div key={comment?.id} className="flex items-start gap-3 ml-2">
                {/* Avatar */}
                <Image
                  src={comment?.user?.profileImage || human}
                  alt="avatar"
                  width={32}
                  height={32}
                  className="w-8 h-8 bg-gray-100 rounded-full object-cover"
                />
                {/* Comment Content */}
                <div>
                  <div className="text-sm font-medium text-gray-800">
                    {comment?.user?.fullName}
                  </div>
                  <div className="text-xs text-green-500">Registered</div>
                  <p className="text-sm text-gray-700">{comment?.text}</p>
                </div>
              </div>
            ))}

            {/* Comment Input */}
            <form
              onSubmit={handleCommentSubmit}
              className="flex items-center gap-3 border rounded-xl px-3 py-2 mt-2"
            >
              <Image
                src={human}
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
