/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useCreateCommentOnPostMutation,
  useGetAllCommentsQuery,
} from "@/redux/features/community/communityApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import Image from "next/image";
import React, { useState } from "react";
import human from "@/assets/images/Human.png";
import { Input } from "../ui/input";
import { FaPaperPlane } from "react-icons/fa";

const AllComments = ({ postId }: any) => {
  const id = postId;

  const [createCommentOnPost] = useCreateCommentOnPostMutation();
  const { data: allComments } = useGetAllCommentsQuery({ id });

  const [comments, setComments] = useState<string[]>(
    allComments?.data?.data || []
  );
  const [commentInput, setCommentInput] = useState("");

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (commentInput.trim() === "") return;

    // Ensure comments is always an array
    const newComments = [...(comments || []), commentInput];
    setComments(newComments);

    const data = { commentContent: commentInput };
    const response = await handleAsyncWithToast(() =>
      createCommentOnPost({ data, id })
    );

    if (response?.data?.success) {
      setCommentInput("");
    }
  };

  return (
    <div>
      <div className="mt-5 space-y-4">
        {allComments?.data?.data?.map((comment: any) => (
          <div key={comment?.id} className="flex items-start gap-3">
            <Image
              src={comment?.user?.profileImage || human}
              alt="avatar"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full bg-gray-100 object-cover shadow-sm"
            />
            <div className="flex-1 bg-gray-50 rounded-xl px-3 py-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-gray-800">
                  {comment?.user?.fullName}
                </span>
                <span className="text-xs text-green-600">Registered</span>
              </div>
              <p className="text-sm text-gray-700">{comment?.content}</p>
            </div>
          </div>
        ))}

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
            className="text-gray-500 hover:text-primary transition-colors cursor-pointer"
          >
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
};

export default AllComments;
