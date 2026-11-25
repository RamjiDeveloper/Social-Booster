import { useEffect, useMemo, useState } from "react";
import {
  Headset,
  Ticket,
  Plus,
  Search,
  ChevronDown,
  ChevronUp,
  Send,
  Clock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Megaphone,
  UserRound,
  MessageCircle,
  FileText,
  X,
  MessageSquare,
} from "lucide-react";

const TICKET_KEY = "socialBoosterTickets";

const faqs = [
  {
    category: "Orders",
    question: "How can I place a new campaign order?",
    answer:
      "Open New Order from your dashboard, select a platform and campaign objective, choose a package or custom target, enter your campaign URL and submit your order.",
  },
  {
    category: "Orders",
    question: "Where can I check my order status?",
    answer:
      "You can check your order status from My Orders or Campaigns in your dashboard. Actual campaign status updates will be available after backend integration.",
  },
  {
    category: "Payments",
    question: "My payment failed. What should I do?",
    answer:
      "Check your payment confirmation first. If money was deducted but your order was not created, submit a Payment Issue ticket with your transaction reference. Never share your OTP, PIN or password.",
  },
  {
    category: "Payments",
    question: "How can I request a refund?",
    answer:
      "Submit a Payment Issue ticket with your order ID and payment reference. Refund eligibility will be reviewed according to the applicable refund policy.",
  },
  {
    category: "Campaigns",
    question: "Are campaign results guaranteed?",
    answer:
      "No. Campaign targets are estimates, not guaranteed results. Actual reach and engagement depend on platform algorithms, audience response, campaign setup and other factors.",
  },
  {
    category: "Account",
    question: "How can I update my profile?",
    answer:
      "Open My Profile from your dashboard, update your personal details and click Save Changes.",
  },
];

const categories = [
  { label: "All", value: "All" },
  { label: "Orders", value: "Orders" },
  { label: "Payments", value: "Payments" },
  { label: "Campaigns", value: "Campaigns" },
  { label: "Account", value: "Account" },
];

const issueTypes = [
  "Order Issue",
  "Payment Issue",
  "Campaign Issue",
  "Account Issue",
  "Other",
];

const statusStyles = {
  Open: "bg-yellow-500/10 text-yellow-400",
  "In Progress": "bg-blue-500/10 text-blue-400",
  Resolved: "bg-green-500/10 text-green-400",
};

