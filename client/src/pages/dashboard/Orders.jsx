
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Plus, ExternalLink } from "lucide-react";

export default function Orders() {
  const location = useLocation();

  const [orders] = useState(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("demoOrders") || "[]"
      );

      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  return (
    <div className="mx-auto max-w-7xl space-y-7">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold tracking-widest text-violet-400">
            ORDER MANAGEMENT
          </p>
          <h1 className="mt-2 text-3xl font-bold">My Orders</h1>
          <p className="mt-2 text-gray-400">
            View and manage your campaign requests.
          </p>
        </div>

        <Link
          to="/dashboard/new-order"
          className="flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-semibold hover:bg-violet-500"
        >
          <Plus size={18} />
          New Order
        </Link>
      </div>

      {location.state?.orderCreated && (
        <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
          Your demo order has been submitted successfully!
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm text-gray-400">Total Orders</p>
          <h2 className="mt-2 text-3xl font-bold">{orders.length}</h2>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm text-gray-400">Pending Review</p>
          <h2 className="mt-2 text-3xl font-bold">
            {orders.filter((o) => o.status === "Pending Review").length}
          </h2>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-sm text-gray-400">Total Order Value</p>
          <h2 className="mt-2 text-3xl font-bold">
            ₹{orders.reduce((sum, o) => sum + Number(o.amount || 0), 0).toLocaleString("en-IN")}
          </h2>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-5 py-16 text-center">
          <div className="rounded-2xl bg-violet-500/10 p-5 text-violet-400">
            <ShoppingBag size={35} />
          </div>

          <h2 className="mt-5 text-xl font-bold">No Orders Yet</h2>

          <p className="mt-2 max-w-md text-sm text-gray-400">
            You haven't submitted any campaign requests yet.
            Create your first order to see it here.
          </p>

          <Link
            to="/dashboard/new-order"
            className="mt-6 rounded-xl bg-violet-600 px-6 py-3 font-semibold hover:bg-violet-500"
          >
            Create Your First Order
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
          <div className="border-b border-white/10 p-5">
            <h2 className="font-bold">Order History</h2>
            <p className="mt-1 text-sm text-gray-400">
              Your submitted campaign requests
            </p>
          </div>

          <div className="divide-y divide-white/10">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-violet-400">
                    {order.id}
                  </p>

                  <h3 className="mt-1 font-semibold text-white">
                    {order.service}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
                    {order.platform} · {order.date} · Quantity: {order.quantity}
                  </p>

                  {order.campaignUrl && (
                    <a
                      href={order.campaignUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 break-all text-xs text-violet-400 hover:text-violet-300"
                    >
                      View campaign URL <ExternalLink size={12} />
                    </a>
                  )}
                </div>

                <div className="flex items-center justify-between gap-4 md:justify-end">
                  <div>
                    <p className="font-bold">
                      ₹{Number(order.amount).toLocaleString("en-IN")}
                    </p>
                    <span className="mt-1 inline-block rounded-full bg-yellow-500/10 px-3 py-1 text-xs text-yellow-400">
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500">
        Demo orders are stored in this browser only. They are not sent to a server or provider.
      </p>
    </div>
  );
}
