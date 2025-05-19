import { Bookmark } from "lucide-react";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";
import { GiCycling } from "react-icons/gi";
import { PiMountainsLight } from "react-icons/pi";
import { SiStreamrunners } from "react-icons/si";
import { TiWeatherWindy } from "react-icons/ti";
import { IoLocationOutline } from "react-icons/io5";
import { T_Event } from "@/types/Events";

export function EventHeader({
  title,
  eventImage,
  location,
  date,
  eventType,
  venueType,
  participants,
  season,
  price,
  registration,
}: T_Event) {
  return (
    <div className="flex flex-col md:flex-row gap-6 mb-8">
      <div className="md:w-1/3">
        <Image
          src={eventImage}
          alt={title}
          width={1000}
          height={1000}
          className="w-[486px] h-[443px] rounded-lg object-cover"
        />
      </div>
      <div className="md:w-2/3 space-y-4">
        <div className="flex justify-between items-start ">
          <div className="flex items-center gap-4">
            <p className="font-semibold">Registered From : </p>
            <p className="text-gray-600">
              Your location ·
              <span className="font-semibold text-black">
                {" "}
                {registration.hostLocation} |{" "}
              </span>
            </p>
            <p className="text-gray-600">
              Hosted country ·
              <span className="font-semibold text-black">
                {" "}
                {registration.hostCountry} |{" "}
              </span>
            </p>
            <p className="text-gray-600">
              Entryfy ·{" "}
              <span className="font-semibold text-black">
                {registration.entryFee}
              </span>
            </p>
          </div>
        </div>

        <div className="flex justify-between items-center ">
          <h1 className="text-3xl font-semibold">{title}</h1>
          <Bookmark className="h-6 w-6" />
        </div>

        <div className="mt-8 space-y-2">
          {/* Location  */}
          <div className="flex items-center gap-3">
            <IoLocationOutline className="w-6 h-6 text-secondary/80" />

            <span className="font-medium text-gray-600">
              {location.city}, {location.country}
            </span>
          </div>
          {/* Date  */}
          <div className="flex items-center gap-4">
            <SlCalender className="w-5 h-5 text-secondary/80" />
            <span className="font-medium text-gray-600">{date}</span>
          </div>
          <div className="flex items-center gap-4">
            <GiCycling className="w-5 h-5 text-secondary/80" />
            <span className="font-medium text-gray-600">{eventType}</span>
          </div>
          <div className="flex items-center gap-4">
            <TiWeatherWindy className="w-5 h-5 text-secondary/80" />

            <span className="font-medium text-gray-600">{season}</span>
          </div>
          <div className="flex items-center gap-4">
            <PiMountainsLight className="w-5 h-5 text-secondary/80" />

            <span className="font-medium text-gray-600">{venueType}</span>
          </div>
          <div className="flex items-center gap-4">
            <SiStreamrunners className="w-5 h-5 text-secondary/80" />
            <span className="font-medium text-gray-600">{participants}</span>
          </div>

          <div className="mt-10">
            <p className="text-xl font-semibold text-gray-700">{price}</p>
          </div>

          <div className="flex gap-3 mt-4">
            <button className="border border-primary text-primary hover:bg-primary hover:text-white px-8 py-2 rounded-lg text-lg">
              Community
            </button>
            <button className="hover:border hover:border-primary hover:bg-primary/20 hover:text-primary bg-primary text-white px-8 py-2 rounded-lg text-lg">
              Register Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
