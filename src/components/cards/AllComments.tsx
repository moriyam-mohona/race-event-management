/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  useCreateCommentOnPostMutation,
  useDeleteCommentMutation,
  useGetAllCommentsQuery,
} from "@/redux/features/community/communityApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import human from "@/assets/images/Human.png";
import { Input } from "../ui/input";
import { FaPaperPlane } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import CommentSkeleton from "../skeletons/CommentSkeleton";

const AllComments = ({ postId }: any) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 3,
  });

  const id = postId;

  const queryObj = [
    { name: "page", value: pagination.current },
    { name: "limit", value: pagination.pageSize },
  ];

  const {
    data: allComments,
    isFetching,
    isLoading,
  } = useGetAllCommentsQuery({
    id,
    queryObj,
  });
  const [createCommentOnPost] = useCreateCommentOnPostMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState<any[]>([]);

  // Append new page data whenever `allComments` changes
  useEffect(() => {
    if (allComments?.data?.data) {
      setComments((prev) => {
        // If it's page 1, replace entirely
        if (pagination.current === 1) return allComments.data.data;

        // Append new comments, but avoid duplicates
        const newComments = allComments.data.data.filter(
          (c: any) => !prev.some((p) => p.id === c.id)
        );
        return [...prev, ...newComments];
      });
    }
  }, [allComments?.data?.data, pagination.current]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim() === "") return;

    const data = { commentContent: commentInput };

    const response = await handleAsyncWithToast(() =>
      createCommentOnPost({ data, id })
    );

    if (response?.data?.success) {
      setCommentInput("");
      // Refresh comments from server (reload from page 1)
      setPagination({ current: 1, pageSize: pagination.pageSize });
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    const response = await handleAsyncWithToast(() => deleteComment(commentId));
    if (response?.data?.success) {
      // Refresh comments from server (reload from page 1)
      setPagination({ current: 1, pageSize: pagination.pageSize });
    }
  };

  const meta = allComments?.data?.meta;
  const hasMore = meta?.page < meta?.totalPages;

  return (
    <div>
      <div className="mt-5 space-y-4">
        {/* Comments list or Skeleton */}
        {isLoading || isFetching ? (
          Array.from({ length: 3 }).map((_, idx) => (
            <CommentSkeleton key={idx} />
          ))
        ) : comments.length > 0 ? (
          comments.map((comment: any) => (
            <div key={comment?.id} className="flex items-start gap-3">
              <Image
                src={comment?.user?.profileImage || human}
                alt="avatar"
                width={32}
                height={32}
                className="w-8 h-8 rounded-full bg-gray-100 object-cover shadow-sm"
              />
              <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-800">
                      {comment?.user?.fullName}
                    </span>
                    <span className="text-xs text-green-600">Registered</span>
                  </div>
                  <button
                    onClick={() => handleDeleteComment(comment?.id)}
                    className="text-red-500 cursor-pointer"
                  >
                    <RiDeleteBinLine size={18} />
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-700">{comment?.content}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 py-4">No comments yet.</p>
        )}

        {/* Show More Button */}
        {hasMore && !isLoading && !isFetching && (
          <div className="flex justify-center">
            <button
              onClick={() =>
                setPagination((prev) => ({
                  ...prev,
                  current: prev.current + 1,
                }))
              }
              disabled={isFetching}
              className="px-4 py-2 text-sm text-green-500 hover:underline transition disabled:opacity-50 cursor-pointer hover:font-semibold"
            >
              {isFetching ? "Loading..." : "Show More"}
            </button>
          </div>
        )}

        {/* Comment Input */}
        <form
          onSubmit={handleCommentSubmit}
          className="flex items-center gap-3 border rounded-xl px-3 py-2 bg-white shadow-sm"
        >
          <Image
            src={human}
            alt="avatar"
            width={32}
            height={32}
            className="w-8 h-8 rounded-full object-cover"
          />
          <Input
            className="border-0 focus-visible:ring-0 text-sm flex-1"
            placeholder="Write a comment..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button
            type="submit"
            className="text-gray-500 hover:text-green-500 transition-colors cursor-pointer"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AllComments;
