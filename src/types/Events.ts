export interface Gear {
  id: string;
  gearTitle: string;
  categoryName: string;
  price: number;
  sizes: string[];
  gearImages: string[];
  colors: string[];
  userId: string;
  eventId: string;
  createdAt: string;
  updatedAt: string;
}

interface FAQ {
  question: string;
  answer: string;
}

export interface Community {
  id: string;
}

export interface T_Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  time: string;
  eventStatus: string;
  continent: string;
  country: string;
  region: string;
  address: string;
  location: Location;
  category: string;
  type: string;
  venueType: string;
  season: string;
  size: number;
  price: number;
  startAddress: string;
  endAddress: string;
  distance: number;
  ageLimit: string;
  frequentlyAskedQuestions: FAQ[];
  eventImages: string[];
  eventUrl: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  Gear: Gear[];
  Community: Community;
}
