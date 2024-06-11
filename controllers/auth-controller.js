import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from '../server.js';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    db.query(
        'INSERT INTO users (name, email, password, verificationToken) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, verificationToken],
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            const verificationLink = `http://localhost:8081/verify-email?token=${verificationToken}`;

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Account Verification',
                text: `Click on this link to verify your account: ${verificationLink}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return res.status(500).json({ error: error.message });
                }
                res.status(200).json({ message: 'Verification email sent. Please check your inbox.' });
            });
        }
    );
};

export const login = (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        if (result.length === 0 || !await bcrypt.compare(password, result[0].password)) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        if (!result[0].isVerified) {
            return res.status(403).json({ error: 'Email not verified' });
        }

        const token = jwt.sign({ id: result[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({ message: 'Login successful', token });
    });
};

export const verifyEmail = (req, res) => {
    const { token } = req.query;

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        db.query('UPDATE users SET isVerified = TRUE WHERE email = ?', [decoded.email], (err, result) => {
            if (err) {
                return res.status(500).json({ error: err.message });
            }

            res.status(200).json({ message: 'Email verified successfully' });
        });
    });
};
