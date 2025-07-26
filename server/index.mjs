import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.mjs';
import authRoutes from './src/routes/authRoutes.mjs';
import clothingRoutes from './src/routes/clothingRoutes.mjs';
import makeupRoutes from './src/routes/makeupRoutes.mjs';
import cartRoutes from './src/routes/cartRoutes.mjs';
import recommendation from './src/routes/recommendationRoutes.mjs';
import orderRoutes from './src/routes/orderRoutes.mjs';
import userRoutes from './src/routes/userRoutes.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/auth',authRoutes);
app.use('/api/clothing', clothingRoutes);
app.use('/api/makeup', makeupRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/recommend', recommendation);
app.use('/api/order', orderRoutes);
app.use('/api/user', userRoutes);

app.listen(PORT, ()=> {
    console.log(`Running on ${PORT}`)
})