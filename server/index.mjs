import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.mjs';
import authRoutes from './src/routes/authRoutes.mjs';
import clothingRoutes from './src/routes/clothingRoutes.mjs';
import makeupRoutes from './src/routes/makeupRoutes.mjs';
import cartRoutes from './src/routes/cartRoutes.mjs';

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

app.listen(PORT, ()=> {
    console.log(`Running on ${PORT}`)
})