"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
} from "lucide-react";

// Type Definitions
interface Vendor {
  id: number;
  sl: number;
  vendorName: string;
  loginDate: string;
  location: string;
  email: string;
  events: string;
  status: "Pending" | "Approved" | "Rejected";
}

type ActionOption = "Events" | "Approve" | "Reject";
type VendorStatus = Vendor["status"];

interface VendorsState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  currentPage: number;
  handlePageChange: (page: number) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  showLocationFilter: boolean;
  setShowLocationFilter: (show: boolean) => void;
  showActionDropdown: number | null;
  setShowActionDropdown: (id: number | null) => void;
  expandedCard: number | null;
  toggleCardExpansion: (id: number) => void;
  filteredVendors: Vendor[];
  handleActionClick: (action: ActionOption, vendorId: number) => void;
}

interface ActionDropdownProps {
  vendorId: number;
  showActionDropdown: number | null;
  setShowActionDropdown: (id: number | null) => void;
  handleActionClick: (action: ActionOption, vendorId: number) => void;
}

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
  showLocationFilter: boolean;
  setShowLocationFilter: (show: boolean) => void;
}

interface ActiveFilterProps {
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

interface TableRowProps {
  vendor: Vendor;
  showActionDropdown: number | null;
  setShowActionDropdown: (id: number | null) => void;
  handleActionClick: (action: ActionOption, vendorId: number) => void;
}

interface DesktopTableProps {
  vendors: Vendor[];
  showActionDropdown: number | null;
  setShowActionDropdown: (id: number | null) => void;
  handleActionClick: (action: ActionOption, vendorId: number) => void;
}

interface MobileCardProps {
  vendor: Vendor;
  expandedCard: number | null;
  toggleCardExpansion: (id: number) => void;
  showActionDropdown: number | null;
  setShowActionDropdown: (id: number | null) => void;
  handleActionClick: (action: ActionOption, vendorId: number) => void;
}

interface MobileViewProps {
  vendors: Vendor[];
  expandedCard: number | null;
  toggleCardExpansion: (id: number) => void;
  showActionDropdown: number | null;
  setShowActionDropdown: (id: number | null) => void;
  handleActionClick: (action: ActionOption, vendorId: number) => void;
}

interface PaginationProps {
  currentPage: number;
  handlePageChange: (page: number) => void;
}

// Constants
const MOCK_VENDORS: Vendor[] = [
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

const LOCATIONS: string[] = ["United State", "Canada", "United Kingdom"];
const ACTION_OPTIONS: ActionOption[] = ["Events", "Approve", "Reject"];
const TOTAL_PAGES: number = 5;
const TOTAL_VENDORS: number = 234;

// Helper Functions
const getStatusColor = (status: VendorStatus): string =>
  status === "Pending" ? "text-orange-500" : "text-gray-600";

const filterVendors = (
  vendors: Vendor[],
  searchQuery: string,
  selectedLocation: string
): Vendor[] => {
  return vendors.filter((vendor) => {
    const matchesSearch =
      vendor.vendorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      !selectedLocation || vendor.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });
};

// Custom Hook for Vendors State
const useVendorsState = (): VendorsState => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [showLocationFilter, setShowLocationFilter] = useState<boolean>(false);
  const [showActionDropdown, setShowActionDropdown] = useState<number | null>(
    null
  );
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const filteredVendors = useMemo(
    () => filterVendors(MOCK_VENDORS, searchQuery, selectedLocation),
    [searchQuery, selectedLocation]
  );

  const handlePageChange = (page: number): void => {
    if (page >= 1 && page <= TOTAL_PAGES) setCurrentPage(page);
  };

  const handleActionClick = (action: ActionOption, vendorId: number): void => {
    console.log(`${action} clicked for vendor ${vendorId}`);

    if (action === "Events") {
      router.push(`/dashboard/admin/vendor-list/${vendorId}`);
    }

    setShowActionDropdown(null);
  };

  const toggleCardExpansion = (vendorId: number): void => {
    setExpandedCard(expandedCard === vendorId ? null : vendorId);
  };

  return {
    searchQuery,
    setSearchQuery,
    currentPage,
    handlePageChange,
    selectedLocation,
    setSelectedLocation,
    showLocationFilter,
    setShowLocationFilter,
    showActionDropdown,
    setShowActionDropdown,
    expandedCard,
    toggleCardExpansion,
    filteredVendors,
    handleActionClick,
  };
};

// Reusable Components
const ActionDropdown: React.FC<ActionDropdownProps> = ({
  vendorId,
  showActionDropdown,
  setShowActionDropdown,
  handleActionClick,
}) => {
  const isOpen: boolean = showActionDropdown === vendorId;

  return (
    <div className="relative">
      <button
        onClick={() => setShowActionDropdown(isOpen ? null : vendorId)}
        className="p-1 hover:bg-gray-100 rounded"
        type="button"
      >
        <MoreVertical className="h-4 w-4 text-gray-500" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10 lg:hidden"
            onClick={() => setShowActionDropdown(null)}
          />
          <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
            <div className="p-1">
              {ACTION_OPTIONS.map((action) => (
                <button
                  key={action}
                  onClick={() => handleActionClick(action, vendorId)}
                  className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                  type="button"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  setSearchQuery,
  setSelectedLocation,
  showLocationFilter,
  setShowLocationFilter,
}) => (
  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
    {/* Search */}
    <div className="relative flex-1 sm:flex-none">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        type="text"
        placeholder="Search vendors..."
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setSearchQuery(e.target.value)
        }
        className="w-full sm:w-64 pl-10 pr-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
      />
    </div>

    {/* Filter */}
    <div className="relative">
      <button
        onClick={() => setShowLocationFilter(!showLocationFilter)}
        className="w-full sm:w-auto flex items-center justify-center sm:justify-start space-x-2 px-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 text-sm"
        type="button"
      >
        <span className="text-gray-700">Filter by</span>
        <Filter className="h-4 w-4 text-gray-500" />
      </button>

      {showLocationFilter && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-25 z-20 sm:hidden"
            onClick={() => setShowLocationFilter(false)}
          />
          <div className="absolute right-0 top-full mt-2 w-full sm:w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-30">
            <div className="p-2">
              <div className="flex items-center justify-between p-2 sm:hidden border-b border-gray-100">
                <span className="font-medium text-gray-900">
                  Filter by Location
                </span>
                <button
                  onClick={() => setShowLocationFilter(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                  type="button"
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
              {LOCATIONS.map((location) => (
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
);

const ActiveFilter: React.FC<ActiveFilterProps> = ({
  selectedLocation,
  setSelectedLocation,
}) => {
  if (!selectedLocation) return null;

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Filtered by:</span>
        <div className="flex items-center space-x-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
          <span>{selectedLocation}</span>
          <button
            onClick={() => setSelectedLocation("")}
            className="hover:bg-blue-200 rounded-full p-0.5"
            type="button"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

const TableRow: React.FC<TableRowProps> = ({
  vendor,
  showActionDropdown,
  setShowActionDropdown,
  handleActionClick,
}) => (
  <tr className="hover:bg-gray-50">
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
      <ActionDropdown
        vendorId={vendor.id}
        showActionDropdown={showActionDropdown}
        setShowActionDropdown={setShowActionDropdown}
        handleActionClick={handleActionClick}
      />
    </td>
  </tr>
);

const TableHeader: React.FC = () => {
  const headers: string[] = [
    "SL",
    "Vendor Name",
    "Login date",
    "Location",
    "Email",
    "Events",
    "Status",
    "Action",
  ];

  return (
    <thead className="bg-gray-50 border-b border-gray-200">
      <tr>
        {headers.map((header) => (
          <th
            key={header}
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

const DesktopTable: React.FC<DesktopTableProps> = ({
  vendors,
  showActionDropdown,
  setShowActionDropdown,
  handleActionClick,
}) => (
  <div className="hidden lg:block">
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <table className="w-full">
        <TableHeader />
        <tbody className="bg-white divide-y divide-gray-200">
          {vendors.map((vendor) => (
            <TableRow
              key={vendor.id}
              vendor={vendor}
              showActionDropdown={showActionDropdown}
              setShowActionDropdown={setShowActionDropdown}
              handleActionClick={handleActionClick}
            />
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const MobileCard: React.FC<MobileCardProps> = ({
  vendor,
  expandedCard,
  toggleCardExpansion,
  showActionDropdown,
  setShowActionDropdown,
  handleActionClick,
}) => (
  <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900">{vendor.vendorName}</h3>
            <span
              className={`text-sm font-medium ${getStatusColor(vendor.status)}`}
            >
              {vendor.status}
            </span>
          </div>
          <p className="text-sm text-gray-500 mt-1">{vendor.email}</p>
          <p className="text-sm text-gray-500">{vendor.location}</p>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => toggleCardExpansion(vendor.id)}
            className="p-2 hover:bg-gray-100 rounded-lg"
            type="button"
          >
            <ChevronDown
              className={`h-4 w-4 text-gray-500 transition-transform ${
                expandedCard === vendor.id ? "rotate-180" : ""
              }`}
            />
          </button>
          <ActionDropdown
            vendorId={vendor.id}
            showActionDropdown={showActionDropdown}
            setShowActionDropdown={setShowActionDropdown}
            handleActionClick={handleActionClick}
          />
        </div>
      </div>
    </div>

    {expandedCard === vendor.id && (
      <div className="border-t border-gray-100 p-4 bg-gray-50">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">SL:</span>
            <span className="ml-2 text-gray-900">{vendor.sl}</span>
          </div>
          <div>
            <span className="text-gray-500">Events:</span>
            <span className="ml-2 text-gray-900">{vendor.events}</span>
          </div>
          <div className="col-span-2">
            <span className="text-gray-500">Login Date:</span>
            <span className="ml-2 text-gray-900">{vendor.loginDate}</span>
          </div>
        </div>
      </div>
    )}
  </div>
);

const MobileView: React.FC<MobileViewProps> = ({
  vendors,
  expandedCard,
  toggleCardExpansion,
  showActionDropdown,
  setShowActionDropdown,
  handleActionClick,
}) => (
  <div className="lg:hidden space-y-3">
    {vendors.length === 0 ? (
      <div className="text-center py-8 text-gray-500">
        <p>No vendors found</p>
      </div>
    ) : (
      vendors.map((vendor) => (
        <MobileCard
          key={vendor.id}
          vendor={vendor}
          expandedCard={expandedCard}
          toggleCardExpansion={toggleCardExpansion}
          showActionDropdown={showActionDropdown}
          setShowActionDropdown={setShowActionDropdown}
          handleActionClick={handleActionClick}
        />
      ))
    )}
  </div>
);

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  handlePageChange,
}) => (
  <div className="flex items-center justify-center mt-6">
    <div className="flex items-center space-x-1 sm:space-x-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div className="hidden sm:flex items-center space-x-1">
        {Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-2 rounded-lg border text-sm ${
              currentPage === page
                ? "bg-blue-500 text-white border-blue-500"
                : "border-gray-300 hover:bg-gray-50"
            }`}
            type="button"
          >
            {page}
          </button>
        ))}
      </div>

      <div className="sm:hidden px-3 py-2 text-sm text-gray-600">
        Page {currentPage} of {TOTAL_PAGES}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === TOTAL_PAGES}
        className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        type="button"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  </div>
);

// Main Component
const VendorsListPage: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    currentPage,
    handlePageChange,
    selectedLocation,
    setSelectedLocation,
    showLocationFilter,
    setShowLocationFilter,
    showActionDropdown,
    setShowActionDropdown,
    expandedCard,
    toggleCardExpansion,
    filteredVendors,
    handleActionClick,
  } = useVendorsState();

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-900">
          {TOTAL_VENDORS} Vendors
        </h1>
        <SearchAndFilter
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          showLocationFilter={showLocationFilter}
          setShowLocationFilter={setShowLocationFilter}
        />
      </div>

      <ActiveFilter
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      {/* Desktop Table */}
      <DesktopTable
        vendors={filteredVendors}
        showActionDropdown={showActionDropdown}
        setShowActionDropdown={setShowActionDropdown}
        handleActionClick={handleActionClick}
      />

      {/* Mobile/Tablet Card View */}
      <MobileView
        vendors={filteredVendors}
        expandedCard={expandedCard}
        toggleCardExpansion={toggleCardExpansion}
        showActionDropdown={showActionDropdown}
        setShowActionDropdown={setShowActionDropdown}
        handleActionClick={handleActionClick}
      />

      <Pagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </div>
  );
};

export default VendorsListPage;
