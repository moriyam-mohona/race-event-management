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

const COLORS = ["#F8B195", "#1E5631", "#2E7D32"];

const UploadedRaceReport = () => {
  const pathname = window.location.pathname.split("/")[2];

  const role = useUserRole(pathname);

  // Different data based on user role
  const adminData = [
    { name: "Uploaded Events", value: 5 },
    { name: "Active Event", value: 1 },
    { name: "Active Gears", value: 21 },
  ];

  const vendorData = [
    { name: "Uploaded Events", value: 3 },
    { name: "Active Event", value: 1 },
    { name: "Active Gears", value: 12 },
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
    <Card className="w-full">
      <CardHeader className="pb-2">
        <h2 className="text-lg font-medium">Uploaded Race Report</h2>
      </CardHeader>

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
                    {data[index].value.toString().padStart(2, "0")} {value}
                  </span>
                );
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default UploadedRaceReport;
