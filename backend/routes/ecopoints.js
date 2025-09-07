import express from 'express';
import { pool } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get eco points
router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query("SELECT points FROM eco_points WHERE user_id=$1", [req.user.id]);
        res.json(result.rows[0] || { points: 0 });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch eco points' });
    }
});

// Add eco points
router.post('/add', authenticateToken, async (req, res) => {
    const { points } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO eco_points (user_id, points) VALUES ($1,$2) ON CONFLICT (user_id) DO UPDATE SET points = eco_points.points + EXCLUDED.points RETURNING *",
            [req.user.id, points]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add eco points' });
    }
});

export default router;
