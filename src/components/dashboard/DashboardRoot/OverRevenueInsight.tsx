/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetAdminRevenueQuery } from "@/redux/features/admin/adminApi";

const OverRevenueInsight = () => {
  const { data } = useGetAdminRevenueQuery({});

  // Convert API strings to numbers
  const chartData =
    data?.data?.map((item: any) => ({
      month: item.month,
      value: Number(item.value),
    })) || [];

  const formatYAxis = (value: number) => {
    if (value === 0) return "$0";
    if (value < 1000) return `$${value}`;
    return `$${(value / 1000).toFixed(1)}k`;
  };

  return (
    <Card className="w-full mt-5">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Over Revenue Insight
        </CardTitle>
      </CardHeader>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis
              tickFormatter={formatYAxis}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              formatter={(value: number) => [
                `$${value.toLocaleString()}`,
                "Revenue",
              ]}
              labelFormatter={(label) => `${label}`}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#4CAF50"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default OverRevenueInsight;
