import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import  connectDB  from './config/db.js';
import authRoutes from './routes/authRoutes.js'


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

connectDB();

app.use('/api/auth', authRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
