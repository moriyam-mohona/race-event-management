import NavBar from "@/components/shared/NavBar/NavBar";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <NavBar />
      <div className="h-full">{children}</div>
    </div>
  );
};

export default layout;
