"use client";

import { selectCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

export let socket: WebSocket | null = null;

export default function SocketProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = useAppSelector(selectCurrentToken);

  useEffect(() => {
    socket = new WebSocket(`ws://172.252.13.76:5012?token=${token}`);

    socket.onopen = () => {
      console.log("Connected to WebSocket");
      socket?.send(
        JSON.stringify({
          type: "joinApp",
        })
      );
    };

    //     socket.onmessage = (event) => {
    //       const data = JSON.parse(event.data);
    //       console.log("Message from server:", data);
    //     };

    return () => {
      socket?.close();
    };
  }, [token]);

  return <>{children}</>;
}
