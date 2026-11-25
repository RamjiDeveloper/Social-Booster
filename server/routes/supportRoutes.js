import express from "express";

import {
    createTicket,
    getMyTickets,
    getAllTickets,
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

export default router;