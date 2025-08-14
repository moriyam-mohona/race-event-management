"use client";

import banner from "@/assets/images/home/hero.jpg";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/navigation";
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";

const Banner: React.FC = () => {
  const geocodingClient = mbxGeocoding({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN!,
  });
  const [location, setLocation] = useState<string>("");
  const [locationDetails, setLocationDetails] = useState<{
    continent?: string;
    country?: string;
    region?: string;
    latitude?: number;
    longitude?: number;
  } | null>(null);

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const router = useRouter();

  const options = [
    { label: "Hybrid", value: "HYBRID" },
    { label: "On Site", value: "ON_SITE" },
    { label: "Virtual", value: "VIRTUAL" },
    { label: "Shared", value: "SHARED" },
  ];

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const handleLocationSelect = async (query: string) => {
    setLocation(query);

    const response = await geocodingClient
      .forwardGeocode({
        query,
        limit: 1,
      })
      .send();

    const feature = response.body.features[0];
    if (feature) {
      setLocationDetails({
        continent: feature.context?.find((c) => c.id.startsWith("continent"))
          ?.text,
        country: feature.context?.find((c) => c.id.startsWith("country"))?.text,
        region: feature.context?.find((c) => c.id.startsWith("region"))?.text,
        latitude: feature.center[1],
        longitude: feature.center[0],
      });
    }
  };

  const handleSearch = () => {
    const query: Record<string, string> = {};
    if (selectedOption) query.raceType = selectedOption;
    if (locationDetails) {
      query.continent = locationDetails.continent || "";
      query.country = locationDetails.country || "";
      query.region = locationDetails.region || "";
      query.lat = locationDetails.latitude?.toString() || "";
      query.lng = locationDetails.longitude?.toString() || "";
    }
    if (date) query.date = format(date, "dd-MM-yyyy");

    const queryString = new URLSearchParams(query).toString();
    router.push(`/race-categories?${queryString}`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-[450px] max-h-[800px] xl:min-h-[850px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 lg:bg-center object-left bg-top-left bg-cover"
          style={{
            backgroundImage: `url(${banner.src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            zIndex: -1,
          }}
        />

        {/* Content */}
        <div className="relative container max-w-[1320px] mx-auto px-4 h-full">
          <div className="flex flex-col justify-end h-full pt-40 md:pt-48 xl:pt-72 pb-40">
            <h1 className="font-montserrat text-4xl md:text-5xl lg:text-5xl font-bold text-orange-50 max-w-3xl md:leading-16">
              The Journey starts With us -{" "}
              <span className="text-orange-500">Lace Up & Turn Up</span>
            </h1>

            <p className="mt-6 font-light text-sm lg:text-lg text-gray-200 max-w-2xl">
              Whether it&apos;s your first 5k, running or trekking trails in the
              Dolomites, cycling coast to coast in the USA, or diving into your
              first ultra, in or out of the water - we bring racers, explorers,
              travel planning, and community spirit together in one place.
            </p>

            {/* Search Form */}
            <div className="mt-10">
              <div className="flex flex-col sm:flex-row gap-4 max-w-6xl bg-black/20 backdrop-blur-md p-6 rounded-lg w-full">
                {/* Race Type */}
                <div className="flex-1 relative w-full">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-center px-4 py-3 border rounded-md text-white text-light text-sm shadow-sm hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <span className="text-white">
                      {selectedOption || "Race type"}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-10 mt-2 w-full bg-white border rounded-md shadow-lg overflow-hidden"
                      >
                        {options.map((option) => (
                          <li
                            key={option.value} // use value as key
                            onClick={() => handleSelect(option.value)}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          >
                            {option.label} {/* display the label */}
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>

                {/* Location */}
                <div className="flex-1 w-full">
                  <Input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => handleLocationSelect(e.target.value)} // <--- use handleLocationSelect here
                    className="w-full h-11 bg-transparent border text-white focus:ring-2 focus:ring-primary placeholder:text-white"
                  />
                </div>

                {/* Date */}
                <div className="flex-1 w-full">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full h-11 bg-transparent border text-white focus:ring-2 focus:ring-primary justify-start font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Select date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="w-auto bg-white/80 shadow-2xl backdrop-blur-md rounded-lg"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Search Button */}
                <Button
                  className="h-11 px-8 bg-primary text-white rounded-md font-medium hover:bg-primary/80 transition-colors duration-300 whitespace-nowrap"
                  onClick={handleSearch}
                >
                  Explore Race
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
