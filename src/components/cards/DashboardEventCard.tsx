import { CalendarIcon, Clock, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { EventProps } from "@/types/Common";
import Image from "next/image";

const DashboardEventCard = ({ event }: { event: EventProps }) => {
  const isUpcoming = event.status === "upcoming";

  return (
    <div className="flex overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          width={1000}
          height={1000}
          className="h-full w-full object-cover transition-transform hover:scale-105"
        />
      </div>

      <div>
        <CardHeader className="p-4 pb-0">
          <div className="flex items-center justify-between">
            <button className="font-normal">{event.category}</button>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Users size={14} />
              <span>{event.attendees}</span>
            </div>
          </div>
          <h3 className="mt-2 line-clamp-1 text-xl font-semibold">
            {event.title}
          </h3>
        </CardHeader>

        <CardContent className="p-4 pt-2">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {event.description}
          </p>

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CalendarIcon size={14} className="text-muted-foreground" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock size={14} className="text-muted-foreground" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin size={14} className="text-muted-foreground" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            className={`w-full ${
              isUpcoming ? "" : "bg-gray-500 hover:bg-gray-600"
            }`}
            variant={isUpcoming ? "default" : "secondary"}
          >
            {isUpcoming ? "Register Now" : "View Details"}
          </Button>
        </CardFooter>
      </div>
    </div>
  );
};

export default DashboardEventCard;
