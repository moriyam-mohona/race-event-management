import { MapPin, Calendar } from "lucide-react";
import { Expo } from "@/types/Common";
import Image from "next/image";
import profile from "@/assets/profile.png";
import geat_img from "@/assets/gears.png";
import Link from "next/link";
interface EventCardProps {
  event: Expo;
}

const ExpoCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <div className="border rounded-lg overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="relative">
        <Image
          src={event.imageUrl}
          alt={event.title}
          width={1000}
          height={1000}
          priority
          className="w-full h-48 object-cover"
        />
        <button
          className="absolute top-4 right-4 p-2 bg-white/70 rounded-full hover:bg-white transition-colors duration-200"
          aria-label="Bookmark event"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>

      <div className="px-5 py-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 h-14">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center font-semibold ">
            <Image
              src={profile}
              alt="profile"
              width={1000}
              height={1000}
              className="w-5 h-5 rounded-full mr-2"
            />
            <span>{event.vendorName}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{event.date}</span>
          </div>
        </div>

        <div className="space-y-4 text-gray-600">
          <p className="text-xl font-medium text-gray-800">
            $ {event.price} {event.currency}
          </p>
          <div className="flex items-center">
            <Image
              src={geat_img}
              alt="gears"
              width={1000}
              height={1000}
              className="w-5 h-5 rounded-full mr-2"
            />
            <span className="font-semibold">Needed Gears : {"  "}</span>
            <span>
              {"  "}
              {event?.gears?.map((gear) => gear).join(" | ")}
            </span>
          </div>
          <p className="h-16 *:lg:h-12">{event.description}</p>
        </div>

        <Link
          href={`/race-categories/${event.id}`}
          className="mt-6 px-6 py-2 bg-transparent border border-primary text-primary hover:text-white rounded-md hover:bg-primary transition-colors duration-300"
        >
          See more
        </Link>
      </div>
    </div>
  );
};

export default ExpoCard;
