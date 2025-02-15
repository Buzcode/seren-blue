import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
//import paymentRoutes from './routes/payment.js';
// import adminRouter from './routes/adminRout.js'; // <-- COMMENT OUT or DELETE this line

// Import route files
import authRoutes from './routes/auth.js';   // <-- ADD this line: import auth routes
import userRoutes from './routes/users.js';   // <-- ADD this line: import user routes
import cookieParser from 'cookie-parser'; // <-- ADD THIS LINE: import cookie-parser

//app config

const app=express()
const port = process.env.PORT || 5001
connectDB()
connectCloudinary()

//middlewares

app.use(cors()) // Keep cors first if you have specific cors configurations later
app.use(express.json())
app.use(cookieParser()); // <-- ADD THIS LINE: Use cookie-parser middleware

//api endpoint
// app.use('/api/admin', adminRouter) // <-- COMMENT OUT or DELETE this line

// Mount route files
app.use('/api/auth', authRoutes);    // <-- ADD this line: mount auth routes at /api/auth
app.use('/api/users', userRoutes);   // <-- ADD this line: mount user routes at /api/users


app.get('/' , (req , res)=>{
    res.send('API WORKING')
})

app.listen(port, ()=>console.log("server started",port))
//app.use('/api/payment', paymentRoutes); 