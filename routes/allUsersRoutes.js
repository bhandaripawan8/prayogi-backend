
import express from 'express';
import { getAllUser } from '../controllers/allUsers';
const router = express.Router();

router.get('/users', getAllUser )

export default router;