/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useGetVendorDashboardPieChartInfoQuery } from "@/redux/features/vendor/vendorApi";

const COLORS = ["#F8B195", "#1E5631"];

const VendorActivitiesReports = () => {
  const { data } = useGetVendorDashboardPieChartInfoQuery({});

  // Normalize null → 0
  const stats =
    data?.data?.[1]?.map((item: any) => ({
      ...item,
      value: item.value ?? 0,
    })) || [];

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

      <div className="h-[220px] flex items-center justify-center">
        {stats.length === 0 || stats.every((item: any) => item.value === 0) ? (
          <p className="text-gray-500 text-sm font-medium">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={85}
                innerRadius={40}
                fill="#8884d8"
                dataKey="value"
              >
                {stats.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}`, "Count"]} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value, entry, index) => (
                  <span className="text-sm">
                    {stats[index]?.value} {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </Card>
  );
};

export default VendorActivitiesReports;
