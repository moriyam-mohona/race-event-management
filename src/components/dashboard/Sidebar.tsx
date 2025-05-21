import React from "react";
import Link from "next/link";
import { GoPerson } from "react-icons/go";

const sidebars: Record<
  string,
  { name: string; href: string; icon: React.ReactNode }[]
> = {
  admin: [
    { name: "Dashboard", href: "/dashboard", icon: <GoPerson /> },
    { name: "Users", href: "/dashboard/users", icon: <GoPerson /> },
    { name: "Settings", href: "/dashboard/settings", icon: <GoPerson /> },
  ],
  user: [
    { name: "Profile", href: "/dashboard/profile", icon: <GoPerson /> },
    { name: "Community", href: "/dashboard/community", icon: <GoPerson /> },
    { name: "All Events", href: "/dashboard/all-events", icon: <GoPerson /> },
    {
      name: "Saved Events",
      href: "/dashboard/saved-events",
      icon: <GoPerson />,
    },
  ],
  moderator: [
    { name: "Community", href: "/dashboard/community", icon: <GoPerson /> },
    { name: "Reports", href: "/dashboard/reports", icon: <GoPerson /> },
  ],
};

const Sidebar = ({ role }: { role: string }) => {
  const links = sidebars[role] || [];

  return (
    <nav className="space-y-2 mt-24">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <button className="w-full flex items-center justify-center gap-3 border rounded bg-green-50 px-3 py-2 mb-3 ">
            <span className="text-xl">{link.icon}</span> {link.name}
          </button>
        </Link>
      ))}
    </nav>
  );
};

export default Sidebar;
