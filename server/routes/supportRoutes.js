import express from "express";

import {
    createTicket,
    getMyTickets,
    getAllTickets,
    adminReplyTicket,
    customerReplyTicket,
} from "../controllers/supportController.js";

import {
    protect,
    authorize,

} from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer: Create Ticket
router.post(
    "/",
    protect,
    authorize("customer"),
    createTicket
);

// Customer: Get Own Tickets
router.get(
    "/my-tickets",
    protect,
    authorize("customer"),
    getMyTickets
);

// Admin: Get All Tickets
router.get(
    "/admin/all",
    protect,
    authorize("admin"),
    getAllTickets
);

// Admin: Reply to Ticket
router.post(
    "/admin/:ticketId/reply",
    protect,
    authorize("admin"),
    adminReplyTicket
);

// Customer: Reply to Own Ticket
router.post(
    "/:ticketId/reply",
    protect,
    authorize("customer"),
    customerReplyTicket
);

export default router;