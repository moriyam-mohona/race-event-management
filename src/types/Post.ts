export interface User {
  id: string;
  username: string;
  avatar?: string;
  isRegistered: boolean;
  role: "Admin" | "General" | "Moderator";
}

export interface Post {
  id: string;
  content: string;
  imageUrl?: string;
  createdAt: string;
  likes: number;
  comments: number;
  author: User;
}
