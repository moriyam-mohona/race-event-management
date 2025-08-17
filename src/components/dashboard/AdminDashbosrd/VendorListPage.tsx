/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import { Table, Button, Dropdown, Pagination, Input } from "antd";
import { MoreOutlined, SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import {
  useApproveOrRejectVendorMutation,
  useGetAllVendorsQuery,
} from "@/redux/features/admin/adminApi";
import dayjs from "dayjs";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";

interface Vendor {
  id: string;
  key: string;
  fullName: string;
  createdAt: string;
  country: string;
  email: string;
  status: "PENDING" | "ACTIVE" | "INACTIVE";
  totalEvents: number;
}

const VendorsListPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Debounce effect
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setPage(1); // reset page when search query changes
    }, 500); // 500ms delay

    return () => {
      clearTimeout(timerId);
    };
  }, [searchQuery]);

  const queryObj = useMemo(() => {
    const obj: any[] = [
      { name: "page", value: page },
      { name: "limit", value: pageSize },
    ];
    if (debouncedSearchQuery)
      obj.push({ name: "searchField", value: debouncedSearchQuery });
    return obj;
  }, [page, pageSize, debouncedSearchQuery]);

  const { data, isLoading, isFetching } = useGetAllVendorsQuery({
    queryObj,
  });

  const [approveOrRejectVendor] = useApproveOrRejectVendorMutation();

  const vendorsData = useMemo(() => {
    return data?.data?.data || [];
  }, [data]);

  const totalCount = data?.data?.meta?.total || 0;

  const formattedVendors = useMemo(
    () =>
      vendorsData.map((vendor: Vendor, index: number) => ({
        ...vendor,
        key: vendor.id,
        sl: (page - 1) * pageSize + index + 1,
        loginDate: dayjs(vendor.createdAt).format("DD MMM, YYYY"),
        events: vendor.totalEvents.toString(),
      })),
    [vendorsData, page, pageSize]
  );

  const handleStatusUpdate = async (
    vendorId: string,
    status: "ACTIVE" | "INACTIVE"
  ) => {
    await handleAsyncWithToast(() =>
      approveOrRejectVendor({ data: { status }, id: vendorId })
    );
  };

  const handleActionClick = (action: string, vendorId: string) => {
    if (action === "Events") {
      router.push(`/dashboard/admin/vendor-list/${vendorId}`);
    }
  };

  const handlePaginationChange = useCallback((page: number) => {
    setPage(page);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const columns = useMemo(
    () => [
      { title: "SL", dataIndex: "sl", key: "sl" },
      { title: "Vendor Name", dataIndex: "fullName", key: "fullName" },
      { title: "Login Date", dataIndex: "loginDate", key: "loginDate" },
      { title: "Location", dataIndex: "country", key: "country" },
      { title: "Email", dataIndex: "email", key: "email" },
      { title: "Events", dataIndex: "totalEvents", key: "totalEvents" },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        render: (status: string) => (
          <span
            className={`font-medium ${
              status === "PENDING"
                ? "text-yellow-500"
                : status === "ACTIVE"
                ? "text-green-700"
                : "text-red-500"
            }`}
          >
            {status === "PENDING"
              ? "Pending"
              : status === "ACTIVE"
              ? "Active"
              : "Inactive"}
          </span>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (_: any, record: Vendor) => (
          <Dropdown
            menu={{
              items: [
                {
                  key: "events",
                  label: "Events",
                  onClick: () => handleActionClick("Events", record.id),
                },
                {
                  key: "approve",
                  label: "Approve",
                  onClick: () => handleStatusUpdate(record.id, "ACTIVE"),
                },
                {
                  key: "reject",
                  label: "Reject",
                  onClick: () => handleStatusUpdate(record.id, "INACTIVE"),
                },
              ],
            }}
            trigger={["click"]}
          >
            <Button type="text" icon={<MoreOutlined />} />
          </Dropdown>
        ),
      },
    ],
    []
  );

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-900 mb-4 md:mb-0">
          {totalCount} Vendors
        </h1>
        <div className="w-full max-w-lg">
          <Input
            placeholder="Search Vendor..."
            className="h-10 !rounded-lg"
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <Table
        columns={columns}
        dataSource={formattedVendors}
        pagination={false}
        loading={isLoading || isFetching}
        className="mb-4"
        rowKey="id"
      />

      <div className="flex justify-center">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={totalCount}
          onChange={handlePaginationChange}
          disabled={isFetching || isLoading}
        />
      </div>
    </div>
  );
};

export default VendorsListPage;
