import { StaticImageData } from "next/image";

export interface User {
  id?: string; // not returned in the snippet, so optional
  fullName: string;
  profileImage?: string;
}

export interface Post {
  id: string;
  description: string;
  images: string[] | StaticImageData; // backend gives an array
  _count: {
    Like: number;
    Comment: number;
  };
  isLiked: boolean;
  user: User;
}

export interface Member {
  id: string;
  name: string;
  avatar: string;
  status: "connected" | "pending" | "disconnected";
  isRegistered: boolean;
  chatType: "my" | "local" | "global";
}
