
import express from 'express';
import cors from 'cors';
import { connectDB } from './db.js';
import foodRouter from './routes/Foodroutes.js';
import userRouter from './routes/userRoutes.js';
import 'dotenv/config'
import dotenv from 'dotenv';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoute.js';
const app = express();
const port = 4000;

// Connect to MongoDB
connectDB();
// dotenv.config();
// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/image', express.static('uploads')); // Optional if '/uploads' already covers it


// Routes
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);

// Default route
app.get('/', (req, res) => {
  res.send('API WORKING');
});

// Start server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

