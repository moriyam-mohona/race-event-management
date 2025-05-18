"use client";

import banner from "@/assets/images/home/hero.png";
const Banner = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[850px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${banner.src})`,
            backgroundPosition: "center 20%",
          }}
        ></div>

        {/* Content */}
        <div className="relative container max-w-[1320px] mx-auto px-4 h-full">
          <div className="flex flex-col justify-end h-full pt-20 pb-40">
            <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-orange-50 max-w-3xl leading-16">
              The Journey starts With us -
              <span className="text-orange-500"> Lace Up & Turn Up</span>
            </h1>

            <p className="mt-6 font-light text-lg text-gray-200 max-w-2xl">
              Whether its you&apos;re first 5k, running or trekking trails in
              the Dolomites, cycling coast to coast in the USA, or diving into
              your first ultra, in or out of the water - we bring racers,
              explorers, travel planning, and community spirit together in one
              place.
            </p>

            {/* Search Form */}
            <div className="mt-10">
              <div className="flex flex-col sm:flex-row gap-4 max-w-6xl bg-black/20 backdrop-blur-md p-6 rounded-lg">
                <div className="flex-1">
                  <select
                    className="w-full px-4 py-3 rounded-md border text-white placeholder-gray-500 focus:ring-2 focus:ring-primary"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Race type
                    </option>
                    <option value="5k" className="bg-transparent text-black">
                      5K Run
                    </option>
                    <option value="10k" className="bg-transparent text-black">
                      10K Run
                    </option>
                    <option value="half" className="bg-transparent text-black">
                      Half Marathon
                    </option>
                    <option value="full" className="bg-transparent text-black">
                      Full Marathon
                    </option>
                    <option value="ultra" className="bg-transparent text-black">
                      Ultra Marathon
                    </option>
                    <option value="trail" className="bg-transparent text-black">
                      Trail Running
                    </option>
                    <option
                      value="triathlon"
                      className="bg-transparent text-black"
                    >
                      Triathlon
                    </option>
                  </select>
                </div>

                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Location"
                    className="w-full px-4 py-3 rounded-md border text-white focus:ring-2 focus:ring-primary placeholder:text-white"
                  />
                </div>

                <div className="flex-1">
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-md border text-white placeholder-white focus:ring-2 focus:ring-primary "
                  />
                </div>

                <button className="px-8 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/80 transition-colors duration-300 whitespace-nowrap">
                  Explore Race
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
