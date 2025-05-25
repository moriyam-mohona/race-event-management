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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserRole } from "@/lib/auth";

const OverRevenueInsight = () => {
  const pathname = window.location.pathname.split("/")[2];

  const role = useUserRole(pathname);

  // Different data based on user role
  const adminData = [
    { name: "Jan", value: 5000 },
    { name: "Feb", value: 8000 },
    { name: "Mar", value: 12000 },
    { name: "Apr", value: 16000 },
    { name: "May", value: 25000 },
    { name: "Jun", value: 28000 },
    { name: "Jul", value: 26000 },
    { name: "Aug", value: 38000 },
    { name: "Sep", value: 48000 },
    { name: "Oct", value: 52000 },
    { name: "Nov", value: 45000 },
    { name: "Dec", value: 55000 },
  ];

  const vendorData = [
    { name: "Jan", value: 2000 },
    { name: "Feb", value: 3500 },
    { name: "Mar", value: 5000 },
    { name: "Apr", value: 7000 },
    { name: "May", value: 10000 },
    { name: "Jun", value: 12000 },
    { name: "Jul", value: 11000 },
    { name: "Aug", value: 15000 },
    { name: "Sep", value: 20000 },
    { name: "Oct", value: 22000 },
    { name: "Nov", value: 19000 },
    { name: "Dec", value: 23000 },
  ];

  const data = role === "admin" ? adminData : vendorData;

  const formatYAxis = (value: any) => {
    if (value === 0) return "$0";
    if (value < 1000) return `$${value}`;
    return `$${value / 1000}k`;
  };

  return (
    <Card className="w-full mt-5">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">
          Over Revenue Insight
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis
                tickFormatter={formatYAxis}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip
                formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
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
      </CardContent>
    </Card>
  );
};

export default OverRevenueInsight;
