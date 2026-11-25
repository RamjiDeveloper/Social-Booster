
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Target,
  Search,
  Eye,
  Wallet,
  Clock,
  CheckCircle2,
  Plus,
  Activity,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);

const statusColors = {
  "Pending Review": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "In Progress": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Completed: "bg-green-500/10 text-green-400 border-green-500/20",
  Cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const platformIcons = {
  Instagram: FaInstagram,
  YouTube: FaYoutube,
  Facebook: FaFacebook
};

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    try {
      const data = JSON.parse(
        localStorage.getItem("demoOrders") || "[]"
      );
      setCampaigns(Array.isArray(data) ? data : []);
    } catch {
      setCampaigns([]);
    }
  }, []);

  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch =
      campaign.id?.toLowerCase().includes(search.toLowerCase()) ||
      campaign.platform?.toLowerCase().includes(search.toLowerCase()) ||
      campaign.objective?.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" ||
      (filter === "Active" &&
        ["Pending Review", "In Progress"].includes(campaign.status)) ||
      campaign.status === filter;

    return matchesSearch && matchesFilter;
  });

  const activeCount = campaigns.filter((item) =>
    ["Pending Review", "In Progress"].includes(item.status)
  ).length;

  const completedCount = campaigns.filter(
    (item) => item.status === "Completed"
  ).length;

  const IconForPlatform = (platform) =>
    platformIcons[platform] || Target;

  return (
    <div className="min-h-screen bg-[#09090f] p-4 text-white md:p-7">
      <div className="mx-auto max-w-7xl space-y-7">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-purple-400">
              CAMPAIGN MANAGEMENT
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              My Campaigns
            </h1>

            <p className="mt-2 text-sm text-gray-400">
              Monitor your campaign requests and their status.
            </p>
          </div>

          <Link
            to="/dashboard/new-order"
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-500"
          >
            <Plus size={18} />
            New Campaign
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#11111b] p-5">
            <Target className="mb-3 text-purple-400" />
            <p className="text-sm text-gray-400">Total Campaigns</p>
            <h2 className="mt-1 text-3xl font-bold">
              {campaigns.length}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#11111b] p-5">
            <Activity className="mb-3 text-blue-400" />
            <p className="text-sm text-gray-400">Active Campaigns</p>
            <h2 className="mt-1 text-3xl font-bold">
              {activeCount}
            </h2>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#11111b] p-5">
            <CheckCircle2 className="mb-3 text-green-400" />
            <p className="text-sm text-gray-400">Completed Campaigns</p>
            <h2 className="mt-1 text-3xl font-bold">
              {completedCount}
            </h2>
          </div>
        </div>

        {/* Search and Filter */}
        <section className="rounded-2xl border border-white/10 bg-[#11111b] p-5">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search campaign, ID or platform..."
                className="w-full rounded-xl border border-white/10 bg-[#09090f] py-3 pl-11 pr-4 text-white outline-none focus:border-purple-500"
              />
            </div>

            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="rounded-xl border border-white/10 bg-[#09090f] px-4 py-3 text-white outline-none focus:border-purple-500"
            >
              <option value="All">All Campaigns</option>
              <option value="Active">Active</option>
              <option value="Pending Review">Pending Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </section>

        {/* Campaign List */}
        <section className="space-y-4">
          {filteredCampaigns.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-[#11111b] py-14 text-center">
              <Target
                size={44}
                className="mx-auto mb-4 text-gray-600"
              />

              <h2 className="text-xl font-semibold">
                No Campaigns Found
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Create a campaign to see it here.
              </p>

              <Link
                to="/dashboard/new-order"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold hover:bg-purple-500"
              >
                <Plus size={18} />
                Create Campaign
              </Link>
            </div>
          ) : (
            filteredCampaigns.map((campaign) => {
              const PlatformIcon = IconForPlatform(campaign.platform);

              return (
                <article
                  key={campaign.id}
                  className="rounded-2xl border border-white/10 bg-[#11111b] p-5 transition hover:border-purple-500/30"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="rounded-xl bg-purple-500/10 p-3 text-purple-300">
                        <PlatformIcon size={24} />
                      </div>

                      <div>
                        <h2 className="text-lg font-bold">
                          {campaign.objective}
                        </h2>

                        <p className="mt-1 text-sm text-gray-400">
                          {campaign.platform} · {campaign.id}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full border px-3 py-1 text-xs ${
                        statusColors[campaign.status] ||
                        "border-white/10 bg-white/5 text-gray-300"
                      }`}
                    >
                      {campaign.status || "Pending Review"}
                    </span>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl bg-white/[0.04] p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Eye size={16} />
                        Estimated Target
                      </div>

                      <p className="mt-2 text-xl font-bold text-purple-300">
                        {Number(campaign.totalTarget || 0).toLocaleString("en-IN")}
                      </p>

                      <p className="text-xs text-gray-500">
                        {campaign.unit}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/[0.04] p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Wallet size={16} />
                        Campaign Budget
                      </div>

                      <p className="mt-2 text-xl font-bold">
                        {formatPrice(campaign.amount)}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/[0.04] p-4">
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock size={16} />
                        Created On
                      </div>

                      <p className="mt-2 text-base font-semibold">
                        {campaign.date || "Not available"}
                      </p>
                    </div>
                  </div>

                  {campaign.urls?.length > 0 && (
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="mb-2 text-sm text-gray-400">
                        Campaign Content
                      </p>

                      {campaign.urls.map((url, index) => (
                        <a
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noreferrer"
                          className="mb-1 block break-all text-sm text-purple-300 hover:underline"
                        >
                          {url}
                        </a>
                      ))}
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <p className="text-xs text-gray-500">
                      {campaign.packageName || "Custom Target"}
                    </p>

                    <p className="text-xs text-yellow-300">
                      Estimated target only — actual results may vary.
                    </p>
                  </div>
                </article>
              );
            })
          )}
        </section>
      </div>
    </div>
  );
}
