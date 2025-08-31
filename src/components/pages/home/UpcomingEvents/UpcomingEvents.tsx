/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventCard from "@/components/cards/EventCard";
import { Event } from "@/types/Common";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useGetAllApprovedEventsQuery } from "@/redux/features/event/eventApi";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";

const UpcomingEvents: React.FC = () => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const swiperRef = useRef<any>(null);

  // Fetch Data
  const { data: approvedEvent } = useGetAllApprovedEventsQuery({});

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

  // Memoize Swiper slides
  const slides = useMemo(() => {
    return approvedEvent?.data?.data?.map((event: Event) => (
      <SwiperSlide key={event?._id?.$oid}>
        <EventCard event={event} />
      </SwiperSlide>
    ));
  }, [approvedEvent?.data?.data]);

  return (
    <section className="py-20 bg-green-50">
      <div className=" mx-auto max-w-[1320px]">
        <div className="mx-auto mb-12 px-4">
          <div className="flex flex-row items-center justify-between gap-4 md:gap-0 mb-6">
            <h2 className="w-full font-montserrat text-[25px] lg:text-[40px] font-semibold text-gray-900">
              Upcoming Events
            </h2>
            <Link
              href="/race-categories"
              className="w-full max-w-[120px] md:max-w-32 inline-flex items-center gap-2 bg-primary text-white font-medium px-5 py-2 rounded-lg shadow-md hover:bg-primary/90 hover:shadow-lg transition-all duration-200 text-sm md:text-base"
            >
              See All <GoArrowRight className="w-5 h-5" />
            </Link>
          </div>
          <p className="mx-auto text-gray-600 text-base md:text-lg leading-relaxed">
            Looking for something soon—open to where the journey takes you?
            Discover, plan, connect, lend a hand, and share the experience — the
            spirit of adventure like never before.
          </p>
        </div>

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
            {/* {approvedEvent?.data?.data?.map((event: Event) => (
              <SwiperSlide key={event?._id?.$oid}>
                <EventCard event={event} />
              </SwiperSlide>
            ))} */}
            {slides}
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
