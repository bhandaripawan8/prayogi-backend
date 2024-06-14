import express from 'express';
import { registerUser, loginUser, Logout } from '../controllers/authController.js';


const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', Logout)


export default router;