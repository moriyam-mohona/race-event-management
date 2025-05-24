import { Post } from "@/types/Post";

export const posts: Post[] = [
  {
    id: "1",
    content:
      "Have you ever wondered about the innovative tech company, QuantumLeap Solutions? They specialize in cutting-edge software development and are known for their unique approach to problem-solving in the IT industry.",
    createdAt: "2025-05-03T10:30:00Z",
    likes: 15,
    comments: 5,
    author: {
      id: "user1",
      username: "Username",
      isRegistered: true,
      role: "General",
    },
  },
  {
    id: "2",
    content:
      "The Generali Málaga Marathon is a popular international race held annually in the sunny coastal city of Málaga, Spain. Known for its flat, fast course and scenic route along the Mediterranean Sea, it attracts runners from around the world. With categories including a full marathon, half marathon, and 10K, the event is ideal for both competitive athletes and casual runners. Málaga's warm climate, rich culture, and vibrant atmosphere make it not just a race, but a full experience.",
    imageUrl:
      "https://images.pexels.com/photos/2524874/pexels-photo-2524874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    createdAt: "2025-05-03T14:45:00Z",
    likes: 42,
    comments: 8,
    author: {
      id: "user2",
      username: "Generali Malaga Marathon",
      isRegistered: false,
      role: "Admin",
    },
  },
  {
    id: "3",
    content:
      "Just completed my first 10K run! It was challenging but so rewarding. Looking forward to training for a half marathon next. Any tips from experienced runners?",
    createdAt: "2025-05-02T09:15:00Z",
    likes: 28,
    comments: 12,
    author: {
      id: "user3",
      username: "RunnerJane",
      isRegistered: true,
      role: "General",
    },
  },
  {
    id: "4",
    content:
      "Our community cleanup event was a huge success! We collected over 200 pounds of trash from the local park. Thanks to everyone who volunteered their time for this important cause.",
    imageUrl:
      "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    createdAt: "2025-05-01T16:20:00Z",
    likes: 53,
    comments: 7,
    author: {
      id: "user4",
      username: "GreenEarth",
      isRegistered: true,
      role: "Moderator",
    },
  },
];
