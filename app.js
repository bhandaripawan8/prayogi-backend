
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import  connectDB  from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import blogPostRoutes from './routes/blogPostRoutes.js'
import yogaClassesRoutes from './routes/yogaClassesRoutes.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

connectDB();


// routes, API's
app.use('/api/auth', authRoutes);
app.use('/api/blogposts', blogPostRoutes);
app.use('/api/yoga-classes', yogaClassesRoutes);

export default app;