"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { Card, CardHeader } from "@/components/ui/card";
import { useUserRole } from "@/lib/auth";

const COLORS = ["#F8B195", "#1E5631"];

const UserActivitiesReports = () => {
  const pathname = window.location.pathname.split("/")[2];

  const role = useUserRole(pathname);

  // Different data based on user role
  const adminData = [
    { name: "Users have Booked", value: 300 },
    { name: "Gear have been sold", value: 200 },
  ];

  const vendorData = [
    { name: "Users have Booked", value: 120 },
    { name: "Gear have been sold", value: 80 },
  ];

  const data = role === "admin" ? adminData : vendorData;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Card className="w-full bg-green-50/40">
      <CardHeader className="pb-2">
        <h2 className="text-lg font-medium border-b-1 pb-2">
          User Activities Reports
        </h2>
      </CardHeader>
      <>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, ""]} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value, entry, index) => {
                  return (
                    <span className="text-sm">
                      {data[index].value} {value}
                    </span>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </>
    </Card>
  );
};

export default UserActivitiesReports;
