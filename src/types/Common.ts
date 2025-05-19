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

export type Review = {
  id: string;
  name: string;
  location: string;
  review: string;
  avatar: string | StaticImageData;
};

export interface FilterState {
  eventType: string;
  categories: string[];
  distance: {
    min: string;
    max: string;
    unit: string;
  };
  date: {
    day: string;
    month: string;
    year: string;
  };
  continent: string;
  country: string;
  region: string;
  raceType: {
    hybrid: boolean;
    onSite: boolean;
    virtual: boolean;
  };
}

export interface RaceEvent {
  id: string;
  title: string;
  location: {
    city: string;
    country: string;
    coordinates: [number, number];
  };
  date: string;
  category: string;
  distance: string;
  price: string;
  terrain: string;
  participants: number;
  season: string;
  imageUrl: string;
  description: string;
}
