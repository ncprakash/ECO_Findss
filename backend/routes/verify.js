import express from 'express';
import bcrypt from 'bcrypt';
import db from './db.js';

const router = express.Router();

router.post('/verify-otp', async (req, res) => {
    const { email, otp, formData } = req.body;
    if (!email || !otp || !formData)
        return res.status(400).json({ error: 'Missing fields' });

    try {
        // Fetch OTP record
        const result = await db.query('SELECT * FROM otp_store WHERE email=$1', [email]);
        if (result.rows.length === 0)
            return res.status(400).json({ error: 'No OTP found' });

        const record = result.rows[0];

        if (new Date(record.expires_at) < new Date()) {
            await db.query('DELETE FROM otp_store WHERE email=$1', [email]);
            return res.status(400).json({ error: 'OTP expired' });
        }

        if (record.otp !== otp) return res.status(400).json({ error: 'Invalid OTP' });

        // Hash password
        const hashedPassword = await bcrypt.hash(formData.password, 10);

        // Insert user
        await db.query(
            `INSERT INTO users 
            (username, email, password_hash, full_name, bio, phone, gender, dob, address, city, state, country, postal_code)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)`,
            [
                formData.username,
                formData.email,
                hashedPassword,
                formData.full_name,
                formData.bio,
                formData.phone,
                formData.gender,
                formData.dob,
                formData.address,
                formData.city,
                formData.state,
                formData.country,
                formData.postal_code,
            ]
        );

        // Remove OTP after successful verification
        await db.query('DELETE FROM otp_store WHERE email=$1', [email]);

        res.json({ message: 'OTP verified and user created successfully!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
