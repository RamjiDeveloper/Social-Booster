
import { useEffect, useMemo, useState } from "react";
import {
  Wallet as WalletIcon,
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  IndianRupee,
  CreditCard,
  History,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  Search,
  RefreshCw,
} from "lucide-react";

const BALANCE_KEY = "walletBalance";
const TRANSACTIONS_KEY = "walletTransactions";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0);

const formatDate = (date) =>
  new Date(date).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export default function Wallet() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedBalance = Number(localStorage.getItem(BALANCE_KEY));
    const savedTransactions = JSON.parse(
      localStorage.getItem(TRANSACTIONS_KEY) || "[]"
    );

    setBalance(Number.isFinite(savedBalance) ? savedBalance : 0);
    setTransactions(
      Array.isArray(savedTransactions) ? savedTransactions : []
    );
  }, []);

  const totalAdded = useMemo(
    () =>
      transactions
        .filter((item) => item.type === "credit")
        .reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [transactions]
  );

  const totalSpent = useMemo(
    () =>
      transactions
        .filter((item) => item.type === "debit")
        .reduce((sum, item) => sum + Number(item.amount || 0), 0),
    [transactions]
  );

  const filteredTransactions = useMemo(() => {
    return transactions.filter((item) => {
      const matchesFilter =
        filter === "all" || item.type === filter;

      const matchesSearch =
        `${item.id} ${item.description} ${item.type}`
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    });
  }, [transactions, filter, search]);

  const handleAddFunds = (e) => {
    e.preventDefault();

    const addAmount = Number(amount);

    if (!Number.isFinite(addAmount) || addAmount < 100) {
      setMessage("Minimum amount must be ₹100.");
      return;
    }

    if (addAmount > 50000) {
      setMessage("Maximum demo amount is ₹50,000.");
      return;
    }

    const newTransaction = {
      id: `TXN-${Date.now()}`,
      type: "credit",
      description: "Demo wallet top-up",
      amount: addAmount,
      status: "Completed",
      date: new Date().toISOString(),
    };

    const newBalance = balance + addAmount;
    const updatedTransactions = [
      newTransaction,
      ...transactions,
    ];

    setBalance(newBalance);
    setTransactions(updatedTransactions);

    localStorage.setItem(BALANCE_KEY, String(newBalance));
    localStorage.setItem(
      TRANSACTIONS_KEY,
      JSON.stringify(updatedTransactions)
    );

    setAmount("");
    setMessage("");
    setShowAddFunds(false);
  };

  const resetDemoWallet = () => {
    const confirmReset = window.confirm(
      "Are you sure you want to reset your demo wallet?"
    );

    if (!confirmReset) return;

    setBalance(0);
    setTransactions([]);
    localStorage.removeItem(BALANCE_KEY);
    localStorage.removeItem(TRANSACTIONS_KEY);
  };

  const stats = [
    {
      title: "Available Balance",
      value: formatCurrency(balance),
      icon: WalletIcon,
      description: "Current wallet balance",
    },
    {
      title: "Total Added",
      value: formatCurrency(totalAdded),
      icon: ArrowDownLeft,
      description: "Total demo funds added",
    },
    {
      title: "Total Spent",
      value: formatCurrency(totalSpent),
      icon: ArrowUpRight,
      description: "Recorded wallet debits",
    },
  ];

  return (
    <div className="min-h-screen space-y-7 bg-[#09090f] p-4 text-white sm:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-purple-400">
            ACCOUNT MANAGEMENT
          </p>

          <h1 className="text-2xl font-bold sm:text-3xl">
            My Wallet
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Manage your balance and track your transactions.
          </p>
        </div>

        <button
          onClick={() => {
            setMessage("");
            setShowAddFunds(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold transition hover:bg-purple-500"
        >
          <Plus size={19} />
          Add Funds
        </button>
      </div>

      {/* Demo Notice */}
      <div className="flex gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
        <AlertTriangle
          className="mt-0.5 shrink-0 text-yellow-400"
          size={20}
        />

        <div>
          <p className="font-semibold text-yellow-300">
            Demo Wallet
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Funds added here are simulated. No real payment is
            processed. Payment gateway integration will be added
            with the backend.
          </p>
        </div>
      </div>

      {/* Wallet Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-white/10 bg-[#12121b] p-5"
            >
              <div className="flex items-center justify-between">
                <div className="rounded-xl bg-purple-500/10 p-3">
                  <Icon className="text-purple-400" size={22} />
                </div>

                {index === 0 && (
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                    Active
                  </span>
                )}
              </div>

              <p className="mt-5 text-sm text-gray-400">
                {item.title}
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                {item.value}
              </h2>

              <p className="mt-2 text-xs text-gray-500">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Low Balance Alert */}
      {balance < 500 && (
        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5 sm:flex-row sm:items-center">
          <div className="flex gap-3">
            <AlertTriangle className="shrink-0 text-orange-400" />

            <div>
              <h3 className="font-semibold text-orange-300">
                Low Wallet Balance
              </h3>
              <p className="mt-1 text-sm text-gray-400">
                Your balance is below ₹500. Add funds before
                placing your next campaign order.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowAddFunds(true)}
            className="shrink-0 rounded-lg border border-orange-500/30 px-4 py-2 text-sm font-semibold text-orange-300 hover:bg-orange-500/10"
          >
            Add Funds
          </button>
        </div>
      )}

      {/* Wallet Activity */}
      <div className="grid gap-5 lg:grid-cols-3">

        {/* Wallet Card */}
        <div className="relative overflow-hidden rounded-2xl border border-purple-400/20 bg-gradient-to-br from-[#5522a5] via-[#32136c] to-[#17112d] p-6 lg:col-span-1">
          <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full bg-purple-300/10 blur-2xl" />
          <div className="absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-purple-400/10 blur-2xl" />

          <div className="relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <WalletIcon size={22} />
                <span className="font-semibold">SocialBooster</span>
              </div>

              <CreditCard size={25} className="text-purple-200" />
            </div>

            <p className="mt-10 text-sm text-purple-200">
              Available Balance
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {formatCurrency(balance)}
            </h2>

            <div className="mt-10 flex items-end justify-between">
              <div>
                <p className="text-xs text-purple-200">
                  WALLET TYPE
                </p>
                <p className="mt-1 font-semibold">
                  Demo Wallet
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs text-purple-200">
                  CURRENCY
                </p>
                <p className="mt-1 font-semibold">INR ₹</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Add Funds */}
        <div className="rounded-2xl border border-white/10 bg-[#12121b] p-6 lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-purple-500/10 p-3">
              <IndianRupee className="text-purple-400" size={22} />
            </div>

            <div>
              <h3 className="font-semibold">Quick Add Funds</h3>
              <p className="text-sm text-gray-400">
                Select an amount to simulate a wallet top-up.
              </p>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[500, 1000, 2000, 5000].map((value) => (
              <button
                key={value}
                onClick={() => {
                  setAmount(String(value));
                  setMessage("");
                  setShowAddFunds(true);
                }}
                className="rounded-xl border border-white/10 bg-[#191923] px-3 py-4 font-semibold transition hover:border-purple-500 hover:bg-purple-500/10"
              >
                ₹{value.toLocaleString("en-IN")}
              </button>
            ))}
          </div>

          <div className="mt-6 rounded-xl border border-white/5 bg-[#191923] p-4">
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <CheckCircle2 size={17} className="text-green-400" />
              Transaction history is saved in this browser.
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Demo data is stored locally and is not synced across
              devices or accounts.
            </p>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#12121b]">
        <div className="flex flex-col justify-between gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <History size={20} className="text-purple-400" />
              <h2 className="text-lg font-bold">
                Transaction History
              </h2>
            </div>

            <p className="mt-1 text-sm text-gray-400">
              View all your wallet activities.
            </p>
          </div>

          <button
            onClick={resetDemoWallet}
            className="flex items-center gap-2 self-start rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:border-red-500/40 hover:text-red-400 sm:self-auto"
          >
            <RefreshCw size={14} />
            Reset Demo Wallet
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col gap-3 p-5 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-xs">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search transactions..."
              className="w-full rounded-xl border border-white/10 bg-[#191923] py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: "All", value: "all" },
              { label: "Added", value: "credit" },
              { label: "Spent", value: "debit" },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setFilter(item.value)}
                className={`rounded-lg px-4 py-2 text-sm transition ${
                  filter === item.value
                    ? "bg-purple-600 text-white"
                    : "border border-white/10 text-gray-400 hover:bg-white/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[650px] text-left">
            <thead className="bg-[#191923] text-xs uppercase text-gray-500">
              <tr>
                <th className="px-5 py-4 font-medium">Transaction</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Type</th>
                <th className="px-5 py-4 font-medium">Amount</th>
                <th className="px-5 py-4 font-medium">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/5">
              {filteredTransactions.map((item) => (
                <tr
                  key={item.id}
                  className="transition hover:bg-white/[0.02]"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`rounded-lg p-2 ${
                          item.type === "credit"
                            ? "bg-green-500/10"
                            : "bg-red-500/10"
                        }`}
                      >
                        {item.type === "credit" ? (
                          <ArrowDownLeft
                            size={18}
                            className="text-green-400"
                          />
                        ) : (
                          <ArrowUpRight
                            size={18}
                            className="text-red-400"
                          />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white">
                          {item.description}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {item.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-400">
                    {formatDate(item.date)}
                  </td>

                  <td className="px-5 py-4 text-sm capitalize text-gray-300">
                    {item.type === "credit" ? "Added" : "Spent"}
                  </td>

                  <td
                    className={`px-5 py-4 text-sm font-semibold ${
                      item.type === "credit"
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {item.type === "credit" ? "+" : "-"}
                    {formatCurrency(item.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-green-500/10 px-3 py-1 text-xs text-green-400">
                      <CheckCircle2 size={13} />
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-5 py-14 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
                      <History
                        size={22}
                        className="text-purple-400"
                      />
                    </div>

                    <h3 className="mt-4 font-semibold">
                      No transactions found
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Your wallet transactions will appear here.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-white/10 px-5 py-4 text-xs text-gray-500">
          Showing {filteredTransactions.length} of {transactions.length} transactions
        </div>
      </div>

      {/* Add Funds Modal */}
      {showAddFunds && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#15151f] p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Add Demo Funds</h2>
                <p className="mt-1 text-sm text-gray-400">
                  Enter your demo top-up amount.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowAddFunds(false);
                  setMessage("");
                }}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddFunds} className="mt-6">
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Amount (INR)
              </label>

              <div className="relative">
                <IndianRupee
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="number"
                  min="100"
                  max="50000"
                  step="1"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setMessage("");
                  }}
                  placeholder="Enter amount"
                  className="w-full rounded-xl border border-white/10 bg-[#20202b] py-4 pl-11 pr-4 text-lg font-semibold text-white outline-none focus:border-purple-500"
                  required
                />
              </div>

              <p className="mt-2 text-xs text-gray-500">
                Minimum ₹100 · Maximum ₹50,000
              </p>

              {message && (
                <p className="mt-3 text-sm text-red-400">
                  {message}
                </p>
              )}

              <div className="mt-6 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3 text-xs text-yellow-300">
                This is a demo transaction. No real money will be
                charged or transferred.
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddFunds(false);
                    setMessage("");
                  }}
                  className="flex-1 rounded-xl border border-white/10 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-purple-600 py-3 text-sm font-semibold text-white transition hover:bg-purple-500"
                >
                  Add Demo Funds
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
