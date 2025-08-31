/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useCallback } from "react";
import { Table, Button, Modal, Image, Tag, Dropdown, Menu } from "antd";
import { useParams } from "next/navigation";
import {
  useApproveOrRejectSharedEventMutation,
  useGetAllBookingForVerifyQuery,
} from "@/redux/features/vendor/vendorApi";
import { MoreOutlined } from "@ant-design/icons";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";

export default function VerifyList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const id = useParams().id;
  const {
    data: bookingData,
    isLoading,
    isFetching,
  } = useGetAllBookingForVerifyQuery({ id });
  const [approveOrRejectSharedEvent] = useApproveOrRejectSharedEventMutation();

  const handleApproveOrReject = useCallback(
    (record: any, isAccepted: boolean) => {
      const data = { isApprove: isAccepted };
      handleAsyncWithToast(() =>
        approveOrRejectSharedEvent({ id: record.id, data })
      );
    },
    [approveOrRejectSharedEvent]
  );

  const columns = useMemo(
    () => [
      {
        title: "Customer Name",
        dataIndex: ["user", "fullName"],
        key: "customerName",
      },
      {
        title: "Event Name",
        dataIndex: "name",
        key: "eventName",
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: string) => {
          let color = "blue";
          if (status === "PENDING") color = "orange";
          else if (status === "APPROVED") color = "green";
          else if (status === "REJECTED") color = "red";
          return <Tag color={color}>{status}</Tag>;
        },
      },
      {
        title: "View",
        key: "view",
        render: (_: any, record: any) => (
          <Button
            onClick={() => {
              setSelectedBooking(record);
              setModalVisible(true);
            }}
            className="!bg-primary !text-white"
          >
            View
          </Button>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (_: any, record: any) => {
          const menu = (
            <Menu>
              <Menu.Item onClick={() => handleApproveOrReject(record, true)}>
                Approve
              </Menu.Item>
              <Menu.Item onClick={() => handleApproveOrReject(record, false)}>
                Reject
              </Menu.Item>
            </Menu>
          );
          return (
            <Dropdown overlay={menu} trigger={["click"]}>
              <MoreOutlined size={40} />
            </Dropdown>
          );
        },
      },
    ],
    [handleApproveOrReject]
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
        loading={isLoading || isFetching}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize: 10,
          total: bookingData?.data?.meta?.total,
          onChange: (page) => setCurrentPage(page),
        }}
      />

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
              <strong>Event Name:</strong> {selectedBooking.name}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <Tag
                color={
                  selectedBooking.status === "PENDING"
                    ? "orange"
                    : selectedBooking.status === "APPROVED"
                    ? "green"
                    : "red"
                }
              >
                {selectedBooking.status}
              </Tag>
            </p>
            <p>
              <strong>Event Dates:</strong>{" "}
              {new Date(selectedBooking.events.startDate).toLocaleDateString()}{" "}
              - {new Date(selectedBooking.events.endDate).toLocaleDateString()}{" "}
              at {new Date(selectedBooking.events.time).toLocaleTimeString()}
            </p>
            {selectedBooking.confirmationImage && (
              <div className="mt-4 flex flex-col">
                <strong>Confirmation Image:</strong>
                <Image
                  src={selectedBooking.confirmationImage}
                  alt="Confirmation"
                  width={200}
                  height={200}
                  className="mt-2 border rounded"
                />
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
