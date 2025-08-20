/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { Table, Button, Modal, Image } from "antd";
import { useParams } from "next/navigation";
import { useGetAllBookingByVendorQuery } from "@/redux/features/vendor/vendorApi";

export default function BookingListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const id = useParams().id;
  const { data: bookingData } = useGetAllBookingByVendorQuery({ id });

  // Columns for the table
  const columns = useMemo(
    () => [
      {
        title: "Customer Name",
        dataIndex: ["user", "fullName"],
        key: "customerName",
      },
      {
        title: "Country",
        dataIndex: "country",
        key: "country",
      },
      {
        title: "Persons",
        dataIndex: "totalPersonCount",
        key: "totalPersonCount",
      },
      {
        title: "Total Amount",
        dataIndex: "totalAmount",
        key: "totalAmount",
        render: (amount: number) => `$${amount.toFixed(2)}`,
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Action",
        key: "action",
        render: (_: any, record: any) => (
          <Button
            type="primary"
            onClick={() => {
              setSelectedBooking(record);
              setModalVisible(true);
            }}
          >
            View Details
          </Button>
        ),
      },
    ],
    []
  );

  const tableData = useMemo(() => {
    if (!bookingData?.data?.data) return [];
    return bookingData.data.data;
  }, [bookingData]);

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-semibold mb-4">Bookings</h2>

      <Table
        columns={columns}
        dataSource={tableData}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: bookingData?.data?.meta?.total,
          onChange: (page) => setCurrentPage(page),
        }}
      />

      {/* Modal for full booking details */}
      <Modal
        open={modalVisible}
        title="Booking Details"
        onCancel={() => setModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={700}
      >
        {selectedBooking && (
          <div className="space-y-3">
            <p>
              <strong>Customer:</strong> {selectedBooking.user.fullName}
            </p>
            <p>
              <strong>Country:</strong> {selectedBooking.country}
            </p>
            <p>
              <strong>Persons:</strong> {selectedBooking.totalPersonCount}
            </p>
            <p>
              <strong>Status:</strong> {selectedBooking.status}
            </p>
            <p>
              <strong>Total Amount:</strong> ${selectedBooking.totalAmount}
            </p>
            <p>
              <strong>Event Dates:</strong>{" "}
              {new Date(selectedBooking.events.startDate).toLocaleDateString()}{" "}
              - {new Date(selectedBooking.events.endDate).toLocaleDateString()}{" "}
              at {selectedBooking.events.time}
            </p>
            <p>
              <strong>Total Gear Count:</strong>{" "}
              {selectedBooking.totalGearCount}
            </p>
            <p>
              <strong>Total Gear Price:</strong> $
              {selectedBooking.totalGearPrice}
            </p>

            <div>
              <strong>Gear Details:</strong>
              {selectedBooking.addedGearInfo.map((gear: any) => (
                <div
                  key={gear.gearId}
                  className="border rounded p-2 my-2 space-y-1"
                >
                  <p>
                    <strong>Title:</strong> {gear.gearTitle}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {gear.quantity}
                  </p>
                  <p>
                    <strong>Size:</strong> {gear.size}
                  </p>
                  <p>
                    <strong>Color:</strong>{" "}
                    <span
                      className="inline-block w-5 h-5"
                      style={{ backgroundColor: gear.color }}
                    ></span>
                  </p>
                  <p>
                    <strong>Message:</strong> {gear.message}
                  </p>
                  <p>
                    <strong>Price:</strong> ${gear.price}
                  </p>
                  <div className="flex gap-2">
                    {gear.gearImages.map((img: string, idx: number) => (
                      <Image
                        key={idx}
                        src={img}
                        alt={gear.gearTitle}
                        width={80}
                        height={80}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
