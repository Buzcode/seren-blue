console.log("SERVER.JS FILE IS BEING EXECUTED!");
import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";
import doctorRoutes from "./routes/doctors.js"; // Your existing doctor routes
import doctorDashboardRoutes from "./routes/doctorDashboardRoutes.js"; // Doctor dashboard routes - CORRECT IMPORT
import cookieParser from "cookie-parser";
// ADDED: Import reviews routes
import reviewsRoutes from "./routes/reviews.js";

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
app.use("/api/doctors", doctorRoutes); // Your existing doctor routes
app.use("/api/doctor-dashboard", doctorDashboardRoutes); // Doctor dashboard routes - NEW PATH /api/doctor-dashboard

// ADDED: Use reviews routes middleware with error handling and success log
try {
    app.use("/api/reviews", reviewsRoutes);
    console.log("Reviews routes mounted successfully!"); // Success log
} catch (error) {
    console.error("Error mounting reviews routes:", error); // Error log
}


app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log(`Server started on port ${port}`));