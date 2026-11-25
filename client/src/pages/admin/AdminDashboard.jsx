
import { useEffect, useState } from "react";
import {
  Users,
  ShoppingBag,
  Wallet,
  Headset,
  ArrowUpRight,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const savedOrders = JSON.parse(
      localStorage.getItem("demoOrders") || "[]"
    );

    const savedTickets = JSON.parse(
      localStorage.getItem("socialBoosterTickets") || "[]"
    );

    setOrders(Array.isArray(savedOrders) ? savedOrders : []);
    setTickets(Array.isArray(savedTickets) ? savedTickets : []);
  }, []);

  const totalRevenue = orders.reduce(
    (total, order) => total + Number(order.amount || 0),
    0
  );

  const openTickets = tickets.filter(
    (ticket) => (ticket.status || "Open") === "Open"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  const stats = [
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "text-purple-400",
    },
    {
      title: "Demo Order Value",
      value: `₹${totalRevenue.toLocaleString("en-IN")}`,
      icon: Wallet,
      color: "text-green-400",
    },
    {
      title: "Open Tickets",
      value: openTickets,
      icon: Headset,
      color: "text-blue-400",
    },
    {
      title: "Resolved Tickets",
      value: resolvedTickets,
      icon: CheckCircle2,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-purple-400">
          SOCIALBOOSTER ADMIN
        </p>

        <h1 className="mt-2 text-3xl font-bold">
          Admin Overview
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Monitor orders and manage customer support.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-white/10 bg-[#100E1C] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  {stat.title}
                </p>

                <Icon size={22} className={stat.color} />
              </div>

              <h2 className="mt-5 text-3xl font-bold">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-[#100E1C] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Recent Orders
            </h2>

            <ShoppingBag className="text-purple-400" size={20} />
          </div>

          {orders.length > 0 ? (
            <div className="mt-5 space-y-3">
              {orders.slice(0, 5).map((order, index) => (
                <div
                  key={order.id || index}
                  className="flex items-center justify-between gap-3 border-b border-white/5 pb-3"
                >
                  <div>
                    <p className="text-sm font-medium">
                      {order.platform} - {order.objective}
                    </p>

                    <p className="mt-1 text-xs text-gray-500">
                      {order.id || "Order"}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-purple-400">
                    ₹{Number(order.amount || 0).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-gray-500">
              No demo orders available yet.
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#100E1C] p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">
              Support Overview
            </h2>

            <Headset className="text-purple-400" size={20} />
          </div>

          <div className="mt-6 space-y-5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-gray-400">
                <Clock size={17} />
                Open Tickets
              </span>

              <span className="font-semibold">{openTickets}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle2 size={17} />
                Resolved Tickets
              </span>

              <span className="font-semibold">{resolvedTickets}</span>
            </div>
          </div>

          <Link
            to="/admin/support"
            className="mt-8 flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold transition hover:bg-purple-500"
          >
            Manage Support Tickets
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4">
        <p className="text-sm font-semibold text-yellow-400">
          Demo Data Notice
        </p>

        <p className="mt-1 text-xs leading-5 text-gray-400">
          These figures are read from browser localStorage.
          They are not verified payments, actual revenue, or
          platform-wide customer statistics.
        </p>
      </div>
    </div>
  );
}
