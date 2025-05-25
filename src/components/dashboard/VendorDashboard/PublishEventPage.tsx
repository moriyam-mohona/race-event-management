"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  completeEvent,
  resetEvent,
  prevStep,
} from "@/redux/features/event/eventSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PublishEvent = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
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
          <h2 className="text-3xl xl:text-4xl font-semibold lg:font-medium mb-6">
            Create Event
          </h2>
          {/* <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Edit</span>
          </div> */}
        </div>

        <div className="space-y-8">
          {/* Event Details */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold mb-4">Event or Expo Title</h3>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 mb-1">Title</h4>
              <p className="text-base text-gray-800">{eventData.title}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">
                Description
              </h4>
              <p className="text-base text-gray-700">{eventData.description}</p>
            </div>
          </div>

          {/* Date & Time */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white mt-6">
            <h3 className="text-xl font-semibold mb-4">Set Date & Time</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Start date
                </p>
                <p className="text-base text-gray-800">{eventData.startDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  End date
                </p>
                <p className="text-base text-gray-800">{eventData.endDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Time</p>
                <p className="text-base text-gray-800">{eventData.timezone}</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white mt-6">
            <h3 className="text-lg font-medium mb-4">Location</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Continent</p>
                <p className="font-medium">{eventData.continent}</p>
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
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{eventData.city}</p>
              </div>
            </div>
          </div>

          {/* Race Category */}
          <div className="border border-gray-200 rounded-lg p-6 bg-white mt-6">
            <h3 className="text-lg font-medium mb-4">Race Category</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{eventData.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-medium">{eventData.event_type}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Site</p>
                <p className="font-medium">{eventData.venue}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Season</p>
                <p className="font-medium">{eventData.season}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Size</p>
                <p className="font-medium">{eventData.size}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium">{eventData.prize}</p>
              </div>
            </div>
          </div>

          {/* Race Start to Finish Address & Distance */}
          <div>
            <h3 className="text-lg font-medium mb-4">
              Race Start to Finish Address & Distance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Race Type</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start address</p>
                <p className="font-medium">{eventData.startAddress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Finish address </p>
                <p className="font-medium">{eventData.finishAddress}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Distance</p>
                <p className="font-medium">{eventData.distance}</p>
              </div>
            </div>
          </div>

          {/* Age Limit */}
          <div>
            <h3 className="text-lg font-medium mb-4">Set Age Limit</h3>
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
        <button
          type="submit"
          onClick={handleBack}
          className="px-6 py-2 border rounded-lg bg-transparent hover:text-white hover:bg-green-900 "
        >
          Back
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-6 py-2 rounded-lg text-white bg-primary hover:bg-primary"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default PublishEvent;
