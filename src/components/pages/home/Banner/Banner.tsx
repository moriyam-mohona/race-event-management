"use client";
import banner from "@/assets/images/home/hero.png";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

// Shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
const Banner = () => {
  const [raceType, setRaceType] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative min-h-[850px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${banner.src})`,
            backgroundPosition: "center 20%",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",

            zIndex: -1,
          }}
        />

        {/* Content */}
        <div className="relative container max-w-[1320px] mx-auto px-4 h-full">
          <div className="flex flex-col justify-end h-full pt-40 md:pt-72 pb-40">
            <h1 className="font-montserrat text-4xl md:text-5xl lg:text-6xl font-bold text-orange-50 max-w-3xl md:leading-16">
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
                  <Select value={raceType} onValueChange={setRaceType}>
                    <SelectTrigger className="w-full h-11 bg-transparent border text-white focus:ring-2 focus:ring-primary [&_[data-placeholder]]:text-white">
                      <SelectValue placeholder="Race type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Hybrid">Hybrid</SelectItem>
                      <SelectItem value="On site">On site</SelectItem>
                      <SelectItem value="Virtual">Virtual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full h-11 bg-transparent border text-white focus:ring-2 focus:ring-primary placeholder:text-white"
                  />
                </div>

                <div className="flex-1">
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
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <Button className="h-11 px-8 bg-primary text-white rounded-md font-medium hover:bg-primary/80 transition-colors duration-300 whitespace-nowrap">
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
