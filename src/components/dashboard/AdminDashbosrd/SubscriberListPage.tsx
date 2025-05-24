"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Mail } from "lucide-react";

interface Subscriber {
  id: number;
  email: string;
  subscribeDate: string;
  status: "active" | "inactive";
}

const SubscriberListPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(6);
  const totalPages = 10;
  const itemsPerPage = 5;

  // Mock subscriber data
  const subscribers: Subscriber[] = [
    {
      id: 1,
      email: "khan@autox.de",
      subscribeDate: "2025-01-15",
      status: "active",
    },
    {
      id: 2,
      email: "khan@autox.de",
      subscribeDate: "2025-01-14",
      status: "active",
    },
    {
      id: 3,
      email: "khan@autox.de",
      subscribeDate: "2025-01-13",
      status: "active",
    },
    {
      id: 4,
      email: "khan@autox.de",
      subscribeDate: "2025-01-12",
      status: "active",
    },
    {
      id: 5,
      email: "khan@autox.de",
      subscribeDate: "2025-01-11",
      status: "active",
    },
  ];

  const handleMailNow = (email: string) => {
    console.log(`Sending mail to: ${email}`);
    // Add your mail sending logic here
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      console.log(`Changed to page: ${page}`);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, startPage + 4);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Subscribers List
        </h1>
      </div>

      {/* Table */}
      <div className="overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-0 text-xl font-medium text-gray-800">
                Email
              </th>
              <th className="text-right py-4 px-0 text-xl font-medium text-gray-800">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subscribers.map((subscriber) => (
              <tr
                key={subscriber.id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-0">
                  <span className="text-gray-700">{subscriber.email}</span>
                </td>
                <td className="py-4 px-0 text-right">
                  <button
                    onClick={() => handleMailNow(subscriber.email)}
                    className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary/80 text-white text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    <Mail className="h-4 w-4 mr-1" />
                    Mail now
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-8">
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>

          {/* Page Numbers */}
          {getVisiblePages().map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentPage === page
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-6 text-center text-sm text-gray-500">
        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
        {Math.min(currentPage * itemsPerPage, subscribers.length * totalPages)}{" "}
        of {subscribers.length * totalPages} subscribers
      </div>
    </div>
  );
};

export default SubscriberListPage;
