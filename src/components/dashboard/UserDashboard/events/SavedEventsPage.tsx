/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import EventViewCard from "@/components/cards/EventViewCard";
import Loading from "@/components/shared/Loading/Loading";
import { useGetAllSavedEventsQuery } from "@/redux/features/event/eventApi";
import Link from "next/link";

const SavedEventsPage = () => {
  const {
    data: savedEvents,
    isLoading,
    isError,
    error,
  } = useGetAllSavedEventsQuery({});

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>Failed to load saved events.</p>
        <pre className="text-xs text-gray-400">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  const events = savedEvents?.data?.data ?? [];

  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 mb-4 text-gray-300 animate-pulse"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 17v-2a4 4 0 018 0v2m1 0a2 2 0 002 2H6a2 2 0 002-2m6-10V7a4 4 0 10-8 0v2"
          />
        </svg>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          No Saved Events Found
        </h2>
        <p className="text-gray-400">You have not saved any events yet.</p>
        <Link href="/race-categories">Please Browse Events</Link>
      </div>
    );
  }
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-medium mt-4 mb-8">
        Saved Race List
      </h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((saved: any) => (
          <EventViewCard key={saved?.id} event={saved?.events} />
        ))}
      </div>
    </div>
  );
};

export default SavedEventsPage;
