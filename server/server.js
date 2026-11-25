import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import supportRoutes from "./routes/supportRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(helmet());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/support", supportRoutes);

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Health API
app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "SocialBooster API is running",
        database: process.env.MONGO_URI ? "Configured" : "Not configured",
        timestamp: new Date().toISOString(),
    });
});

// Root API
app.get("/", (req, res) => {
    res.send("Welcome to SocialBooster Backend API");
});

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async() => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
};

startServer();