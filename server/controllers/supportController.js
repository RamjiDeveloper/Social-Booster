import crypto from "crypto";
import SupportTicket from "../models/SupportTicket.js";

// Generate unique ticket ID
const generateTicketId = () => {
    const randomId = crypto.randomBytes(3).toString("hex").toUpperCase();

    return `SB-${Date.now()}-${randomId}`;
};

// Create Support Ticket
export const createTicket = async(req, res) => {
    try {
        const { subject, category, orderId, description } = req.body;

        // Validate required fields
        if (!subject || !category || !description) {
            return res.status(400).json({
                success: false,
                message: "Subject, category and description are required",
            });
        }

        if (
            subject.trim().length > 150 ||
            category.trim().length > 80 ||
            description.trim().length > 5000
        ) {
            return res.status(400).json({
                success: false,
                message: "One or more fields exceed the allowed length",
            });
        }

        // Create ticket
        const ticket = await SupportTicket.create({
            ticketId: generateTicketId(),

            // Customer ID comes from verified JWT, not request body
            customer: req.user._id,

            subject: subject.trim(),
            category: category.trim(),
            orderId: typeof orderId === "string" ? orderId.trim() : "",
            description: description.trim(),

            status: "Open",
            priority: "Medium",
        });

        return res.status(201).json({
            success: true,
            message: "Support ticket created successfully",
            ticket,
        });
    } catch (error) {
        console.error("Create Ticket Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to create support ticket",
        });
    }
};

// Get Logged-in Customer Tickets
export const getMyTickets = async(req, res) => {
    try {
        const tickets = await SupportTicket.find({
            customer: req.user._id,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: tickets.length,
            tickets,
        });
    } catch (error) {
        console.error("Get My Tickets Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch support tickets",
        });
    }
};



// Admin: Get All Support Tickets
export const getAllTickets = async(req, res) => {
    try {
        const tickets = await SupportTicket.find()
            .populate("customer", "name email")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: tickets.length,
            tickets,
        });
    } catch (error) {
        console.error("Get All Tickets Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to fetch support tickets",
        });
    }
};

// Admin: Reply to Support Ticket
export const adminReplyTicket = async(req, res) => {
    try {
        const { ticketId } = req.params;
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Reply message is required",
            });
        }

        if (message.trim().length > 2000) {
            return res.status(400).json({
                success: false,
                message: "Reply cannot exceed 2000 characters",
            });
        }

        const ticket = await SupportTicket.findOne({ ticketId });

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Support ticket not found",
            });
        }

        if (ticket.status === "Resolved") {
            return res.status(400).json({
                success: false,
                message: "This ticket is already resolved",
            });
        }

        ticket.replies.push({
            sender: "admin",
            message: message.trim(),
        });

        if (ticket.status === "Open") {
            ticket.status = "In Progress";
        }

        await ticket.save();

        return res.status(200).json({
            success: true,
            message: "Admin reply sent successfully",
            ticket,
        });
    } catch (error) {
        console.error("Admin Reply Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to send admin reply",
        });
    }
};

// Customer: Reply to Own Support Ticket
export const customerReplyTicket = async(req, res) => {
    try {
        const { ticketId } = req.params;
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: "Reply message is required",
            });
        }

        if (message.trim().length > 2000) {
            return res.status(400).json({
                success: false,
                message: "Reply cannot exceed 2000 characters",
            });
        }

        // Find ticket belonging to logged-in customer
        const ticket = await SupportTicket.findOne({
            ticketId,
            customer: req.user._id,
        });

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Support ticket not found",
            });
        }

        // Add customer reply
        ticket.replies.push({
            sender: "customer",
            message: message.trim(),
        });

        // Reopen ticket if it was resolved
        if (ticket.status === "Resolved") {
            ticket.status = "Open";
        }

        await ticket.save();

        return res.status(200).json({
            success: true,
            message: "Customer reply sent successfully",
            ticket,
        });
    } catch (error) {
        console.error("Customer Reply Error:", error);

        return res.status(500).json({
            success: false,
            message: "Unable to send customer reply",
        });
    }
};