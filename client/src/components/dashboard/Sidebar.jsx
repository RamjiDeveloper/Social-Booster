import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Megaphone,
  Wallet,
  UserRound,
  LogOut,
  Zap,
  X,
  PlusCircle,
  Headset,
} from "lucide-react";

const menuItems = [
  { name: "Overview", path: "/dashboard", icon: LayoutDashboard, end: true },
  { name: "New Order", path: "/dashboard/new-order", icon: PlusCircle },
  { name: "My Orders", path: "/dashboard/orders", icon: ShoppingBag },
  { name: "Campaigns", path: "/dashboard/campaigns", icon: Megaphone },
  { name: "Wallet", path: "/dashboard/wallet", icon: Wallet },
  { name: "My Profile", path: "/dashboard/profile", icon: UserRound },
  { name: "Support", path: "/dashboard/support", icon: Headset },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("demoLoggedIn");
    navigate("/login");
  };

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-[#101019] transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
              <Zap size={22} fill="white" />
            </div>
            <span className="text-xl font-extrabold text-white">
              Social<span className="text-violet-400">Booster</span>
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={22} />
          </button>
        </div>

        <div className="px-5 py-6">
          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Workspace
          </p>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-violet-600 text-white shadow-lg shadow-violet-950/30"
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
        </div>

        <div className="mt-auto border-t border-white/10 p-5">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-400 transition hover:bg-red-500/10"
          >
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}