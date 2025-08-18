/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useMemo, useState, useEffect } from "react";
import { Table, Tag, Pagination, Input } from "antd";
import { useGetAllMembersByCommunityIdQuery } from "@/redux/features/admin/adminApi";
import { useParams, useRouter } from "next/navigation";
import dayjs from "dayjs";

const { Search } = Input;

interface Member {
  id: string;
  fullName: string;
  email: string;
  country: string;
  signupDate: string;
  isPaidFollower: boolean;
  isFollowing: boolean;
}

const CommunityMember: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const communityId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPagination((prev) => ({ ...prev, current: 1 })); // reset page on search
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  // API Query Params
  const queryObj = [
    { name: "communityId", value: communityId },
    { name: "page", value: pagination.current },
    { name: "limit", value: pagination.pageSize },
    { name: "searchField", value: debouncedSearch || "" }, // server-side search
  ];

  const { data, isLoading, isFetching } = useGetAllMembersByCommunityIdQuery({
    id: communityId,
    queryObj,
  });

  const totalCount = data?.data?.meta?.total || 0;
  const { current, pageSize } = pagination;

  // Map API response
  const members: Member[] = useMemo(() => {
    const membersData = data?.data?.data || [];
    return membersData.map((item: any) => ({
      id: item.id,
      fullName: item.user?.fullName || "N/A",
      email: item.user?.email || "N/A",
      country: item.user?.country || "N/A",
      signupDate: dayjs(item.user?.createdAt).format("DD MMM, YYYY"),
      isPaidFollower: item.isPaidFollower,
      isFollowing: item.isFollowing,
    }));
  }, [data]);

  const handlePaginationChange = (page: number, pageSize: number) => {
    setPagination({ current: page, pageSize });
  };

  const columns = [
    {
      title: "SL",
      key: "sl",
      render: (_: any, __: Member, index: number) =>
        (current - 1) * pageSize + index + 1,
    },
    {
      title: "Full Name",
      dataIndex: "fullName",
      key: "fullName",
      render: (_: any, record: Member) => (
        <a
          className="text-blue-600 hover:underline cursor-pointer"
          onClick={() => router.push(`/dashboard/admin/user/${record.id}`)}
        >
          {record.fullName}
        </a>
      ),
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Country", dataIndex: "country", key: "country" },
    { title: "Signup Date", dataIndex: "signupDate", key: "signupDate" },
    {
      title: "Paid Follower",
      dataIndex: "isPaidFollower",
      key: "isPaidFollower",
      render: (paid: boolean) =>
        paid ? <Tag color="green">Yes</Tag> : <Tag color="orange">No</Tag>,
    },
    {
      title: "Following",
      dataIndex: "isFollowing",
      key: "isFollowing",
      render: (following: boolean) =>
        following ? <Tag color="blue">Yes</Tag> : <Tag color="red">No</Tag>,
    },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-medium mb-6">Community Members</h1>

        {/* Search Box */}
        <div className="w-full h-12 max-w-sm">
          <Search
            placeholder="Search community member..."
            value={searchTerm}
            className="w-full h-full"
            onChange={(e) => setSearchTerm(e.target.value)}
            allowClear
          />
        </div>
      </div>

      <Table
        loading={isLoading || isFetching}
        columns={columns}
        dataSource={members}
        rowKey="id"
        pagination={false}
      />

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

export default CommunityMember;
