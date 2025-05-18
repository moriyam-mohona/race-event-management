"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import EventCard from "@/components/cards/EventCard";
import { Event } from "@/types/Common";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import event from "@/assets/event.png";

const events: Event[] = [
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
  },
];

const UpcomingEvents: React.FC = () => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <section className="py-20 bg-green-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Upcoming Events"
          description="Looking for something soon— open to where the journey takes you? Discover, plan, connect, lend a hand, and share the experience - the spirit of adventure like never before."
        />

        <div className="relative mt-12">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
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
                <EventCard event={event} />
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

export default UpcomingEvents;
