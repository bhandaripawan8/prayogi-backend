
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import  connectDB  from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import blogPostRoutes from './routes/blogPostRoutes.js'
import yogaClassesRoutes from './routes/yogaClassesRoutes.js'
import bodyParser from 'body-parser';
import bookingRoutes from './routes/bookingRoutes.js'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// middleware
app.use(bodyParser.json());

connectDB();


// routes, API's
app.use('/api/auth', authRoutes);
app.use('/api/blogposts', blogPostRoutes);
app.use('/api/yoga-classes', yogaClassesRoutes);
app.use('/api/bookings', bookingRoutes)

export default app;