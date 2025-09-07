import express from 'express';
import { pool } from './db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get profile
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users WHERE id=$1", [req.user.id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

// Update profile
router.put('/profile', authenticateToken, async (req, res) => {
    const { full_name, bio, phone, gender, dob, address, city, state, country, postal_code } = req.body;
    try {
        await pool.query(
            `UPDATE users SET full_name=$1, bio=$2, phone=$3, gender=$4, dob=$5, 
             address=$6, city=$7, state=$8, country=$9, postal_code=$10, updated_at=NOW()
             WHERE id=$11`,
            [full_name, bio, phone, gender, dob, address, city, state, country, postal_code, req.user.id]
        );
        res.json({ message: 'Profile updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update profile' });
    }
});

export default router;
