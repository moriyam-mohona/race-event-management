/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Copy, Mail } from "lucide-react";
import { Table, Button, Pagination, Input } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useGetAllSubscriberQuery } from "@/redux/features/subscriber/subscriberApi";
import { useMemo, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { toast } from "sonner";

interface Subscriber {
  id: number;
  email: string;
  subscribeDate: string;
  status: "active" | "inactive";
}

const SubscriberListPage: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  const queryObj = useMemo(() => {
    const obj: any[] = [
      { name: "page", value: page },
      { name: "limit", value: pageSize },
    ];
    if (searchQuery) obj.push({ name: "searchField", value: searchQuery });
    return obj;
  }, [page, pageSize, searchQuery]);

  const { data, isLoading, isFetching } = useGetAllSubscriberQuery({
    queryObj,
  });
  const subscribers = data?.data?.data;
  const totalCount = data?.data?.meta?.total || 0;

  const handlePaginationChange = (page: number) => {
    setPage(page);
  };

  const columns: ColumnsType<Subscriber> = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => (
        <div className="flex items-center gap-2">
          <span className="text-gray-700">{text}</span>
          <Copy
            className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-600"
            onClick={() => {
              navigator.clipboard.writeText(text);
              toast.success("Copied to clipboard");
            }}
          />
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <a href={`mailto:${record.email}`}>
          <Button type="primary" icon={<Mail className="h-4 w-4 mr-1" />}>
            Mail now
          </Button>
        </a>
      ),
    },
  ];

  return (
    <div className="max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          Subscribers List
        </h1>

        <div className="w-full max-w-lg mt-5">
          <Input
            placeholder="Search Vendor..."
            className="h-10 !rounded-lg"
            prefix={<SearchOutlined className="text-gray-400" />}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1); // reset page on search
            }}
          />
        </div>
      </div>

      <div className="border border-gray-200 rounded-lg p-3">
        <Table
          columns={columns}
          dataSource={subscribers}
          rowKey="id"
          pagination={false}
          loading={isFetching || isLoading}
          className="overflow-hidden"
        />
      </div>
      <div className="flex justify-center mt-5">
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

export default SubscriberListPage;
