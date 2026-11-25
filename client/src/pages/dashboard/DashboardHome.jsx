
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Wallet,
  TrendingUp,
  Target,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Eye,
  Users,
  Activity,
} from "lucide-react";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

function getOrders() {
  try {
    const data = JSON.parse(
      localStorage.getItem("demoOrders") || "[]"
    );

    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

const statusStyle = {
  "Pending Review": "bg-yellow-500/10 text-yellow-400",
  "In Progress": "bg-blue-500/10 text-blue-400",
  Completed: "bg-green-500/10 text-green-400",
  Cancelled: "bg-red-500/10 text-red-400",
};

export default function DashboardHome() {
  const orders = getOrders();

  const totalOrders = orders.length;

  const activeOrders = orders.filter((order) =>
    ["Pending Review", "In Progress"].includes(order.status)
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Completed"
  ).length;

  const totalSpent = orders.reduce(
    (sum, order) => sum + Number(order.amount || 0),
    0
  );

  const totalTarget = orders.reduce(
    (sum, order) => sum + Number(order.totalTarget || 0),
    0
  );

  const stats = [
    {
      title: "Total Orders",
      value: totalOrders,
      icon: ShoppingBag,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
    },
    {
      title: "Active Campaigns",
      value: activeOrders,
      icon: Activity,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      title: "Completed Orders",
      value: completedOrders,
      icon: CheckCircle2,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      title: "Total Spent",
      value: formatPrice(totalSpent),
      icon: Wallet,
      color: "text-pink-400",
      bg: "bg-pink-500/10",
    },
  ];

  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 5);

    const [userName, setUserName] = useState("there");

useEffect(() => {
  try {
    const profile = JSON.parse(
      localStorage.getItem("socialBoosterProfile") || "{}"
    );

    if (profile.fullName?.trim()) {
      setUserName(profile.fullName.trim());
    }
  } catch (error) {
    console.error("Unable to load profile:", error);
  }
}, []);

  return (
    <div className="min-h-screen bg-[#09090f] p-4 text-white md:p-7">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Welcome */}
        <section className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-purple-400">
              CUSTOMER DASHBOARD
            </p>

            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              Welcome back, {userName}
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Track your orders, campaigns and spending.
            </p>
          </div>

          <Link
            to="/dashboard/new-order"
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold transition hover:bg-purple-500"
          >
            <Plus size={19} />
            Create New Order
          </Link>
        </section>

        {/* Stats */}
        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-white/10 bg-[#11111b] p-5 transition hover:-translate-y-1 hover:border-purple-500/40"
              >
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl p-3 ${stat.bg}`}>
                    <Icon size={22} className={stat.color} />
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="text-gray-600"
                  />
                </div>

                <p className="mt-5 text-sm text-gray-400">
                  {stat.title}
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {stat.value}
                </h2>
              </div>
            );
          })}
        </section>

        {/* Performance */}
        <section className="grid gap-5 lg:grid-cols-3">

          <div className="rounded-2xl border border-white/10 bg-[#11111b] p-6 lg:col-span-2">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">
                  Campaign Overview
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Your campaign order summary
                </p>
              </div>

              <Target className="text-purple-400" size={25} />
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-white/[0.04] p-5">
                <div className="flex items-center gap-2 text-gray-400">
                  <Eye size={18} />
                  Estimated Target
                </div>

                <h3 className="mt-3 text-3xl font-bold text-purple-300">
                  {totalTarget.toLocaleString("en-IN")}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Sum of targets across your orders
                </p>
              </div>

              <div className="rounded-xl bg-white/[0.04] p-5">
                <div className="flex items-center gap-2 text-gray-400">
                  <Users size={18} />
                  Campaign Orders
                </div>

                <h3 className="mt-3 text-3xl font-bold text-blue-300">
                  {totalOrders}
                </h3>

                <p className="mt-1 text-xs text-gray-500">
                  Total campaigns requested
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/[0.05] p-4">
              <p className="text-sm leading-6 text-yellow-200">
                Estimated targets are campaign objectives, not
                actual delivered results. Real performance data
                will appear after provider and platform reporting
                integration.
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl border border-white/10 bg-[#11111b] p-6">
            <h2 className="text-lg font-bold">Quick Actions</h2>

            <p className="mt-1 text-sm text-gray-400">
              Manage your account quickly.
            </p>

            <div className="mt-6 space-y-3">
              <Link
                to="/dashboard/new-order"
                className="flex items-center justify-between rounded-xl bg-purple-600 p-4 transition hover:bg-purple-500"
              >
                <span className="flex items-center gap-3 font-medium">
                  <Plus size={19} />
                  New Order
                </span>

                <ArrowUpRight size={18} />
              </Link>

              <Link
                to="/dashboard/orders"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-purple-500/50"
              >
                <span className="flex items-center gap-3 font-medium">
                  <ShoppingBag size={19} />
                  My Orders
                </span>

                <ArrowUpRight size={18} />
              </Link>

              <Link
                to="/dashboard/campaigns"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-purple-500/50"
              >
                <span className="flex items-center gap-3 font-medium">
                  <Target size={19} />
                  Campaigns
                </span>

                <ArrowUpRight size={18} />
              </Link>

              <Link
                to="/dashboard/wallet"
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-purple-500/50"
              >
                <span className="flex items-center gap-3 font-medium">
                  <Wallet size={19} />
                  My Wallet
                </span>

                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Recent Orders */}
        <section className="rounded-2xl border border-white/10 bg-[#11111b] p-5 md:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Recent Orders</h2>

              <p className="mt-1 text-sm text-gray-400">
                Your latest campaign requests
              </p>
            </div>

            <Link
              to="/dashboard/orders"
              className="text-sm font-medium text-purple-400 hover:text-purple-300"
            >
              View All →
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="py-12 text-center">
              <ShoppingBag
                size={42}
                className="mx-auto mb-4 text-gray-600"
              />

              <h3 className="text-lg font-semibold">
                No Orders Yet
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                Your campaign orders will appear here.
              </p>

              <Link
                to="/dashboard/new-order"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-500"
              >
                <Plus size={18} />
                Create Your First Order
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px] text-left">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase text-gray-500">
                    <th className="px-3 py-4">Order ID</th>
                    <th className="px-3 py-4">Platform</th>
                    <th className="px-3 py-4">Target</th>
                    <th className="px-3 py-4">Budget</th>
                    <th className="px-3 py-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-white/5 last:border-0"
                    >
                      <td className="px-3 py-4 text-sm font-medium">
                        {order.id}
                      </td>

                      <td className="px-3 py-4 text-sm">
                        {order.platform}
                      </td>

                      <td className="px-3 py-4 text-sm text-purple-300">
                        {Number(order.totalTarget || 0).toLocaleString("en-IN")}
                        {" "}
                        {order.unit || ""}
                      </td>

                      <td className="px-3 py-4 text-sm">
                        {formatPrice(order.amount)}
                      </td>

                      <td className="px-3 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            statusStyle[order.status] ||
                            "bg-white/10 text-gray-300"
                          }`}
                        >
                          {order.status || "Pending Review"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Activity Notice */}
        <section className="flex items-start gap-3 rounded-2xl border border-white/10 bg-[#11111b] p-5">
          <Clock className="mt-1 shrink-0 text-purple-400" />

          <div>
            <h3 className="font-semibold">Campaign Reporting</h3>

            <p className="mt-1 text-sm leading-6 text-gray-400">
              Actual delivery status, performance reports and
              provider updates will be connected to this dashboard
              when the backend campaign system is implemented.
            </p>
          </div>
        </section>

      </div>
    </div>
  );
}
