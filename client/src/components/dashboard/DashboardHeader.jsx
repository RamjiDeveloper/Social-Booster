import { Menu, Bell } from "lucide-react";

export default function DashboardHeader({ onMenuClick }) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-white/10 bg-[#09090f] px-5 md:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="rounded-lg border border-white/10 p-2 text-white lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={21} />
        </button>

        <div>
          <p className="text-sm text-gray-400">Customer Panel</p>
          <h2 className="font-semibold text-white">My Workspace</h2>
        </div>
      </div>

      <button
        className="relative rounded-xl border border-white/10 p-3 text-gray-300 hover:bg-white/5"
        aria-label="Notifications"
      >
        <Bell size={20} />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-violet-500" />
      </button>
    </header>
  );
}