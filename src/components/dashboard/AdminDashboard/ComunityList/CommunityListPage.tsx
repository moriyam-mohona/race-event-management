/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Pagination, Table, Tag, Input } from "antd";
import { useGetAllCommunityByAdminQuery } from "@/redux/features/admin/adminApi";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";

const { Search } = Input;

interface Community {
  id: string;
  sl: number;
  eventName: string;
  vendorName: string;
  signupDate: string;
  location: string;
  members: {
    registered: string;
  };
  status: "Active" | "Paused";
}

const CommunityListPage: React.FC = () => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 9,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  const router = useRouter();

  // Debounce Effect (wait 500ms after user stops typing)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPagination((prev) => ({ ...prev, current: 1 }));
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // API Query Params
  const queryObj = [
    { name: "page", value: pagination.current },
    { name: "limit", value: pagination.pageSize },
    { name: "searchField", value: debouncedSearch || "" },
  ];

  const { data, isLoading, isFetching } = useGetAllCommunityByAdminQuery({
    queryObj,
  });

  const totalCount = data?.data?.meta?.total || 0;
  // const apiCommunities = data?.data?.data || [];

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({
      current: page,
      pageSize,
    });
  };

  const { current, pageSize } = pagination; // destructure primitive values

  const communities: Community[] = useMemo(() => {
    const apiCommunities = data?.data?.data || [];

    return apiCommunities.map((item: any, index: number) => ({
      id: item.id,
      sl: (current - 1) * pageSize + (index + 1), // use destructured values
      eventName: item.event?.title || "N/A",
      vendorName: item.user?.fullName || "N/A",
      signupDate: dayjs(item?.createdAt).format("DD MMM, YYYY"),
      location: item.event?.location?.address || "N/A",
      members: {
        registered: String(item._count?.followers || 0),
      },
      status: item.isCommunityActive ? "Active" : "Paused",
    }));
  }, [data, current, pageSize]); // ✅ only primitive deps

  const columns = [
    { title: "SL", dataIndex: "sl", key: "sl" },
    {
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",
      render: (_: any, record: Community) => (
        <a
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() =>
            router.push(`/dashboard/admin/community-list/${record?.id}`)
          }
        >
          {record.eventName}
        </a>
      ),
    },
    { title: "Vendor Name", dataIndex: "vendorName", key: "vendorName" },
    { title: "Signup Date", dataIndex: "signupDate", key: "signupDate" },
    { title: "Location", dataIndex: "location", key: "location" },
    {
      title: "Followers",
      key: "members",
      render: (_: any, record: Community) => (
        <span>{record.members.registered}</span>
      ),
    },
    {
      title: "Status",
      key: "status",
      render: (_: any, record: Community) =>
        record.status === "Active" ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="orange">Paused</Tag>
        ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-medium mb-6">Communities</h1>

        {/* Search Box */}
        <div className="w-full h-12 max-w-sm">
          <Search
            placeholder="Search by event name..."
            value={searchTerm}
            className="w-full h-full"
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
        </div>
      </div>

      {/* Table */}
      <Table
        loading={isLoading || isFetching}
        columns={columns}
        dataSource={communities}
        rowKey="id"
        pagination={false} // disable built-in pagination
      />

      {/* Custom Pagination */}
      <div className="p-4 w-full flex flex-wrap justify-center">
        <Pagination
          current={pagination.current}
          pageSize={pagination.pageSize}
          total={totalCount}
          disabled={isLoading || isFetching}
          onChange={handlePaginationChange}
        />
      </div>
    </div>
  );
};

export default CommunityListPage;
