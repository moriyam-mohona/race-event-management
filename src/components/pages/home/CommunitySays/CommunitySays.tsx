"use client";

import SectionHeader from "@/components/shared/SectionHeader/SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ReviewCard from "@/components/cards/ReviewCard";
import profile from "@/assets/profile.png";
import { Review } from "@/types/Common";
const CommunitySays = () => {
  const reviews: Review[] = [
    {
      id: "1",
      name: "Juliya Rara",
      location: "New York, UK",
      review:
        "Absolutely amazing experience! The staff were kind, the ambiance was peaceful, and I left feeling completely refreshed. Highly recommend",
      avatar: profile,
    },
    {
      id: "2",
      name: "Michael Johnson",
      location: "London, UK",
      review:
        "The marathon was incredibly well organized. The route was scenic and challenging in all the right ways. Will definitely be back next year!",
      avatar: profile,
    },
    {
      id: "3",
      name: "Sarah Williams",
      location: "Berlin, Germany",
      review:
        "As a first-time triathlete, I was nervous, but the community was so supportive. The event staff made everything easy to navigate.",
      avatar: profile,
    },
    {
      id: "4",
      name: "David Chen",
      location: "Toronto, Canada",
      review:
        "The cycling event exceeded all my expectations. Beautiful routes, excellent support stations, and a fantastic atmosphere throughout.",
      avatar: profile,
    },
    {
      id: "5",
      name: "Emma Rodriguez",
      location: "Barcelona, Spain",
      review:
        "I've participated in many races, but this one stands out for its community feel and attention to detail. The post-race celebration was fantastic!",
      avatar: profile,
    },
    {
      id: "6",
      name: "James Wilson",
      location: "Sydney, Australia",
      review:
        "From registration to the finish line, everything was seamless. The digital resources and race day support were top-notch.",
      avatar: profile,
    },
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <SectionHeader title="Community Says" />

      <div className="relative mt-12">
        {swiperReady && (
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
              1440: { slidesPerView: 3 },
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Navigation Buttons */}
        <button
          ref={prevRef}
          className="absolute -left-0 top-40 -translate-y-1/2 z-10 p-2 bg-gray-500/20 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
          aria-label="Previous reviews"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>

        <button
          ref={nextRef}
          className="absolute -right-0 top-40 -translate-y-1/2 z-10 p-2 bg-gray-500/20 rounded-full shadow-lg hover:bg-gray-50 transition-colors duration-200"
          aria-label="Next reviews"
        >
          <ChevronRight className="w-6 h-6 text-gray-600" />
        </button>
      </div>
    </div>
  );
};

export default CommunitySays;
