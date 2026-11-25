
import { Bell, ShieldCheck } from "lucide-react";

export default function AdminHeader() {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-white/10 bg-[#0D0B18] px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-lg font-semibold">Admin Control Center</h1>
        <p className="text-xs text-gray-500">
          Manage SocialBooster platform
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-xl border border-white/10 p-2.5 text-gray-400 hover:bg-white/5 hover:text-white"
        >
          <Bell size={19} />
        </button>

        <div className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-600">
            <ShieldCheck size={17} />
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-medium">Administrator</p>
            <p className="text-[11px] text-gray-500">Admin Account</p>
          </div>
        </div>
      </div>
    </header>
  );
}
