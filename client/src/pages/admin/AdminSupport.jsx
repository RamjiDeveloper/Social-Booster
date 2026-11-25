
import { useEffect, useMemo, useState } from "react";
import {
  MessageSquare,
  Search,
  Ticket,
  Clock,
  CheckCircle,
} from "lucide-react";

import AdminTicketCard from "../../components/admin/SupportTicketCard";

const TICKET_KEY = "socialBoosterTickets";

export default function AdminSupport() {
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  // Load tickets from localStorage
  useEffect(() => {
    try {
      const savedTickets = JSON.parse(
        localStorage.getItem(TICKET_KEY) || "[]"
      );

      setTickets(
        Array.isArray(savedTickets) ? savedTickets : []
      );
    } catch {
      setTickets([]);
    }
  }, []);

  // Save updated tickets
  const saveTickets = (updatedTickets) => {
    setTickets(updatedTickets);
    localStorage.setItem(
      TICKET_KEY,
      JSON.stringify(updatedTickets)
    );
  };

  // Update ticket status
  const handleStatusChange = (ticketId, newStatus) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === ticketId
        ? { ...ticket, status: newStatus }
        : ticket
    );

    saveTickets(updatedTickets);
  };

  // Update ticket priority
  const handlePriorityChange = (ticketId, newPriority) => {
    const updatedTickets = tickets.map((ticket) =>
      ticket.id === ticketId
        ? { ...ticket, priority: newPriority }
        : ticket
    );

    saveTickets(updatedTickets);
  };

  // Send admin reply
  const handleReply = (ticketId, message) => {
    const updatedTickets = tickets.map((ticket) => {
      if (ticket.id !== ticketId) return ticket;

      const newReply = {
        id: `REPLY-${Date.now()}`,
        sender: "admin",
        message,
        createdAt: new Date().toISOString(),
      };

      return {
        ...ticket,
        replies: [...(ticket.replies || []), newReply],
        status:
          ticket.status === "Open"
            ? "In Progress"
            : ticket.status,
      };
    });

    saveTickets(updatedTickets);
  };

  // Search and filter
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        (ticket.id || "").toLowerCase().includes(searchText) ||
        (ticket.subject || "").toLowerCase().includes(searchText) ||
        (ticket.category || "").toLowerCase().includes(searchText);

      const matchesFilter =
        activeFilter === "All" ||
        ticket.status === activeFilter;

      return matchesSearch && matchesFilter;
    });
  }, [tickets, search, activeFilter]);

  // Dashboard counts
  const totalTickets = tickets.length;

  const openTickets = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  const stats = [
    {
      title: "Total Tickets",
      value: totalTickets,
      icon: Ticket,
      color: "text-purple-400",
    },
    {
      title: "Open Tickets",
      value: openTickets,
      icon: MessageSquare,
      color: "text-yellow-400",
    },
    {
      title: "In Progress",
      value: inProgressTickets,
      icon: Clock,
      color: "text-blue-400",
    },
    {
      title: "Resolved",
      value: resolvedTickets,
      icon: CheckCircle,
      color: "text-green-400",
    },
  ];

  return (
    <div className="space-y-7">
      {/* Page Header */}
      <div>
        <p className="text-sm font-medium text-purple-400">
          CUSTOMER SUPPORT
        </p>

        <h1 className="mt-2 text-3xl font-bold text-white">
          Support Tickets
        </h1>

        <p className="mt-2 text-sm text-gray-400">
          Manage customer queries and respond to support tickets.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-white/10 bg-[#11111b] p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">
                  {stat.title}
                </p>

                <Icon size={20} className={stat.color} />
              </div>

              <h2 className="mt-3 text-3xl font-bold text-white">
                {stat.value}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#11111b] p-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <Search
            size={17}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ticket, subject, category..."
            className="w-full rounded-xl border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", "Open", "In Progress", "Resolved"].map(
            (filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-lg px-4 py-2 text-sm transition ${
                  activeFilter === filter
                    ? "bg-purple-600 text-white"
                    : "border border-white/10 bg-white/5 text-gray-400 hover:text-white"
                }`}
              >
                {filter}
              </button>
            )
          )}
        </div>
      </div>

      {/* Ticket List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">
            All Tickets
          </h2>

          <span className="text-sm text-gray-500">
            {filteredTickets.length} results
          </span>
        </div>

        {filteredTickets.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-[#11111b] p-10 text-center">
            <MessageSquare
              size={35}
              className="mx-auto text-gray-600"
            />

            <h3 className="mt-4 font-semibold text-white">
              No tickets found
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Customer support tickets will appear here.
            </p>
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <AdminTicketCard
              key={ticket.id}
              ticket={ticket}
              onStatusChange={handleStatusChange}
              onPriorityChange={handlePriorityChange}
              onReply={handleReply}
            />
          ))
        )}
      </div>
    </div>
  );
}