export default function Support() {
  const [tickets, setTickets] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [activeFaq, setActiveFaq] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [message, setMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [replyDraft, setReplyDraft] = useState("");

  const [form, setForm] = useState({
    subject: "",
    category: "Order Issue",
    orderId: "",
    description: "",
  });

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(TICKET_KEY) || "[]");
      setTickets(Array.isArray(saved) ? saved : []);
    } catch {
      setTickets([]);
    }
  }, []);

  const saveTickets = (updatedTickets) => {
    setTickets(updatedTickets);
    localStorage.setItem(TICKET_KEY, JSON.stringify(updatedTickets));
  };

  const handleCustomerReply = (ticketId) => {
    const replyMessage = replyDraft.trim();

    if (!replyMessage) return;

    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id !== ticketId) return ticket;

      const newReply = {
        id: `REPLY-${Date.now()}`,
        sender: "customer",
        message: replyMessage,
        createdAt: new Date().toISOString(),
      };

      return {
        ...ticket,
        replies: [...(ticket.replies || []), newReply],
        status: ticket.status === "Resolved" ? "Open" : ticket.status || "Open",
      };
    });

    saveTickets(updatedTickets);
    setReplyDraft("");
    setMessage("Your reply has been sent successfully.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (form.subject.trim().length < 5) {
      setFormError("Subject must contain at least 5 characters.");
      return;
    }

    if (form.description.trim().length < 15) {
      setFormError("Please explain your issue in at least 15 characters.");
      return;
    }

    const newTicket = {
      id: `SB-${Date.now()}`,
      subject: form.subject.trim(),
      category: form.category,
      orderId: form.orderId.trim(),
      description: form.description.trim(),
      status: "Open",
      createdAt: new Date().toISOString(),
      replies: [],
    };

    saveTickets([newTicket, ...tickets]);

    setForm({
      subject: "",
      category: "Order Issue",
      orderId: "",
      description: "",
    });

    setShowForm(false);
    setMessage("Your demo support ticket has been created.");
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter((faq) => {
      const matchesCategory =
        activeCategory === "All" || faq.category === activeCategory;

      const matchesSearch = `${faq.question} ${faq.answer} ${faq.category}`
        .toLowerCase()
        .includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open",
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress",
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved",
  ).length;

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen space-y-7 bg-[#09090f] p-4 text-white sm:p-6 lg:p-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm font-medium text-purple-400">
            CUSTOMER CARE
          </p>
          <h1 className="text-2xl font-bold sm:text-3xl">Support Center</h1>
          <p className="mt-2 text-sm text-gray-400">
            Need help? Find answers or submit a support request.
          </p>
        </div>

        <button
          onClick={() => {
            setMessage("");
            setFormError("");
            setShowForm(true);
          }}
          className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 font-semibold transition hover:bg-purple-500"
        >
          <Plus size={19} />
          Create Ticket
        </button>
      </div>

      {/* Demo notice */}
      <div className="flex gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
        <AlertCircle className="mt-0.5 shrink-0 text-yellow-400" size={20} />
        <div>
          <p className="font-semibold text-yellow-300">Demo Support System</p>
          <p className="mt-1 text-sm text-gray-400">
            Tickets are currently saved in this browser. They are not sent to a
            support agent yet. Admin replies and email notifications will be
            connected through the backend.
          </p>
        </div>
      </div>

      {/* Success message */}
      {message && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
          <span className="flex items-center gap-2">
            <CheckCircle2 size={18} />
            {message}
          </span>
          <button onClick={() => setMessage("")}>
            <X size={17} />
          </button>
        </div>
      )}

      {/* Hero */}
      <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-r from-[#29104c] via-[#21143d] to-[#11111b] p-6 sm:p-9">
        <div className="absolute -right-10 -top-16 h-64 w-64 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-500/20">
            <Headset size={27} className="text-purple-300" />
          </div>

          <h2 className="text-2xl font-bold sm:text-3xl">
            How can we help you?
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-300">
            Find answers to common questions or create a support ticket for your
            order, payment, campaign or account.
          </p>

          <button
            onClick={() => {
              setMessage("");
              setShowForm(true);
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-purple-900 transition hover:bg-purple-100"
          >
            <MessageCircle size={18} />
            Contact Support
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total Tickets",
            value: tickets.length,
            icon: Ticket,
            color: "text-purple-400",
          },
          {
            label: "Open Tickets",
            value: openTickets,
            icon: Clock,
            color: "text-yellow-400",
          },
          {
            label: "In Progress",
            value: inProgressTickets,
            icon: AlertCircle,
            color: "text-blue-400",
          },
          {
            label: "Resolved",
            value: resolvedTickets,
            icon: CheckCircle2,
            color: "text-green-400",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="rounded-2xl border border-white/10 bg-[#12121b] p-5"
            >
              <Icon size={22} className={item.color} />
              <p className="mt-4 text-sm text-gray-400">{item.label}</p>
              <h3 className="mt-1 text-2xl font-bold">{item.value}</h3>
            </div>
          );
        })}
      </div>

      {/* Ticket history */}
      <div className="rounded-2xl border border-white/10 bg-[#12121b] p-5 sm:p-6">
        <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold">My Support Tickets</h2>
            <p className="mt-1 text-sm text-gray-400">
              Track the support requests you have submitted.
            </p>
          </div>
          <span className="text-sm text-gray-500">
            {tickets.length} ticket(s)
          </span>
        </div>

        {tickets.length === 0 ? (
          <div className="rounded-xl border border-dashed border-white/10 py-12 text-center">
            <Ticket size={32} className="mx-auto text-gray-500" />
            <h3 className="mt-4 font-semibold">No support tickets yet</h3>
            <p className="mt-2 text-sm text-gray-500">
              Create a ticket if you need help with anything.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="mt-5 rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold hover:bg-purple-500"
            >
              Create Your First Ticket
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="rounded-xl border border-white/10 bg-[#191923] p-4"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-purple-400">
                        {ticket.id}
                      </span>
                      <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-gray-400">
                        {ticket.category}
                      </span>
                    </div>
                    <h3 className="mt-2 font-semibold">{ticket.subject}</h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {formatDate(ticket.createdAt)}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                        statusStyles[ticket.status] || statusStyles.Open
                      }`}
                    >
                      {ticket.status}
                    </span>

                    <button
                      onClick={() =>
                        setSelectedTicket(
                          selectedTicket?.id === ticket.id ? null : ticket,
                        )
                      }
                      className="rounded-lg border border-white/10 p-2 text-gray-400 hover:text-white"
                    >
                      {selectedTicket?.id === ticket.id ? (
                        <ChevronUp size={17} />
                      ) : (
                        <ChevronDown size={17} />
                      )}
                    </button>
                  </div>
                </div>

                {selectedTicket?.id === ticket.id && (
                  <div className="mt-4 border-t border-white/10 pt-4">
                    {/* Original Ticket */}
                    <p className="text-xs font-semibold uppercase text-gray-500">
                      Description
                    </p>

                    <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-300">
                      {ticket.description}
                    </p>

                    {ticket.orderId && (
                      <p className="mt-3 text-sm text-gray-400">
                        Related Order: {ticket.orderId}
                      </p>
                    )}

                    {/* Conversation */}
                    <div className="mt-6">
                      <h4 className="mb-4 flex items-center gap-2 font-semibold text-white">
                        <MessageCircle size={18} className="text-purple-400" />
                        Conversation ({ticket.replies?.length || 0})
                      </h4>

                      {ticket.replies?.length > 0 ? (
                        <div className="space-y-3">
                          {ticket.replies.map((reply) => (
                            <div
                              key={reply.id}
                              className={`rounded-xl border p-4 ${
                                reply.sender === "admin"
                                  ? "border-purple-500/20 bg-purple-500/5"
                                  : "border-white/10 bg-white/5"
                              }`}
                            >
                              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                <span className="text-xs font-semibold text-purple-300">
                                  {reply.sender === "admin"
                                    ? "SocialBooster Support"
                                    : "You"}
                                </span>

                                <span className="text-xs text-gray-500">
                                  {formatDate(reply.createdAt)}
                                </span>
                              </div>

                              <p className="whitespace-pre-wrap text-sm leading-6 text-gray-200">
                                {reply.message}
                              </p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="rounded-xl bg-white/5 p-4 text-sm text-gray-500">
                          No replies yet. Start the conversation with our
                          support team.
                        </p>
                      )}
                    </div>

                    {/* Customer Reply Form */}
                    <div className="mt-5 border-t border-white/10 pt-5">
                      <label className="mb-2 block text-sm font-semibold text-white">
                        Send a Message
                      </label>

                      <textarea
                        value={replyDraft}
                        onChange={(e) => setReplyDraft(e.target.value)}
                        rows={3}
                        maxLength={1000}
                        placeholder="Write your message..."
                        className="w-full resize-y rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500"
                      />

                      <div className="mt-3 flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleCustomerReply(ticket.id)}
                          disabled={!replyDraft.trim()}
                          className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <Send size={15} />
                          Send Message
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAQs */}
      <div className="rounded-2xl border border-white/10 bg-[#12121b] p-5 sm:p-6">
        <div className="mb-6">
          <p className="text-sm font-medium text-purple-400">HELP CENTER</p>
          <h2 className="mt-2 text-xl font-bold">Frequently Asked Questions</h2>
          <p className="mt-1 text-sm text-gray-400">
            Quick answers to common questions.
          </p>
        </div>

        <div className="relative mb-5">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="w-full rounded-xl border border-white/10 bg-[#191923] py-3 pl-11 pr-4 text-sm outline-none focus:border-purple-500"
          />
        </div>

        <div className="mb-5 flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item.value}
              onClick={() => setActiveCategory(item.value)}
              className={`rounded-lg px-4 py-2 text-sm transition ${
                activeCategory === item.value
                  ? "bg-purple-600 text-white"
                  : "border border-white/10 text-gray-400 hover:bg-white/5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => (
            <div
              key={faq.question}
              className="overflow-hidden rounded-xl border border-white/10 bg-[#191923]"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-4 text-left"
              >
                <div>
                  <span className="text-xs text-purple-400">
                    {faq.category}
                  </span>
                  <p className="mt-1 text-sm font-medium">{faq.question}</p>
                </div>
                {activeFaq === index ? (
                  <ChevronUp size={19} className="shrink-0 text-purple-400" />
                ) : (
                  <ChevronDown size={19} className="shrink-0 text-gray-400" />
                )}
              </button>

              {activeFaq === index && (
                <div className="border-t border-white/10 px-4 py-4 text-sm leading-6 text-gray-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}

          {filteredFaqs.length === 0 && (
            <p className="py-8 text-center text-sm text-gray-500">
              No matching questions found.
            </p>
          )}
        </div>
      </div>

      {/* Help categories */}
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Order Support",
            description: "Problems with order creation or campaign status.",
            icon: Megaphone,
            category: "Order Issue",
          },
          {
            title: "Payment Support",
            description: "Payment failures, deductions and refund requests.",
            icon: CreditCard,
            category: "Payment Issue",
          },
          {
            title: "Account Support",
            description: "Profile and account-related questions.",
            icon: UserRound,
            category: "Account Issue",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.title}
              onClick={() => {
                setForm((prev) => ({ ...prev, category: item.category }));
                setShowForm(true);
              }}
              className="rounded-2xl border border-white/10 bg-[#12121b] p-5 text-left transition hover:border-purple-500/40"
            >
              <Icon size={23} className="text-purple-400" />
              <h3 className="mt-4 font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-400">
                {item.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-purple-400">
                Get Help <Send size={14} />
              </span>
            </button>
          );
        })}
      </div>

      {/* Create Ticket Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/75 p-4 backdrop-blur-sm">
          <div className="my-auto w-full max-w-xl rounded-2xl border border-white/10 bg-[#15151f] p-5 shadow-2xl sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-purple-400">
                  CUSTOMER SUPPORT
                </p>
                <h2 className="mt-1 text-xl font-bold">
                  Create Support Ticket
                </h2>
                <p className="mt-1 text-sm text-gray-400">
                  Explain your issue clearly.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowForm(false);
                  setFormError("");
                }}
                className="rounded-lg p-2 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Issue Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/10 bg-[#20202b] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                >
                  {issueTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Subject
                </label>
                <input
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  placeholder="Example: My order is not processing"
                  maxLength={100}
                  required
                  className="w-full rounded-xl border border-white/10 bg-[#20202b] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Related Order ID (Optional)
                </label>
                <input
                  value={form.orderId}
                  onChange={(e) =>
                    setForm({ ...form, orderId: e.target.value })
                  }
                  placeholder="Example: SB-ORDER-123"
                  className="w-full rounded-xl border border-white/10 bg-[#20202b] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                  Describe Your Issue
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={5}
                  maxLength={1000}
                  placeholder="Please explain what happened and what help you need..."
                  required
                  className="w-full resize-none rounded-xl border border-white/10 bg-[#20202b] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500"
                />
                <p className="mt-1 text-right text-xs text-gray-500">
                  {form.description.length}/1000
                </p>
              </div>

              {formError && (
                <p className="rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
                  {formError}
                </p>
              )}

              <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-3 text-xs leading-5 text-yellow-300">
                Do not include passwords, OTPs, payment PINs or other sensitive
                credentials in your support request.
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormError("");
                  }}
                  className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-gray-300 hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3 text-sm font-semibold hover:bg-purple-500"
                >
                  <Send size={17} />
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
