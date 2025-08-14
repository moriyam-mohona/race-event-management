/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { MapPin, Calendar, Activity, Bookmark } from "lucide-react";
import { RaceEvent } from "@/types/Common";

// interface MapViewProps {
//   events: RaceEvent[];
// }

const containerStyle = {
  width: "100%",
  height: "100%",
};

const defaultCenter = {
  lat: 20,
  lng: 0,
};

const MapView: React.FC<any> = ({ events }) => {
  const [selectedEvent, setSelectedEvent] = useState<RaceEvent | null>(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // 🔒 Replace with your real key
  });

  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="h-full w-full relative rounded-lg overflow-hidden">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={defaultCenter}
        zoom={2}
        options={{
          styles: [
            {
              elementType: "geometry",
              stylers: [{ color: "#242f3e" }],
            },
            {
              elementType: "labels.text.stroke",
              stylers: [{ color: "#242f3e" }],
            },
            {
              elementType: "labels.text.fill",
              stylers: [{ color: "#746855" }],
            },
          ],
        }}
      >
        {/* {events?.data?.data.map((event: any) => ( */}
        {events?.data?.data.map((event: any) => (
          <Marker
            key={event?.id}
            position={{
              lat: event?.location?.coordinates[1],
              lng: event?.location?.coordinates[0],
            }}
            onClick={() => setSelectedEvent(event)}
          />
        ))}
      </GoogleMap>

      {selectedEvent && (
        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 max-w-sm">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-sm">{selectedEvent.title}</h3>
            <button
              onClick={() => setSelectedEvent(null)}
              className="text-gray-500 hover:text-yellow-500"
            >
              <Bookmark size={16} />
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
