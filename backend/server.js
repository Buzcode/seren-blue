import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";
import doctorRoutes from "./routes/doctors.js"; // <-- ADDED: Import doctorRoutes
import cookieParser from "cookie-parser";

const app = express();
const port = process.env.PORT || 5001;
connectDB();
connectCloudinary();

//middlewares
app.use(
  cors({
    credentials: true,
    origin: process.env.ALLOWED_ORIGIN,
  })
); 
app.use(express.json());
app.use(cookieParser());

//api endpoint

// Mount route files
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctors", doctorRoutes); // <-- ADDED: Mount doctorRoutes at /api/doctors

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log("server started", port));