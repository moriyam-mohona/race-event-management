/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";

const VendorsListPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showActionDropdown, setShowActionDropdown] = useState<number | null>(
    null
  );
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const totalPages = 5;
  const totalVendors = 234;

  // Mock vendor data
  const vendors = [
    {
      id: 1,
      sl: 3532,
      vendorName: "Watson Pitter",
      loginDate: "10 Aug, 2025",
      location: "United State",
      email: "clint@gmail.com",
      events: "00",
      status: "Pending",
    },
    {
      id: 2,
      sl: 3532,
      vendorName: "Watson Pitter",
      loginDate: "10 Aug, 2025",
      location: "United State",
      email: "clint@gmail.com",
      events: "05",
      status: "Approved",
    },
    {
      id: 3,
      sl: 3532,
      vendorName: "Watson Pitter",
      loginDate: "10 Aug, 2025",
      location: "United State",
      email: "clint@gmail.com",
      events: "05",
      status: "Approved",
    },
    {
      id: 4,
      sl: 3532,
      vendorName: "Watson Pitter",
      loginDate: "10 Aug, 2025",
      location: "United State",
      email: "clint@gmail.com",
      events: "05",
      status: "Approved",
    },
    {
      id: 5,
      sl: 3532,
      vendorName: "Watson Pitter",
      loginDate: "10 Aug, 2025",
      location: "United State",
      email: "clint@gmail.com",
      events: "05",
      status: "Approved",
    },
  ];

  const locations = ["United State", "Canada", "United Kingdom"];
  const actionOptions = ["Events", "Approve", "Reject"];

  const handlePageChange = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleActionClick = (action: any, vendorId: string) => {
    console.log(`${action} clicked for vendor ${vendorId}`);
    setShowActionDropdown(null);
  };

  const getStatusColor = (status: string) => {
    return status === "Pending" ? "text-secondary" : "text-gray-600";
  };

  const toggleCardExpansion = (vendorId: string) => {
    setExpandedCard(expandedCard === vendorId ? null : vendorId);
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      !selectedLocation || vendor.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-4xl font-medium text-gray-900">
          {totalVendors} Vendors
        </h1>

        {/* Search and Filter - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
            />
          </div>

          {/* Filter */}
          <div className="relative">
            <button
              onClick={() => setShowLocationFilter(!showLocationFilter)}
              className="w-full sm:w-auto flex items-center justify-center sm:justify-start space-x-2 px-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary text-sm"
            >
              <span className="text-gray-700">Filter by</span>
              <Filter className="h-4 w-4 text-gray-500" />
            </button>

            {showLocationFilter && (
              <>
                {/* Mobile backdrop */}
                <div
                  className="fixed inset-0 bg-black bg-opacity-25 z-20 sm:hidden"
                  onClick={() => setShowLocationFilter(false)}
                />

                {/* Filter dropdown */}
                <div className="absolute right-0 top-full mt-2 w-full sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
                  <div className="p-2">
                    <div className="flex items-center justify-between p-2 sm:hidden border-b border-gray-100">
                      <span className="font-medium text-gray-900">
                        Filter by Location
                      </span>
                      <button
                        onClick={() => setShowLocationFilter(false)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>

                    <div
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                      onClick={() => {
                        setSelectedLocation("");
                        setShowLocationFilter(false);
                      }}
                    >
                      All Locations
                    </div>
                    {locations.map((location) => (
                      <div
                        key={location}
                        className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => {
                          setSelectedLocation(location);
                          setShowLocationFilter(false);
                        }}
                      >
                        {location}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Active Filter Display */}
      {selectedLocation && (
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Filtered by:</span>
            <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
              <span>{selectedLocation}</span>
              <button
                onClick={() => setSelectedLocation("")}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden lg:block">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Login date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Events
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vendor.sl}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vendor.vendorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vendor.loginDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vendor.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vendor.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {vendor.events}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap text-sm ${getStatusColor(
                      vendor.status
                    )}`}
                  >
                    {vendor.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowActionDropdown(
                            showActionDropdown === vendor.id ? null : vendor.id
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </button>

                      {showActionDropdown === vendor.id && (
                        <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <div className="p-1">
                            {actionOptions.map((action) => (
                              <button
                                key={action}
                                onClick={() =>
                                  handleActionClick(action, String(vendor.id))
                                }
                                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Tablet Horizontal Scroll View */}
      <div className="hidden md:block lg:hidden">
        <div className="border border-gray-200 rounded-lg overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  SL
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Vendor
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Events
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {vendor.sl}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {vendor.vendorName}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {vendor.loginDate}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {vendor.location}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 truncate max-w-[120px]">
                    {vendor.email}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    {vendor.events}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm ${getStatusColor(
                      vendor.status
                    )}`}
                  >
                    {vendor.status}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900">
                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowActionDropdown(
                            showActionDropdown === vendor.id ? null : vendor.id
                          )
                        }
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </button>

                      {showActionDropdown === vendor.id && (
                        <div className="absolute right-0 top-full mt-1 w-28 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                          <div className="p-1">
                            {actionOptions.map((action) => (
                              <button
                                key={action}
                                onClick={() =>
                                  handleActionClick(action, String(vendor.id))
                                }
                                className="block w-full text-left px-2 py-1.5 text-xs text-gray-700 hover:bg-gray-100 rounded"
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-3">
        {filteredVendors.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No vendors found</p>
          </div>
        ) : (
          filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="border border-gray-200 rounded-lg bg-white shadow-sm"
            >
              {/* Card Header */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {vendor.vendorName}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{vendor.email}</p>
                    <p className="text-sm text-gray-500">{vendor.location}</p>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => toggleCardExpansion(String(vendor.id))}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <ChevronDown
                        className={`h-4 w-4 text-gray-500 transition-transform ${
                          expandedCard === String(vendor.id) ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div className="relative">
                      <button
                        onClick={() =>
                          setShowActionDropdown(
                            showActionDropdown === vendor.id ? null : vendor.id
                          )
                        }
                        className="p-2 hover:bg-gray-100 rounded-lg"
                      >
                        <MoreVertical className="h-4 w-4 text-gray-500" />
                      </button>

                      {showActionDropdown === vendor.id && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setShowActionDropdown(null)}
                          />
                          <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                            <div className="p-1">
                              {actionOptions.map((action) => (
                                <button
                                  key={action}
                                  onClick={() =>
                                    handleActionClick(action, String(vendor.id))
                                  }
                                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                                >
                                  {action}
                                </button>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Expandable Details */}
              {expandedCard === String(vendor.id) && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span
                        className={`text-sm font-medium ${getStatusColor(
                          vendor.status
                        )}`}
                      >
                        {vendor.status}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">SL:</span>
                      <span className="ml-2 text-gray-900">{vendor.sl}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Events:</span>
                      <span className="ml-2 text-gray-900">
                        {vendor.events}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500">Login Date:</span>
                      <span className="ml-2 text-gray-900">
                        {vendor.loginDate}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Responsive Pagination */}
      <div className="flex items-center justify-center mt-6">
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Page Numbers - Responsive */}
          <div className="hidden sm:flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-2 rounded-lg border text-sm ${
                  currentPage === page
                    ? "bg-primary text-white border-primary"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Mobile Page Indicator */}
          <div className="sm:hidden px-3 py-2 text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorsListPage;
