import { StaticImageData } from "next/image";

export interface Event {
  id: string;
  title: string;
  location: string;
  date: string;
  category: string;
  price: number;
  currency: string;
  imageUrl: string | StaticImageData;
  description: string;
}
export interface Expo {
  id: string;
  title: string;
  location: string;
  date: string;
  category: string;
  price: number;
  currency: string;
  imageUrl: string | StaticImageData;
  description: string;
  vendorName: string;
  gears: string[];
}
