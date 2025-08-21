import bg from "@/assets/images/home/find-dream-bg.png";
import banner from "@/assets/images/home/find-dream-banner.png";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const FindDreamRace = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-[600px] overflow-hidden flex justify-between  items-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bg.src})`,
            backgroundPosition: "center 20%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
          }}
        />

        {/* Content */}
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-10 h-full w-full flex items-center justify-center">
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 text-white">
            {/* Left Side */}
            <div className="flex flex-col sm:flex-row items-center gap-8 w-full lg:w-2/3">
              <Image
                src={banner}
                alt="Runner in the rain"
                width={1000}
                height={1000}
                className="w-[260px] sm:w-[300px] h-[350px] sm:h-[400px] object-cover rounded-lg"
                priority
              />
              <div className="space-y-6 text-center sm:text-left max-w-md">
                <h2 className="text-2xl sm:text-3xl font-semibold font-montserrat leading-tight">
                  Find your dream race in your destination with the right gear
                </h2>

                <p className="font-light opacity-90 text-sm sm:text-base">
                  Explore top endurance races worldwide, from marathons to
                  triathlons, and choose the perfect destination. Get
                  personalized gear recommendations, travel tips, and exclusive
                  community support to make your race experience unforgettable.
                </p>

                <Link
                  href="/race-categories"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/80 text-white px-6 py-3 rounded transition-colors duration-300 mt-4"
                >
                  Explore more <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Right Side - Stats */}
            <div className="flex flex-col gap-6 w-full lg:w-1/3 mt-8 lg:mt-0 text-center lg:text-left">
              <div className="bg-[#9BE58466] px-6 py-5 rounded-lg">
                <div className="text-3xl sm:text-4xl font-semibold">500+</div>
                <div className="font-light text-base sm:text-lg">
                  Events are running
                </div>
              </div>

              <div className="bg-[#9BE58466] px-6 py-5 rounded-lg">
                <div className="text-3xl sm:text-4xl font-semibold">
                  10,000K+
                </div>
                <div className="font-light text-base sm:text-lg">
                  People are here
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindDreamRace;
