import DashboardLayout from "@/components/dashboard/DashboardLayout";
import WithRole from "@/role-wrapper/WithRole";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <WithRole allowedRoles={["VENDOR", "SUPER_ADMIN", "USER"]}>
      <DashboardLayout>{children}</DashboardLayout>
    </WithRole>
  );
};

export default layout;
