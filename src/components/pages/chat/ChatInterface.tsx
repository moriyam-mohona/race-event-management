"use client";

import { socket } from "@/provider/SocketProvider";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useGetSingleMessageByUserQuery } from "@/redux/features/chat/chatApi";
import { useAppSelector } from "@/redux/hooks";
import { Send } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface ChatInterfaceProps {
  chatRoomId: string | null;
  user2Id: string | null;
}

type Message = {
  id: string;
  content: string;
  senderId: string;
  createdAt: string;
};

const ChatInterface = ({ chatRoomId, user2Id }: ChatInterfaceProps) => {
  const user = useAppSelector(selectCurrentUser);

  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const limit = 6;

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const previousScrollHeightRef = useRef<number>(0);

  // Reset state when chatRoomId changes
  useEffect(() => {
    setMessages([]);
    setPage(1);
    setHasMore(true);
    setIsLoadingMore(false);
  }, [chatRoomId]);

  // Fetch messages with pagination
  const { data: messageData, isFetching } = useGetSingleMessageByUserQuery(
    {
      id: chatRoomId,
      data: {
        queryObj: [
          { name: "page", value: String(page) },
          { name: "limit", value: String(limit) },
        ],
      },
    },
    {
      skip: !chatRoomId,
    }
  );

  // Handle new message data
  useEffect(() => {
    if (messageData?.data?.messages) {
      const newMessages = messageData.data.messages;

      setMessages((prev) => {
        if (page === 1) {
          // First load - replace all messages
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

  // Scroll to bottom on initial load
  useEffect(() => {
    if (
      chatContainerRef.current &&
      page === 1 &&
      sortedMessages.length > 0 &&
      !isLoadingMore
    ) {
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  }, [sortedMessages, page, isLoadingMore]);

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
      }, 100);
    }
  }, [sortedMessages, page, isLoadingMore]);

  // Handle scroll to load older messages
  const handleScroll = useCallback(() => {
    const container = chatContainerRef.current;
    if (!container || isLoadingMore || !hasMore || isFetching) return;

    // Check if scrolled to top (within 10px threshold)
    if (container.scrollTop <= 10) {
      console.log("Loading more messages, current page:", page);

      // Store current scroll height before loading new messages
      previousScrollHeightRef.current = container.scrollHeight;

      setIsLoadingMore(true);
      setPage((prev) => prev + 1);
    }
  }, [isLoadingMore, hasMore, isFetching, page]);

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

        if (data?.type === "receivePrivateMessage") {
          const newMessage = {
            id: data?.id,
            content: data?.content,
            senderId: data?.senderId,
            createdAt: data?.createdAt,
          };

          setMessages((prev) => [...prev, newMessage]);

          // Auto scroll to bottom for new messages
          setTimeout(() => {
            if (chatContainerRef.current) {
              const container = chatContainerRef.current;
              const isNearBottom =
                container.scrollHeight -
                  container.scrollTop -
                  container.clientHeight <
                100;

              // Only auto-scroll if user is near the bottom
              if (isNearBottom) {
                container.scrollTop = container.scrollHeight;
              }
            }
          }, 100);
        }
      };

      socket.onmessage = handleMessage;

      return () => {
        if (socket) {
          socket.onmessage = null;
        }
      };
    }
  }, []);

  // Send message via WebSocket
  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    if (socket && socket.readyState === WebSocket.OPEN && chatRoomId) {
      socket.send(
        JSON.stringify({
          type: "sendPrivateMessage",
          receiverId: user2Id,
          content: content,
        })
      );
      setInputValue("");

      // Scroll to bottom after sending
      setTimeout(() => {
        if (chatContainerRef.current) {
          chatContainerRef.current.scrollTop =
            chatContainerRef.current.scrollHeight;
        }
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

  if (!chatRoomId) {
    return (
      <div className="border border-gray-200 h-[450px] lg:h-[600px] rounded-2xl flex items-center justify-center bg-white">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

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

export default ChatInterface;
