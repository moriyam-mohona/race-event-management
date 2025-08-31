/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { MapPin, Calendar, Activity, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { FaRegBookmark } from "react-icons/fa";
import { useAddEventToSavedMutation } from "@/redux/features/event/eventApi";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import image from "@/assets/event.png";
import "mapbox-gl/dist/mapbox-gl.css";

// Set your Mapbox token here
mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "YOUR_MAPBOX_TOKEN";

const MapView: React.FC<any> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const user = useAppSelector(selectCurrentUser);
  const [addEventToSaved] = useAddEventToSavedMutation();
  const router = useRouter();

  const handleAddToBookmark = async (eventId: string) => {
    await handleAsyncWithToast(() => addEventToSaved(eventId));
    if (!user) {
      router.push("/auth/login");
    }
  };

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [0, 20],
      zoom: 2,
    });

    // Add navigation control (optional)
    map.current.addControl(new mapboxgl.NavigationControl());

    // Clean up on unmount
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  // Add markers when events data is available
  useEffect(() => {
    if (!map.current || !events?.data?.data) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    // Add markers for each event
    events.data.data.forEach((event: any) => {
      // Check if event has location with coordinates
      if (!event?.location?.coordinates) {
        console.warn("Event missing coordinates:", event.title);
        return;
      }

      const [lng, lat] = event.location.coordinates;

      // Create a DOM element for the marker
      const el = document.createElement("div");
      el.className = "marker cursor-pointer";
      el.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';

      // Create the marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .addTo(map.current!);

      // Add click event - use a more reliable approach
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelectedEvent(event);
      });

      // Also add click event to the marker itself as backup
      marker.getElement().addEventListener("click", (e) => {
        e.stopPropagation();
        setSelectedEvent(event);
      });

      markersRef.current.push(marker);
    });

    // Store the handler so it can be removed later
    const mapClickHandler = () => {
      setSelectedEvent(null);
    };

    // Add click event to map to close popup when clicking elsewhere
    if (map.current) {
      map.current.on("click", mapClickHandler);
    }

    // Clean up markers on unmount or when events change
    return () => {
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      if (map.current) {
        map.current.off("click", mapClickHandler);
      }
    };
  }, [events]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const popup = document.querySelector(".map-popup");
      if (popup && !popup.contains(event.target as Node)) {
        setSelectedEvent(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!events?.data?.data) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading events...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full relative rounded-lg overflow-hidden">
      <div ref={mapContainer} className="h-full w-full" />

      {selectedEvent && (
        <div className="map-popup absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-10 border border-gray-100 w-80">
          {/* Image */}
          <div className="w-full overflow-hidden mb-3">
            <Image
              src={selectedEvent?.eventImages || image}
              alt={selectedEvent?.title}
              width={300}
              height={200}
              className="w-full h-40 object-cover rounded-lg"
            />
          </div>

          {/* Header with title and bookmark */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold font-montserrat text-lg text-gray-800 pr-2">
              {selectedEvent?.title}
            </h3>
            <div className="flex items-center gap-2">
              {user?.role === "USER" && (
                <button
                  onClick={() => handleAddToBookmark(selectedEvent?._id?.$oid)}
                  className="cursor-pointer"
                >
                  <FaRegBookmark
                    className={`text-xl font-semibold ${
                      !user
                        ? "text-gray-700"
                        : selectedEvent?.isSaved
                        ? "text-secondary"
                        : "text-gray-700"
                    }`}
                  />
                </button>
              )}
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Event details */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center">
              <MapPin size={16} className="text-secondary mr-3 flex-shrink-0" />
              <span className="text-gray-700 text-sm">
                {selectedEvent?.address}
              </span>
            </div>
            <div className="flex items-center">
              <Calendar
                size={16}
                className="text-secondary mr-3 flex-shrink-0"
              />
              <span className="text-gray-700 text-sm">
                {selectedEvent?.startDate?.$date &&
                selectedEvent?.endDate?.$date
                  ? `${format(
                      new Date(selectedEvent.startDate.$date),
                      "d"
                    )}-${format(
                      new Date(selectedEvent.endDate.$date),
                      "d MMM, yyyy"
                    )}`
                  : ""}
              </span>
            </div>
            <div className="flex items-center">
              <Activity
                size={16}
                className="text-secondary mr-3 flex-shrink-0"
              />
              <span className="text-gray-700 text-sm">
                {selectedEvent?.category} ({selectedEvent?.distance} Km)
              </span>
            </div>
            <p className="text-gray-700 text-lg font-medium mt-2">
              ${selectedEvent?.price} USD
            </p>
            <p className="text-gray-700 text-sm mt-2">
              {selectedEvent?.description?.split(" ").slice(0, 15).join(" ")}
              {selectedEvent?.description?.split(" ").length > 15 ? "..." : ""}
            </p>
          </div>

          {/* Details button */}
          <div className="flex justify-end">
            <Link
              href={`/race-categories/${selectedEvent?._id?.$oid}`}
              className="bg-transparent hover:bg-primary text-primary hover:text-white border border-primary px-4 py-2 rounded text-sm transition-colors duration-200"
            >
              Details
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
