// components/StatCard.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, CreditCard, Settings, DollarSign, Users } from "lucide-react";
import * as React from "react";

const iconMap: Record<string, React.ReactNode> = {
  wallet: <Wallet className="h-6 w-6 text-white" />,
  "credit-card": <CreditCard className="h-6 w-6 text-white" />,
  settings: <Settings className="h-6 w-6 text-white" />,
  "dollar-sign": <DollarSign className="h-6 w-6 text-white" />,
  users: <Users className="h-6 w-6 text-white" />,
};

export const StatCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) => (
  <Card className="bg-green-50 shadow-sm rounded-2xl">
    <CardContent className="flex items-center gap-4 p-6">
      <div className="rounded-lg bg-green-900 p-3">{iconMap[icon]}</div>
      <div>
        <div className="text-xl font-semibold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
      </div>
    </CardContent>
  </Card>
);
