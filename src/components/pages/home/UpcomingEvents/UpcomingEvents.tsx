/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import EventCard from "@/components/cards/EventCard";
import { Event } from "@/types/Common";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useGetAllApprovedEventsQuery } from "@/redux/features/event/eventApi";

const UpcomingEvents: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  const { data: approvedEvent } = useGetAllApprovedEventsQuery({});
  console.log(approvedEvent);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      swiperRef.current.params.navigation
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);
  return (
    <section className="py-20 px-4 bg-green-50">
      <div className=" mx-auto max-w-[1320px]">
        <SectionHeader
          title="Upcoming Events"
          description="Looking for something soon— open to where the journey takes you? Discover, plan, connect, lend a hand, and share the experience - the spirit of adventure like never before."
        />

        <div className="relative mt-12">
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
          >
            {approvedEvent?.data?.data?.map((event: Event) => (
              <SwiperSlide key={event?._id?.$oid}>
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
