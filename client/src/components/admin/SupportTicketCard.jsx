
import { useState } from "react";
import {
  MessageSquare,
  Send,
  Clock,
  User,
  ChevronDown,
} from "lucide-react";

export default function AdminTicketCard({
  ticket,
  onStatusChange,
  onPriorityChange,
  onReply,
}) {
  const [replyText, setReplyText] = useState("");
  const [showConversation, setShowConversation] = useState(true);

  const replies = ticket.replies || [];

  const formatDate = (date) => {
    if (!date) return "Date unavailable";

    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const handleSendReply = () => {
    const message = replyText.trim();

    if (!message) return;

    onReply(ticket.id, message);
    setReplyText("");
  };

  const statusColors = {
    Open: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
    "In Progress":
      "bg-blue-500/10 text-blue-400 border-blue-500/20",
    Resolved:
      "bg-green-500/10 text-green-400 border-green-500/20",
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-[#11111b] p-5 shadow-lg">
      {/* Ticket Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-purple-400">
              {ticket.id}
            </span>

            <span
              className={`rounded-full border px-3 py-1 text-xs ${
                statusColors[ticket.status] ||
                "border-white/10 bg-white/5 text-gray-300"
              }`}
            >
              {ticket.status}
            </span>
          </div>

          <h3 className="text-lg font-semibold text-white">
            {ticket.subject}
          </h3>

          <div className="mt-2 flex flex-wrap gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1">
              <User size={14} />
              Customer
            </span>

            <span>{ticket.category}</span>

            <span className="flex items-center gap-1">
              <Clock size={14} />
              {formatDate(ticket.createdAt)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={ticket.status || "Open"}
            onChange={(e) =>
              onStatusChange(ticket.id, e.target.value)
            }
            className="rounded-lg border border-white/10 bg-[#1b1b29] px-3 py-2 text-sm text-white outline-none"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>

          <select
            value={ticket.priority || "Medium"}
            onChange={(e) =>
              onPriorityChange(ticket.id, e.target.value)
            }
            className="rounded-lg border border-white/10 bg-[#1b1b29] px-3 py-2 text-sm text-white outline-none"
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>
        </div>
      </div>

      {/* Customer Message */}
      <div className="mt-5 rounded-xl border border-white/5 bg-black/20 p-4">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
          Customer Message
        </p>

        <p className="whitespace-pre-wrap text-sm leading-6 text-gray-200">
          {ticket.description}
        </p>

        {ticket.orderId && (
          <p className="mt-3 text-xs text-purple-300">
            Related Order: {ticket.orderId}
          </p>
        )}
      </div>

      {/* Conversation */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => setShowConversation(!showConversation)}
          className="flex w-full items-center justify-between text-sm font-semibold text-white"
        >
          <span className="flex items-center gap-2">
            <MessageSquare size={17} className="text-purple-400" />
            Conversation ({replies.length})
          </span>

          <ChevronDown
            size={18}
            className={`transition-transform ${
              showConversation ? "rotate-180" : ""
            }`}
          />
        </button>

        {showConversation && (
          <div className="mt-4 space-y-3">
            {replies.length === 0 ? (
              <p className="rounded-lg bg-white/5 p-4 text-sm text-gray-500">
                No replies yet. Send the first reply to this customer.
              </p>
            ) : (
              replies.map((reply) => (
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
                        : "Customer"}
                    </span>

                    <span className="text-xs text-gray-500">
                      {formatDate(reply.createdAt)}
                    </span>
                  </div>

                  <p className="whitespace-pre-wrap text-sm leading-6 text-gray-200">
                    {reply.message}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Reply Form */}
      <div className="mt-5 border-t border-white/10 pt-5">
        <label className="mb-2 block text-sm font-semibold text-white">
          Reply to Customer
        </label>

        <textarea
          rows={3}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          placeholder="Write your response here..."
          className="w-full resize-y rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white outline-none placeholder:text-gray-600 focus:border-purple-500"
        />

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={handleSendReply}
            disabled={!replyText.trim()}
            className="flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={15} />
            Send Reply
          </button>
        </div>
      </div>
    </div>
  );
}
