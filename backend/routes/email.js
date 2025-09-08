import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
const router= express.Router();

dotenv.config();

  // Proper middleware

const otpStore = {};  // { email: { otp: '12345', expiresAt: Date } }

function generateOtp() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

router.post('/send-otp', async (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: 'Email is required' });

    const otp = generateOtp();
    const expiresAt = Date.now() + 5 * 60 * 1000; // Expires in 5 minutes

    otpStore[email] = { otp, expiresAt };

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