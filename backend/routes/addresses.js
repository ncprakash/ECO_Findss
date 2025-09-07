import express from 'express';
import { pool } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Add address
router.post('/', authenticateToken, async (req, res) => {
    const { line1, line2, city, state, country, postal_code } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO addresses (user_id, line1, line2, city, state, country, postal_code) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *",
            [req.user.id, line1, line2, city, state, country, postal_code]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add address' });
    }
});

// Get addresses
router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM addresses WHERE user_id=$1", [req.user.id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch addresses' });
    }
});

// Delete address
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await pool.query("DELETE FROM addresses WHERE id=$1 AND user_id=$2", [req.params.id, req.user.id]);
        res.json({ message: 'Address deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete address' });
    }
});

export default router;
