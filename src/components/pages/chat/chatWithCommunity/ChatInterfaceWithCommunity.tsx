"use client";

import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Send } from "lucide-react";
import {
  useGetAllMessagesOfCommunityQuery,
  useGetSingleMessageByUserQuery,
} from "@/redux/features/chat/chatApi";
import { socket } from "@/provider/SocketProvider";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

interface ChatInterfaceProps {
  chatRoomId: string | null;
  user2Id: string | null;
  communityId: string | null;
}

type Message = {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
};

const ChatInterfaceWithCommunity = ({
  chatRoomId,
  user2Id,
  communityId,
}: ChatInterfaceProps) => {
  const user = useAppSelector(selectCurrentUser);

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 10;

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Fetch messages with pagination
  const { data: messageData, isFetching } = useGetSingleMessageByUserQuery({
    id: chatRoomId,
    data: {
      queryObj: [
        { name: "page", value: String(page) },
        { name: "limit", value: String(limit) },
      ],
    },
  });
  const { data: messageCommunityData, isCommunityFetching } =
    useGetAllMessagesOfCommunityQuery({
      id: chatRoomId,
      data: {
        queryObj: [
          { name: "page", value: String(page) },
          { name: "limit", value: String(limit) },
        ],
      },
    });

  // Merge new messages with existing ones, avoiding duplicates
  useEffect(() => {
    if (messageData?.data?.messages) {
      setMessages((prev) => {
        const newMessages = messageData.data.messages.filter(
          (msg: Message) => !prev.some((m) => m.id === msg.id)
        );

        if (newMessages.length < limit) setHasMore(false);

        return [...newMessages, ...prev]; // prepend older messages
      });
    }
  }, [messageData]);

  useEffect(() => {
    if (messageCommunityData?.data?.messages) {
      setMessages((prev) => {
        const newMessages = messageCommunityData.data.messages.filter(
          (msg: Message) => !prev.some((m) => m.id === msg.id)
        );

        if (newMessages.length < limit) setHasMore(false);

        return [...newMessages, ...prev];
      });
    }
  }, [messageCommunityData]);

  // Sort messages by creation time
  const sortedMessages = useMemo(() => {
    return [...messages].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [sortedMessages]);

  // Handle scroll to fetch older messages
  const handleScroll = useCallback(() => {
    if (
      chatContainerRef.current &&
      chatContainerRef.current.scrollTop === 0 &&
      !isFetching &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }
  }, [isFetching, hasMore]);

  useEffect(() => {
    const container = chatContainerRef.current;
    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        console.log("Message from server:", data);
        if (data?.type === "receivePrivateMessage") {
          setMessages((prev) => [
            ...prev,
            {
              id: data?.id,
              content: data?.content,
              senderId: data?.senderId,
              createdAt: data?.createdAt,
            },
          ]);
        }
      };
    }
  });

  // Send message via WebSocket
  const handleSendMessage = (content: string) => {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.error("WebSocket not connected");
      return;
    }

    if (communityId) {
      // COMMUNITY MESSAGE
      socket.send(
        JSON.stringify({
          type: "sendGroupMessage",
          communityId: communityId,
          content: content,
        })
      );
    } else if (chatRoomId && user2Id) {
      // PRIVATE MESSAGE
      socket.send(
        JSON.stringify({
          type: "sendPrivateMessage",
          receiverId: user2Id,
          content: content,
        })
      );
    }

    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  // Message bubble component
  const MessageBubble = ({ message }: { message: Message }) => {
    const isMe = message.senderId === user?.id;

    return (
      <div
        className={`flex items-start gap-2 mb-4 ${
          isMe ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
          {isMe ? "👨‍💼" : "👤"}
        </div>

        <div
          className={`flex flex-col ${
            isMe ? "items-end" : "items-start"
          } max-w-[70%]`}
        >
          <div
            className={`p-2 lg:p-4 rounded-md ${
              isMe
                ? "border border-gray-300"
                : "border border-primary text-gray-800"
            }`}
          >
            <p className="text-gray-600 leading-relaxed text-sm xl:text-base">
              {message.content}
            </p>
          </div>
          <span className="text-xs text-gray-600 mt-1 px-1">
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="border border-gray-200 h-[450px] lg:h-[600px] rounded-2xl flex flex-col bg-white overflow-hidden">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
        style={{ scrollBehavior: "smooth", maxHeight: "calc(100% - 90px)" }}
      >
        {sortedMessages.map((m) => (
          <MessageBubble key={m?.id} message={m} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type message"
              className="w-full px-4 py-5 pr-12 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-white"
            />
          </div>

          <button
            type="button"
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim()}
            className="w-10 h-10 bg-primary text-white rounded-md flex items-center justify-center hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterfaceWithCommunity;
