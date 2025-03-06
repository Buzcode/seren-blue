import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectDB from "./config/mongodb.js";
import connectCloudinary from "./config/cloudinary.js";

import authRoutes from "./routes/auth.js"; 
import userRoutes from "./routes/users.js";
import adminRoutes from "./routes/admin.js";
import doctorRoutes from "./routes/doctors.js";
import doctorDashboardRoutes from "./routes/doctorDashboardRoutes.js";
import cookieParser from "cookie-parser";

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

app.use("/api/doctor/dashboard", doctorDashboardRoutes);


app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(port, () => console.log(`Server started on port ${port}`));