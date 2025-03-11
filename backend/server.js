console.log("SERVER.JS FILE IS BEING EXECUTED!");
import express from "express";
import cors from "cors";
import 'dotenv/config';
// console.log("PORT from .env:", process.env.PORT); // <-- Optional check if .env is loading correctly
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";
import doctorRoutes from "./routes/doctors.js";
import doctorDashboardRoutes from "./routes/doctorDashboardRoutes.js";
import cookieParser from "cookie-parser";
import reviewsRoutes from "./routes/reviews.js";
import healthCheckupPaymentRoutes from "./routes/healthCheckupPayment.js";
import ambulanceRoutes from "./routes/ambulance.js"; // **Import ambulance routes**


const app = express();
const port = process.env.PORT || 5001;

connectDB();
connectCloudinary();

// Middlewares
app.use(
    cors({
        credentials: true,
        origin: process.env.ALLOWED_ORIGIN,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/doctor-dashboard", doctorDashboardRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/health-checkup-payment", healthCheckupPaymentRoutes);
app.use("/api/ambulance", ambulanceRoutes); // **Use ambulance routes middleware**


app.get("/", (req, res) => {
    res.send("API WORKING");
});

app.listen(port, () => console.log(`Server started on port ${port}`));