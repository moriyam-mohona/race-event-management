/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { Send } from "lucide-react";
import { useGetSingleMessageByUserQuery } from "@/redux/features/chat/chatApi";
import { socket } from "@/provider/SoketProvider";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

interface ChatInterfaceProps {
  chatRoomId: string | null;
}

const ChatInterface = ({ chatRoomId }: ChatInterfaceProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const user = useAppSelector(selectCurrentUser);
  console.log("user info from chat interface", user?.id);

  const [messages, setMessages] = useState<any[]>([]);

  const { data: message } = useGetSingleMessageByUserQuery({ id: chatRoomId });
  // if (isFetching) {
  //   setIsTyping(true);
  // }

  // ✅ sort messages by createdAt DESC (latest first)
  const sortedChatList = useMemo(() => {
    if (!message?.data?.messages) return [];
    return [...message.data.messages].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }, [message?.data?.messages]);

  useEffect(() => {
    if (sortedChatList?.length) {
      setMessages(sortedChatList);
    }
  }, [sortedChatList]);

  // Auto-scroll when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // const handleSendMessage = () => {
  //   if (inputValue.trim()) {
  //     const newMessage = {
  //       id: Date.now().toString(),
  //       content: inputValue,
  //       senderId: "me",
  //       createdAt: new Date().toISOString(),
  //     };

  //     // Here you would dispatch API call to actually send message
  //     console.log("Send this to API:", newMessage);
  //     setInputValue("");
  //   }
  // };

  const handleSendMessage = (inputValue: string) => {
    if (socket && socket.readyState === WebSocket.OPEN && chatRoomId) {
      socket.send(
        JSON.stringify({
          type: "sendPrivateMessage",
          // receiverId: "689c0e1ce978ef7b4c5bdbbe",
          receiverId: "chatRoomId",

          content: inputValue,
        })
      );
      console.log("Message sent:", inputValue);
    } else {
      console.error("WebSocket not connected");
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  type Message = {
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
  };

  const MessageBubble = ({ message }: { message: Message }) => {
    const isMe = message.senderId === user?.id; // replace with logged-in user id check

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
        style={{
          scrollBehavior: "smooth",
          maxHeight: "calc(100% - 90px)",
        }}
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        {isTyping && <div className="text-gray-500">Typing...</div>}
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

export default ChatInterface;
