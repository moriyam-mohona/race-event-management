"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  completeEvent,
  resetEvent,
  prevStep,
} from "@/redux/features/event/eventSlice";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PublishEvent = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const eventData = useAppSelector((state) => state.event);

  const handleSubmit = () => {
    dispatch(completeEvent());

    // Log all data to console as requested
    console.log("Final Event Data:", eventData);

    // Show success message
    alert("Event created successfully!");

    // Reset form and redirect
    dispatch(resetEvent());
    router.push("/");
  };

  const handleBack = () => {
    dispatch(prevStep());
  };

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-medium">Create Event</h2>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Edit</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border space-y-8">
          {/* Event Details */}
          <div>
            <h3 className="text-lg font-medium mb-4">Event & Race Title</h3>
            <h4 className="text-xl font-bold">{eventData.title}</h4>
            <p className="mt-2 text-gray-700">{eventData.description}</p>
          </div>

          {/* Date & Time */}
          <div>
            <h3 className="text-lg font-medium mb-4">Set Date & Time</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">{eventData.startDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">End Date</p>
                <p className="font-medium">{eventData.endDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-medium">{eventData.timezone}</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-medium mb-4">Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{eventData.address}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Country</p>
                <p className="font-medium">{eventData.country}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Region</p>
                <p className="font-medium">{eventData.region}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">City</p>
                <p className="font-medium">{eventData.city}</p>
              </div>
            </div>
          </div>

          {/* Race Category */}
          <div>
            <h3 className="text-lg font-medium mb-4">Race Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{eventData.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Venue Type</p>
                <p className="font-medium">{eventData.venue}</p>
              </div>
            </div>
          </div>

          {/* Race Data */}
          <div>
            <h3 className="text-lg font-medium mb-4">Race Data</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Race Type</p>
                <p className="font-medium">{eventData.raceType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Distance</p>
                <p className="font-medium">{eventData.distance}</p>
              </div>
            </div>
          </div>

          {/* Age Limit */}
          <div>
            <h3 className="text-lg font-medium mb-4">Age Limit</h3>
            <p className="font-medium">{eventData.ageLimit}</p>
          </div>

          {/* Needed Gear */}
          {eventData.gearItems.length > 0 && (
            <div>
              <h3 className="text-lg font-medium mb-4">Needed gear</h3>
              <div className="space-y-4">
                {eventData.gearItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center p-4 border rounded-lg bg-gray-50"
                  >
                    <div className="flex-shrink-0 mr-4">
                      <Image
                        src={
                          item.image || "/placeholder.svg?height=60&width=60"
                        }
                        alt={item.title}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.category}</p>
                      <p className="font-medium">${item.price} USD</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <Button onClick={handleBack} variant="outline">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-600"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default PublishEvent;
