import express from 'express';
import { pool } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Add to cart
router.post('/', authenticateToken, async (req, res) => {
    const { listing_id, qty } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO cart_items (user_id, listing_id, qty) VALUES ($1,$2,$3) ON CONFLICT (user_id, listing_id) DO UPDATE SET qty = cart_items.qty + EXCLUDED.qty RETURNING *",
            [req.user.id, listing_id, qty]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add to cart' });
    }
});

// Get cart items
router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT c.id, c.qty, l.title, l.price, l.image_url FROM cart_items c JOIN listings l ON c.listing_id = l.id WHERE c.user_id=$1",
            [req.user.id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
});

// Remove from cart
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await pool.query("DELETE FROM cart_items WHERE id=$1 AND user_id=$2", [req.params.id, req.user.id]);
        res.json({ message: 'Item removed from cart' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to remove item' });
    }
});

export default router;
