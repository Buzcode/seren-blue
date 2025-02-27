import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
// import adminRouter from './routes/adminRout.js'; // <-- COMMENT OUT or DELETE this line

// Import route files
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js'; // Import admin routes
import cookieParser from 'cookie-parser';

//app config
const app = express();
const port = process.env.PORT || 5001;
connectDB();
connectCloudinary();


//middlewares
app.use(express.urlencoded({extended: true})) // <-- MODIFIED CORS CONFIGURATION HERE
app.use(express.json());
app.use(cookieParser());

//api endpoint

// Mount route files
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);  // <-- ADDED: Mount admin routes at /api/admin

app.get('/', (req, res) => {
    res.send('API WORKING');
});

app.listen(port, ()=>console.log("server started",port))