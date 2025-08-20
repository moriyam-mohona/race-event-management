import { StaticImageData } from "next/image";

export interface Event {
  _id: { $oid: string };
  title: string;
  address: string;
  startDate: { $date: string };
  endDate: { $date: string };
  category: string;
  price: number;
  currency: string;
  eventImages: string | StaticImageData;
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
  date: string;
  continent: string;
  country: string;
  region: string;
  raceType: "" | "HYBRID" | "VIRTUAL" | "ON_SITE" | "SHARED";
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
  status?: string;
  bookmark?: boolean;
}

export interface TicketState {
  eventType?: string;
  distance?: string;
  date?: string;
  time?: string;
  price?: number;
  quantity?: number;
}

export interface PersonalDetailsState {
  gender?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  nationality?: string;
  email?: string;
  address?: string;
  continent?: string;
  country?: string;
  region?: string;
  zipCode?: string;
  phoneNumber?: string;
  emergencyContact?: string;
}

export interface AddOnItem {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  quantity: number;
}

export interface AddOnsState {
  selectedItems?: AddOnItem[];
}

export interface PaymentState {
  paymentMethod?: string;
  cardName?: string;
  cardNumber?: string;
  cvv?: string;
  expiryDate?: string;
  agreeToTerms?: boolean;
  country?: string;
}

export interface BookingState {
  currentStep: number;
  ticket: TicketState;
  personalDetails: PersonalDetailsState;
  addOns: AddOnsState;
  payment: PaymentState;
}
export interface EventProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image: string | StaticImageData;
  category: string;
  status: "upcoming" | "completed";
  attendees: number;
}

export interface Booking {
  id: number;
  sl: number;
  name: string;
  dateTime: string;
  location: string;
  email: string;
  member: number;
  price: number;
  gearPrice: number;
  gender: string;
}

export interface BookingListProps {
  activeTab: "upcoming" | "completed";
  searchQuery: string;
  currentPage: number;
  onPageChange: (page: number) => void;
  selectedMonth: string;
}
