
import { NavLink } from "react-router-dom";
import { LayoutDashboard, Headset, ShieldCheck, Zap } from "lucide-react";

const menuItems = [
  {
    name: "Overview",
    path: "/admin",
    icon: LayoutDashboard,
    end: true,
  },
  {
    name: "Support Tickets",
    path: "/admin/support",
    icon: Headset,
  },
];

export default function AdminSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0D0B18] p-5 md:flex md:flex-col">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600">
          <Zap size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold">SocialBooster</h2>
          <p className="text-xs text-purple-400">ADMIN PANEL</p>
        </div>
      </div>

      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
        Management
      </p>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-900/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={19} />
              {item.name}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border border-purple-500/20 bg-purple-500/10 p-4">
        <div className="mb-2 flex items-center gap-2 text-purple-300">
          <ShieldCheck size={18} />
          <span className="text-sm font-semibold">Admin Access</span>
        </div>

        <p className="text-xs leading-5 text-gray-400">
          Manage your platform, customers and support operations.
        </p>
      </div>
    </aside>
  );
}
