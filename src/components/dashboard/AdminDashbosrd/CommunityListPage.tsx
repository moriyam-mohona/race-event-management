"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

interface Community {
  id: number;
  sl: number;
  eventName: string;
  vendorName: string;
  signupDate: string;
  location: string;
  members: {
    registered: string;
    additional: string;
    total: string;
  };
  status: "Active" | "Paused";
}

type TabType = "Community" | "Member";
type StatusFilter = "Active" | "Paused" | "";

const CommunityListPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("Community");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<StatusFilter>("");
  const [showLocationFilter, setShowLocationFilter] = useState(false);
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(7);

  const totalCommunities = 243;
  const totalPages = 7;

  const locations = ["United State", "Canada", "United Kingdom"];
  const statusOptions: StatusFilter[] = ["Active", "Paused"];

  // Mock community data
  const communities: Community[] = [
    {
      id: 1,
      sl: 3532,
      eventName: "Glendalou...",
      vendorName: "Watson Pitter",
      signupDate: "10 Aug, 2025",
      location: "United State",
      members: { registered: "999m", additional: "+2k", total: "5k" },
      status: "Paused",
    },
    {
      id: 2,
      sl: 3532,
      eventName: "Glendalou...",
      vendorName: "Watson Pitter",
      signupDate: "10 Aug, 2025",
      location: "United State",
      members: { registered: "3k", additional: "+2k", total: "5k" },
      status: "Active",
    },
    {
      id: 3,
      sl: 3532,
      eventName: "Glendalou...",
      vendorName: "Watson Pitter",
      signupDate: "10 Aug, 2025",
      location: "United State",
      members: { registered: "3k", additional: "+2k", total: "5k" },
      status: "Active",
    },
    {
      id: 4,
      sl: 3532,
      eventName: "Glendalou...",
      vendorName: "Watson Pitter",
      signupDate: "10 Aug, 2025",
      location: "United State",
      members: { registered: "3k", additional: "+2k", total: "5k" },
      status: "Active",
    },
    {
      id: 5,
      sl: 3532,
      eventName: "Glendalou...",
      vendorName: "Watson Pitter",
      signupDate: "10 Aug, 2025",
      location: "United State",
      members: { registered: "3k", additional: "+2k", total: "5k" },
      status: "Active",
    },
    {
      id: 6,
      sl: 3532,
      eventName: "Glendalou...",
      vendorName: "Watson Pitter",
      signupDate: "10 Aug, 2025",
      location: "United State",
      members: { registered: "3k", additional: "+2k", total: "5k" },
      status: "Active",
    },
  ];

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    console.log(`Tab changed to: ${tab}`);
  };

  const handleStatusToggle = (communityId: number) => {
    console.log(`Status toggled for community ID: ${communityId}`);
    // Add your status toggle logic here
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      console.log(`Page changed to: ${page}`);
    }
  };

  const handleEventClick = (eventName: string, communityId: number) => {
    console.log(`Event clicked: ${eventName}, Community ID: ${communityId}`);
    // Add navigation logic here
  };

  const filteredCommunities = communities.filter((community) => {
    const matchesSearch =
      community.eventName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      !selectedLocation || community.location === selectedLocation;
    const matchesStatus =
      !selectedStatus || community.status === selectedStatus;
    return matchesSearch && matchesLocation && matchesStatus;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-medium text-gray-900">
          {totalCommunities} Communities
        </h1>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none text-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2">
            {/* Location Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowLocationFilter(!showLocationFilter);
                  setShowStatusFilter(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary text-sm"
              >
                <span className="text-gray-700">Filter by</span>
                <Filter className="h-4 w-4 text-gray-500" />
              </button>

              {showLocationFilter && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowLocationFilter(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    <div className="p-2">
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

            {/* Status Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowStatusFilter(!showStatusFilter);
                  setShowLocationFilter(false);
                }}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary text-sm"
              >
                <span className="text-gray-700">Status</span>
                <Filter className="h-4 w-4 text-gray-500" />
              </button>

              {showStatusFilter && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowStatusFilter(false)}
                  />
                  <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                    <div className="p-2">
                      <div
                        className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                        onClick={() => {
                          setSelectedStatus("");
                          setShowStatusFilter(false);
                        }}
                      >
                        All Status
                      </div>
                      {statusOptions.map((status) => (
                        <div
                          key={status}
                          className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                          onClick={() => {
                            setSelectedStatus(status);
                            setShowStatusFilter(false);
                          }}
                        >
                          {status}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button
          onClick={() => handleTabChange("Community")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === "Community"
              ? "bg-primary text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Community
        </button>
        <button
          onClick={() => handleTabChange("Member")}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            activeTab === "Member"
              ? "bg-primary text-white"
              : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          }`}
        >
          Member
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                SL
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event Name
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vendor Name
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Signup date
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Members
              </th>
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredCommunities.map((community) => (
              <tr key={community.id} className="hover:bg-gray-50">
                <td className="py-4 px-4 text-sm text-gray-900">
                  {community.sl}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  <button
                    onClick={() =>
                      handleEventClick(community.eventName, community.id)
                    }
                    className="flex items-center  underline"
                  >
                    {community.eventName}
                    <ArrowRight className="h-3 w-3 ml-1" />
                  </button>
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  {community.vendorName}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  {community.signupDate}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  {community.location}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  <span className="text-green-600">
                    Rg. {community.members.registered}
                  </span>
                  <span className="text-gray-600">
                    {" "}
                    {community.members.additional}
                  </span>
                  <span className="text-gray-900">
                    {" "}
                    = {community.members.total}
                  </span>
                </td>
                <td className="py-4 px-4 text-sm">
                  {community.status === "Paused" ? (
                    <button
                      onClick={() => handleStatusToggle(community.id)}
                      className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-medium hover:bg-orange-200 transition-colors"
                    >
                      Pause
                    </button>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                      Active
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-6">
        <div className="flex items-center space-x-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="h-4 w-4 text-gray-600" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityListPage;
