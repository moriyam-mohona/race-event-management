import { RaceEvent } from "@/types/Common";

export const raceEvents: RaceEvent[] = [
  {
    id: "1",
    title: "Glendalough Lap of the Gap Marathon",
    location: {
      city: "New York",
      country: "United Kingdom",
      coordinates: [-73.9857, 40.7484],
    },
    date: "8-10 Aug, 2025",
    category: "Cycling",
    distance: "5 km",
    price: "$100 USD",
    terrain: "Mountains",
    participants: 15000,
    season: "Winter",
    imageUrl:
      "https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Search global races easily on our interactive map, join event communities.",
  },
  {
    id: "2",
    title: "Berlin Marathon",
    location: {
      city: "Berlin",
      country: "Germany",
      coordinates: [13.405, 52.52],
    },
    date: "12-15 Sep, 2025",
    category: "Running",
    distance: "42 km",
    price: "$120 USD",
    terrain: "Urban",
    participants: 45000,
    season: "Fall",
    imageUrl:
      "https://images.pexels.com/photos/2530129/pexels-photo-2530129.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Search global races easily on our interactive map, join event communities.",
  },
  {
    id: "3",
    title: "Sydney Ocean Swim",
    location: {
      city: "Sydney",
      country: "Australia",
      coordinates: [151.2093, -33.8688],
    },
    date: "3-5 Jan, 2026",
    category: "Swimming",
    distance: "3 km",
    price: "$85 USD",
    terrain: "Ocean",
    participants: 2000,
    season: "Summer",
    imageUrl:
      "https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Search global races easily on our interactive map, join event communities.",
  },
  {
    id: "4",
    title: "Virtual Global Run Challenge",
    location: {
      city: "Any Location",
      country: "Worldwide",
      coordinates: [0, 0],
    },
    date: "1-30 Nov, 2025",
    category: "Running",
    distance: "10 km",
    price: "$30 USD",
    terrain: "Any",
    participants: 75000,
    season: "Any",
    imageUrl:
      "https://images.pexels.com/photos/3760610/pexels-photo-3760610.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Search global races easily on our interactive map, join event communities.",
  },
];
