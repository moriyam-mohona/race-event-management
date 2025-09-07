"use client";

import { socket } from "@/provider/SocketProvider";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetAllMessagesOfCommunityQuery } from "@/redux/features/chat/chatApi";
import { useAppSelector } from "@/redux/hooks";
import { Send } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface ChatInterfaceProps {
  communityId: string | null;
}

type Message = {
  id: string;
  content: string;
  communityId: string;
  createdAt: string;
  sender: {
    fullName: string;
    id: string;
    profileImage: string | null;
  };
};

const ChatInterfaceWithCommunity = ({ communityId }: ChatInterfaceProps) => {
  const user = useAppSelector(selectCurrentUser);

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(false);
  const limit = 6;

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const previousScrollHeightRef = useRef<number>(0);
  const isNearBottomRef = useRef<boolean>(true);

  // Reset state when chatRoomId changes
  useEffect(() => {
    setMessages([]);
    setPage(1);
    setHasMore(true);
    setIsLoadingMore(false);
    setShouldScrollToBottom(true);
    isNearBottomRef.current = true;
  }, [communityId]);

  // Fetch messages with pagination
  const { data: messageData, isFetching } = useGetAllMessagesOfCommunityQuery(
    {
      id: communityId,
      data: {
        queryObj: [
          { name: "page", value: String(page) },
          { name: "limit", value: String(limit) },
        ],
      },
    },
    {
      skip: !communityId,
    }
  );

  console.log(messageData?.data?.result, "messageData");

  // Handle new message data
  useEffect(() => {
    if (messageData?.data?.result) {
      const newMessages = messageData?.data?.result;

      setMessages((prev) => {
        if (page === 1) {
          // First load - replace all messages
          setShouldScrollToBottom(true);
          return newMessages;
        } else {
          // Loading older messages - prepend to existing messages
          const filteredNew = newMessages.filter(
            (msg: Message) => !prev.some((m) => m.id === msg.id)
          );
          return [...filteredNew, ...prev];
        }
      });

      // Check if we have more messages to load
      if (newMessages.length < limit) {
        setHasMore(false);
      }

      setIsLoadingMore(false);
    }
  }, [messageData, page, limit]);

  // Sort messages by creation time (oldest to newest)
  const sortedMessages = useMemo(() => {
    return [...messages].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [messages]);

  // Check if user is near bottom
  const checkIfNearBottom = useCallback(() => {
    const container = chatContainerRef.current;
    if (container) {
      const isNear =
        container.scrollHeight - container.scrollTop - container.clientHeight <
        100;
      isNearBottomRef.current = isNear;
      return isNear;
    }
    return true;
  }, []);

  // Scroll to bottom function
  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
          isNearBottomRef.current = true;
        }
      }, 50);
    }
  }, []);

  // Scroll to bottom on initial load or when shouldScrollToBottom is true
  useEffect(() => {
    if (shouldScrollToBottom && sortedMessages.length > 0) {
      scrollToBottom();
      setShouldScrollToBottom(false);
    }
  }, [sortedMessages, shouldScrollToBottom, scrollToBottom]);

  // Restore scroll position after loading older messages
  useEffect(() => {
    if (page > 1 && chatContainerRef.current && !isLoadingMore) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          const currentScrollHeight = chatContainerRef.current.scrollHeight;
          const heightDifference =
            currentScrollHeight - previousScrollHeightRef.current;
          chatContainerRef.current.scrollTop = heightDifference;
        }
      }, 50);
    }
  }, [sortedMessages, page, isLoadingMore]);

  // Handle scroll to load older messages and track position
  const handleScroll = useCallback(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    // Update near bottom status
    checkIfNearBottom();

    // Load more messages if at top
    if (!isLoadingMore && hasMore && !isFetching && container.scrollTop <= 10) {
      console.log("Loading more messages, current page:", page);

      // Store current scroll height before loading new messages
      previousScrollHeightRef.current = container.scrollHeight;

      setIsLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  }, [isLoadingMore, hasMore, isFetching, page, checkIfNearBottom]);

  // Add scroll event listener
  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Handle real-time messages
  useEffect(() => {
    if (socket) {
      const handleMessage = (event: MessageEvent) => {
        const data = JSON.parse(event.data);
        console.log("Raw WebSocket data:", data); // Debug log

        if (data?.type === "receiveGroupMessage") {
          console.log(data, "Received group message");

          // Validate message data before processing
          if (
            !data?.message?.id ||
            !data?.message?.content ||
            !data?.message?.sender
          ) {
            console.error("Invalid message data received:", data);
            return;
          }

          const newMessage = {
            id: data?.message?.id,
            content: data?.message?.content,
            communityId: data?.message?.communityId,
            createdAt: data?.message?.createdAt,
            sender: data?.message?.sender,
          };

          setMessages((prev) => {
            // Check for duplicates
            const messageExists = prev.some((msg) => msg.id === newMessage.id);
            if (!messageExists) {
              return [...prev, newMessage];
            }
            return prev;
          });

          // Auto scroll to bottom for new messages only if user was near bottom
          if (isNearBottomRef.current) {
            setTimeout(() => {
              scrollToBottom();
            }, 100);
          }
        }
      };

      socket.onmessage = handleMessage;

      return () => {
        if (socket) {
          socket.onmessage = null;
        }
      };
    }
  }, [scrollToBottom, user?.id]);

  // Send message via WebSocket
  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    if (socket && socket.readyState === WebSocket.OPEN && communityId && user) {
      // Send via WebSocket - let the server handle the message creation
      socket.send(
        JSON.stringify({
          type: "sendGroupMessage",
          communityId: communityId,
          content: content.trim(),
        })
      );

      setInputValue("");

      // Scroll to bottom when sending a message
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    } else {
      console.error("WebSocket not connected");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  // Message bubble component
  const MessageBubble = ({ message }: { message: Message }) => {
    const isMe = message.sender?.id === user?.id;

    return (
      <div
        className={`flex items-start gap-2 mb-4 ${
          isMe ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center">
          {message.sender?.profileImage ? (
            <Image
              src={message.sender.profileImage}
              alt="User"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
          ) : (
            <span className="text-2xl">{isMe ? "👨‍💼" : "👤"}</span>
          )}
        </div>

        <div
          className={`flex flex-col ${
            isMe ? "items-end" : "items-start"
          } max-w-[70%]`}
        >
          {/* ✅ Sender name */}
          <span className="text-xs font-medium text-gray-700 mb-1">
            {message.sender?.fullName || "Unknown User"}
          </span>

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
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-4">
        {/* Loading indicator for older messages - Show at TOP */}
        {isLoadingMore && (
          <div className="text-center py-2 text-gray-500 text-sm">
            Loading older messages...
          </div>
        )}

        {/* No more messages indicator - Show at TOP */}
        {!hasMore && messages.length > 0 && !isLoadingMore && (
          <div className="text-center py-2 text-gray-400 text-sm">
            No more messages
          </div>
        )}

        {/* Messages container */}
        <div className="space-y-1">
          {sortedMessages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type message"
              className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent bg-white"
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
