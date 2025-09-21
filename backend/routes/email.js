import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import db from './db.js';
const router = express.Router();


dotenv.config();


function generateOtp() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}

router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: 'Email is required' });

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        // Persist OTP to database so verify.js can read it
        // Remove any existing OTP for this email, then insert a new one
        await db.query('DELETE FROM otp_store WHERE email=$1', [email]);
        await db.query(
            'INSERT INTO otp_store (email, otp, expires_at) VALUES ($1, $2, $3)',
            [email, otp, expiresAt]
        );

        await transporter.sendMail({
            from: `"Your App" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`,
            html: `<h1>Your OTP code is: <b>${otp}</b></h1>`,
        });

        res.json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send OTP' });
    }
});

export default router;
