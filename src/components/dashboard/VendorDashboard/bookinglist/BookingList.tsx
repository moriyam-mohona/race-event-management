/* eslint-disable @typescript-eslint/no-unused-vars */
import { Booking, BookingListProps } from "@/types/Common";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  MoreVertical,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import gear from "@/assets/gear.png";
import Image from "next/image";

export function BookingList({
  activeTab,
  searchQuery,
  currentPage,
  onPageChange,
  selectedMonth,
}: BookingListProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [totalPages, setTotalPages] = useState(5);
  const [loading, setLoading] = useState(true);
  const [expandedBooking, setExpandedBooking] = useState<number | null>(null);

  // Modal state for gear
  const [isGearModalOpen, setIsGearModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [selectedBookingGear, setSelectedBookingGear] = useState<any>(null);

  // Mock gear data
  const mockGearData = [
    {
      id: 1,
      name: "SpeedStorm 500",
      type: "Cycle",
      price: 234.0,
      image: gear,
    },
    {
      id: 2,
      name: "SpeedStorm 500",
      type: "Cycle",
      price: 234.0,
      image: gear,
    },
    {
      id: 3,
      name: "SpeedStorm 500",
      type: "Cycle",
      price: 234.0,
      image: gear,
    },
  ];

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockData: Booking[] = Array.from({ length: 6 }, (_, i) => ({
        id: i + 1,
        sl: 3532,
        name: "Watson Pitter",
        dateTime: "8-10 Aug, 2025|08:30 pm",
        location: "United State",
        email: "clint@gmail.com",
        member: 3,
        price: 300,
        gearPrice: 200,
        gender: "Male",
      }));

      // Filter by search query if provided
      const filtered = searchQuery
        ? mockData.filter(
            (booking) =>
              booking.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              booking.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
              booking.location.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : mockData;

      setBookings(filtered);
      setLoading(false);
    }, 500);
  }, [activeTab, searchQuery, currentPage, selectedMonth]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const toggleBookingExpand = (id: number) => {
    setExpandedBooking(expandedBooking === id ? null : id);
  };

  const handleGearClick = (booking: Booking) => {
    setSelectedBookingGear(booking);
    setIsGearModalOpen(true);
  };

  const closeGearModal = () => {
    setIsGearModalOpen(false);
    setSelectedBookingGear(null);
  };

  return (
    <>
      <div className="rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium text-gray-800">
            Glendalough Lap of the Gap Marathon
          </h2>
        </div>

        {/* Desktop Table View (hidden on small screens) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  SL
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Date & Time
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Location
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Member
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  B. Price
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Gear+P
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Gender
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    Loading bookings...
                  </td>
                </tr>
              ) : bookings.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No bookings found
                  </td>
                </tr>
              ) : (
                bookings.map((booking) => (
                  <tr key={booking?.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {booking?.sl}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {booking?.name}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {booking?.dateTime}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {booking?.location}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {booking?.email}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {booking?.member}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      ${booking?.price}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      <span
                        className="text-primary font-semibold underline cursor-pointer hover:text-primary/80 transition-colors"
                        onClick={() => handleGearClick(booking)}
                      >
                        4 = ${booking?.gearPrice}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      {booking?.gender}
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="hover:bg-green-50 w-32 py-2 border-b">
                            Approve
                          </DropdownMenuItem>
                          <DropdownMenuItem className="hover:bg-red-200 w-32 py-2">
                            Reject
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View (visible only on small screens) */}
        <div className="md:hidden">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              Loading bookings...
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No bookings found
            </div>
          ) : (
            <div className="divide-y">
              {bookings.map((booking) => (
                <Collapsible
                  key={booking.id}
                  open={expandedBooking === booking.id}
                  onOpenChange={() => toggleBookingExpand(booking.id)}
                  className="px-4 py-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{booking.name}</div>
                      <div className="text-sm text-gray-500">
                        {booking.dateTime}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${
                              expandedBooking === booking.id ? "rotate-180" : ""
                            }`}
                          />
                          <span className="sr-only">Toggle details</span>
                        </Button>
                      </CollapsibleTrigger>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Booking</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Cancel Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CollapsibleContent>
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-gray-500">SL:</div>
                        <div>{booking.sl}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-gray-500">Location:</div>
                        <div>{booking.location}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-gray-500">Email:</div>
                        <div className="break-all">{booking.email}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-gray-500">Member:</div>
                        <div>{booking.member}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-gray-500">B. Price:</div>
                        <div>${booking.price}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-gray-500">Gear+P:</div>
                        <div
                          className="text-primary underline cursor-pointer hover:text-primary/80 transition-colors"
                          onClick={() => handleGearClick(booking)}
                        >
                          4 = ${booking.gearPrice}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="text-gray-500">Gender:</div>
                        <div>{booking.gender}</div>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center justify-center p-4 border-t">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>

            {/* Hide page numbers on very small screens */}
            <div className="hidden xs:flex items-center space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    className={`h-8 w-8 ${
                      currentPage === page ? "bg-primary" : ""
                    }`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                )
              )}
            </div>

            {/* Show current page / total on very small screens */}
            <div className="xs:hidden text-sm">
              Page {currentPage} of {totalPages}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Gear Modal */}
      <Dialog open={isGearModalOpen} onOpenChange={setIsGearModalOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-900">
              Added Gear
            </DialogTitle>
          </DialogHeader>

          <div className="mt-4 space-y-4 max-h-96 overflow-y-auto">
            {mockGearData.map((gear, index) => (
              <div
                key={gear.id}
                className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50"
              >
                <div className="flex-shrink-0 text-lg font-medium text-gray-600">
                  {index + 1}.
                </div>

                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-green-50 rounded-lg flex items-center justify-center">
                    <Image
                      src={gear.image}
                      alt={gear.name}
                      width={1000}
                      height={1000}
                      className="w-16 h-16 object-contain"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{gear.name}</h3>
                  <p className="text-sm text-gray-500">{gear.type}</p>
                  <p className="text-sm font-medium text-gray-900">
                    ${gear.price.toFixed(2)} USD
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Button variant="outline" onClick={closeGearModal} className="px-6">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
