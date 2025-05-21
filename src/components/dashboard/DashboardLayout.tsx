"use client";

import { ReactNode, useState } from "react";
import { useUserRole } from "@/lib/auth";
import Sidebar from "./Sidebar";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "../shared/NavBar/NavBar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const role = useUserRole();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col">
      {/* Topbar */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-white">
        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mt-32"
          onClick={() => setMobileOpen(true)}
        >
          <Menu />
        </Button>
        <Navbar />
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-white p-4 hidden md:block">
          <Sidebar role={role} />
        </aside>

        {/* Mobile Sidebar (slide from left) */}
        <div
          className={cn(
            "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out md:hidden",
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
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-[#F9F9F9] p-4 mt-24">
          {children}
        </main>
      </div>
    </div>
  );
}
