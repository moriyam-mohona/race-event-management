import NavBar from "@/components/shared/NavBar/NavBar";
import WithRole from "@/role-wrapper/WithRole";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <WithRole allowedRoles={["USER"]}>
        <NavBar />
        <div className="h-full">{children}</div>
      </WithRole>
    </div>
  );
};

export default layout;
