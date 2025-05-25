"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

const ChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      sender: "other",
      time: "8:00 PM",
      avatar: "👤",
    },
    {
      id: 2,
      text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      sender: "me",
      time: "8:00 PM",
      avatar: "👨‍💼",
    },
    {
      id: 3,
      text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      sender: "other",
      time: "8:00 PM",
      avatar: "👤",
    },
    {
      id: 4,
      text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
      sender: "me",
      time: "8:00 PM",
      avatar: "👨‍💼",
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: "me",
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        avatar: "👨‍💼",
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputValue("");

      // Simulate typing indicator and response
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const response = {
          id: messages.length + 2,
          text: "Thanks for your message! This is an automated response.",
          sender: "other",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          avatar: "👤",
        };
        setMessages((prev) => [...prev, response]);
      }, 2000);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  type Message = {
    id: number;
    text: string;
    sender: string;
    time: string;
    avatar: string;
  };

  const MessageBubble = ({ message }: { message: Message }) => {
    const isMe = message.sender === "me";

    return (
      <div
        className={`flex items-start gap-2 mb-4 ${
          isMe ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div className="flex-shrink-0 w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center ">
          {message.avatar}
        </div>

        <div
          className={`flex flex-col ${
            isMe ? "items-end" : "items-start"
          } max-w-[70%]`}
        >
          <div
            className={`px-4 py-4 rounded-md ${
              isMe
                ? "border border-gray-300"
                : "border border-primary text-gray-800"
            }`}
          >
            <p className="text-gray-600 leading-relaxed">{message.text}</p>
          </div>
          <span className="text-xs text-gray-600 mt-1 px-1">
            {message.time}
          </span>
        </div>
      </div>
    );
  };

  const TypingIndicator = () => (
    <div className="flex items-start gap-2 mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm">
        👤
      </div>
      <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="border border-gray-200 h-[600px] rounded-2xl flex flex-col bg-white overflow-hidden">
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-1"
        style={{
          scrollBehavior: "smooth",
          maxHeight: "calc(100% - 120px)",
        }}
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
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
            {/* <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <Mic size={16} />
            </button> */}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleSendMessage();
            }}
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
