import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    sender: {
        type: String,
        enum: ["admin", "customer"],
        required: true,
    },

    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 2000,
    },
}, {
    timestamps: true,
});

const supportTicketSchema = new mongoose.Schema({
    ticketId: {
        type: String,
        unique: true,
        required: true,
    },

    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    subject: {
        type: String,
        required: true,
        trim: true,
        maxlength: 150,
    },

    category: {
        type: String,
        required: true,
        trim: true,
    },

    orderId: {
        type: String,
        default: "",
        trim: true,
    },

    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 5000,
    },

    status: {
        type: String,
        enum: ["Open", "In Progress", "Resolved"],
        default: "Open",
    },

    priority: {
        type: String,
        enum: ["Low", "Medium", "High"],
        default: "Medium",
    },

    replies: [replySchema],
}, {
    timestamps: true,
});

const SupportTicket = mongoose.model(
    "SupportTicket",
    supportTicketSchema
);

export default SupportTicket;