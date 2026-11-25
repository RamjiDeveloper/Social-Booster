import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const createAdmin = async() => {
    try {
        const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD, MONGO_URI } =
        process.env;

        if (!ADMIN_NAME || !ADMIN_EMAIL || !ADMIN_PASSWORD || !MONGO_URI) {
            throw new Error("Admin credentials or MongoDB URI missing in .env");
        }

        if (ADMIN_PASSWORD.length < 12) {
            throw new Error("Admin password must be at least 12 characters");
        }

        await mongoose.connect(MONGO_URI);

        const existingUser = await User.findOne({
            email: ADMIN_EMAIL.toLowerCase().trim(),
        });

        if (existingUser) {
            console.log("An account with this email already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 12);

        const admin = await User.create({
            name: ADMIN_NAME.trim(),
            email: ADMIN_EMAIL.toLowerCase().trim(),
            password: hashedPassword,
            role: "admin",
            isActive: true,
        });

        console.log("Admin account created successfully!");
        console.log("Admin ID:", admin._id);
        console.log("Admin Email:", admin.email);
        console.log("Admin Role:", admin.role);
    } catch (error) {
        console.error("Admin Creation Failed:", error.message);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();