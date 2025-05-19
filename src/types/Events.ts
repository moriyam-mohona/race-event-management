import { StaticImageData } from "next/image";

interface Gear {
  id: string;
  name: string;
  type: string;
  image: string | StaticImageData;
}
interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface T_Event {
  title: string;
  eventImage: string | StaticImageData;
  location: {
    city: string;
    country: string;
  };
  date: string;
  eventType: string;
  venueType: string;
  participants: string;
  season: string;
  price: string;
  registration: {
    hostLocation: number;
    hostCountry: number;
    entryFee: number;
  };
  description: string;
  startAddress: string;
  finishAddress: string;
  id: string;
  // name: string;
  type: string;
  image: string | StaticImageData;
  gears: Gear[];
  faqs: FAQ[];
}
