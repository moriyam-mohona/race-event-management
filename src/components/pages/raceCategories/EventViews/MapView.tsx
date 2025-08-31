/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { MapPin, Calendar, Activity, X } from "lucide-react";
import { RaceEvent } from "@/types/Common";
import "mapbox-gl/dist/mapbox-gl.css";

// Set your Mapbox token here
mapboxgl.accessToken =
  process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "YOUR_MAPBOX_TOKEN";

const MapView: React.FC<any> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<RaceEvent | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

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
    const markers: mapboxgl.Marker[] = [];

    // Add markers for each event
    events.data.data.forEach((event: any) => {
      if (!event?.location?.coordinates) return;

      const [lng, lat] = event.location.coordinates;

      // Create a DOM element for the marker
      const el = document.createElement("div");
      el.className = "marker";
      el.innerHTML =
        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="red" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>';
      el.style.cursor = "pointer";

      // Create the marker
      const marker = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .addTo(map.current!);

      // Add click event
      marker.getElement().addEventListener("click", () => {
        setSelectedEvent(event);
      });

      markers.push(marker);
    });

    // Clean up markers on unmount or when events change
    return () => {
      markers.forEach((marker) => marker.remove());
    };
  }, [events]);

  return (
    <div className="h-full w-full relative rounded-lg overflow-hidden">
      <div ref={mapContainer} className="h-full w-full" />

      {selectedEvent && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm z-10">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-sm">{selectedEvent.title}</h3>
            <button
              onClick={() => setSelectedEvent(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={16} />
            </button>
          </div>

          <div className="text-xs mt-2 space-y-1">
            <div className="flex items-center">
              <MapPin size={12} className="text-gray-500 mr-1" />
              <span>
                {selectedEvent.location.city}, {selectedEvent.location.country}
              </span>
            </div>
            <div className="flex items-center">
              <Calendar size={12} className="text-gray-500 mr-1" />
              <span>{selectedEvent.date}</span>
            </div>
            <div className="flex items-center">
              <Activity size={12} className="text-gray-500 mr-1" />
              <span>
                {selectedEvent.category} ({selectedEvent.distance})
              </span>
            </div>
          </div>

          <div className="mt-3">
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-3 py-1 rounded transition-colors duration-200 w-full">
              Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
