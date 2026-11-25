import express from "express";
import { registerUser, loginUser, getMe } from "../controllers/authController.js";
import {
    protect,
    authorize
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);

router.get(
    "/admin-test",
    protect,
    authorize("admin"),
    (req, res) => {
        res.status(200).json({
            success: true,
            message: "Admin access granted",
            user: {
                id: req.user._id,
                role: req.user.role,
            },
        });
    }
);

export default router;