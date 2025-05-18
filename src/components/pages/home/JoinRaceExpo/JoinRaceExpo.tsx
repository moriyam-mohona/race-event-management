"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { Expo } from "@/types/Common";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import event from "@/assets/event.png";
import ExpoCard from "@/components/cards/ExpoCard";

const events: Expo[] = [
  {
    id: "1",
    title: "Generali Malaga Marathon",
    location: "New York, United Kingdom",
    date: "8-10 Aug, 2025",
    category: "Cycling",
    price: 100,
    currency: "USD",
    imageUrl: event,
    description:
      "Search global races easily on our interactive map, join event communities.",
    vendorName: "Generali",
    gears: ["Sprint", "Road", "MTB"],
  },
  {
    id: "2",
    title: "Istanbul Marathon",
    location: "New York, United Kingdom",
    date: "8-10 Aug, 2025",
    category: "Swimming",
    price: 100,
    currency: "USD",
    imageUrl: event,
    description:
      "Search global races easily on our interactive map, join event communities.",
    vendorName: "Generali",
    gears: ["Sprint", "Road", "MTB"],
  },
  {
    id: "3",
    title: "Istanbul Marathon",
    location: "New York, United Kingdom",
    date: "8-10 Aug, 2025",
    category: "Swimming",
    price: 100,
    currency: "USD",
    imageUrl: event,
    description:
      "Search global races easily on our interactive map, join event communities.",
    vendorName: "Generali",
    gears: ["Sprint", "Road", "MTB"],
  },
  {
    id: "4",
    title: "Glendalough Lap of the Gap Marathon",
    location: "New York, United Kingdom",
    date: "8-10 Aug, 2025",
    category: "Cycling",
    price: 100,
    currency: "USD",
    imageUrl: event,
    description:
      "Search global races easily on our interactive map, join event communities.",
    vendorName: "Generali",
    gears: ["Sprint", "Road", "MTB"],
  },
  {
    id: "5",
    title: "Glendalough Lap of the Gap Marathon",
    location: "New York, United Kingdom",
    date: "8-10 Aug, 2025",
    category: "Cycling",
    price: 100,
    currency: "USD",
    imageUrl: event,
    description:
      "Search global races easily on our interactive map, join event communities.",
    vendorName: "Generali",
    gears: ["Sprint", "Road", "MTB"],
  },
  {
    id: "6",
    title: "Glendalough Lap of the Gap Marathon",
    location: "New York, United Kingdom",
    date: "8-10 Aug, 2025",
    category: "Cycling",
    price: 100,
    currency: "USD",
    imageUrl: event,
    description:
      "Search global races easily on our interactive map, join event communities.",
    vendorName: "Generali",
    gears: ["Sprint", "Road", "MTB"],
  },
];

const JoinRaceExpo: React.FC = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Join Our Race Expo "
          description="Join the DustiTrainers Virtual Expo to discover top gear, nutrition, travel tips, and race-day essentials — all in one dynamic experience!"
        />

        <div className="relative mt-12">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
          >
            {events.map((event) => (
              <SwiperSlide key={event.id}>
                <ExpoCard event={event} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <button
            ref={prevRef}
            className="absolute -left-0 top-48 -translate-y-1/2 z-10 p-2 bg-white/70 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
            aria-label="Previous events"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            ref={nextRef}
            className="absolute -right-0 top-48 -translate-y-1/2 z-10 p-2 bg-white/70 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
            aria-label="Next events"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default JoinRaceExpo;
