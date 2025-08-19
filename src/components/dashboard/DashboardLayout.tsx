"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";
import Navbar from "../shared/NavBar/NavBar";
import { GoSidebarCollapse } from "react-icons/go";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const user = useAppSelector(selectCurrentUser);
  const role = user?.role;

  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {/* TopBar */}
      <div className="flex items-center justify-between px-4 py-2 ml-2">
        {/* Mobile Toggle */}
        <button className="lg:hidden mt-24" onClick={() => setMobileOpen(true)}>
          <GoSidebarCollapse className="text-2xl text-green-900" />
        </button>
        <Navbar />
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar - Fixed position */}
        <aside className="w-64 bg-white p-4 hidden lg:block fixed h-[calc(100vh-80px)] top-24 left-0 overflow-y-auto">
          <Sidebar role={role} />
        </aside>

        {/* Mobile Sidebar (slide from left) */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out lg:hidden",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <div className="p-4">
            <Sidebar role={role} />
          </div>
        </div>

        {/* Backdrop for mobile sidebar */}
        {mobileOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Main content - With left margin to account for fixed sidebar */}
        <main className="flex-1 overflow-auto bg-[#F9F9F9] p-4 lg:mt-24 lg:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
}
