import { Button } from "@/components/ui/button";
import Link from "next/link";

const sidebars: Record<string, { name: string; href: string }[]> = {
  admin: [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Users", href: "/dashboard/users" },
    { name: "Settings", href: "/dashboard/settings" },
  ],
  user: [
    { name: "Profile", href: "/dashboard/profile" },
    { name: "Events", href: "/dashboard/events" },
    { name: "Saved", href: "/dashboard/saved" },
  ],
  moderator: [
    { name: "Community", href: "/dashboard/community" },
    { name: "Reports", href: "/dashboard/reports" },
  ],
};

const Sidebar = ({ role }: { role: string }) => {
  const links = sidebars[role] || [];

  return (
    <nav className="space-y-2 bg-red-300 mt-24">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <Button variant="ghost" className="w-full justify-start">
            {link.name}
          </Button>
        </Link>
      ))}
    </nav>
  );
};

export default Sidebar;
