import express from 'express';
import { pool } from '../db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Place order
router.post('/', authenticateToken, async (req, res) => {
    try {
        const cart = await pool.query(
            "SELECT c.qty, l.id as listing_id, l.title, l.price FROM cart_items c JOIN listings l ON c.listing_id = l.id WHERE c.user_id=$1",
            [req.user.id]
        );

        if (cart.rows.length === 0) return res.status(400).json({ error: 'Cart is empty' });

        const total = cart.rows.reduce((sum, item) => sum + item.price * item.qty, 0);

        const order = await pool.query(
            "INSERT INTO orders (user_id, total) VALUES ($1, $2) RETURNING *",
            [req.user.id, total]
        );

        for (const item of cart.rows) {
            await pool.query(
                "INSERT INTO order_items (order_id, listing_id, title, price, qty) VALUES ($1,$2,$3,$4,$5)",
                [order.rows[0].id, item.listing_id, item.title, item.price, item.qty]
            );
        }

        await pool.query("DELETE FROM cart_items WHERE user_id=$1", [req.user.id]);

        res.json({ message: 'Order placed', order: order.rows[0] });
    } catch (err) {
        res.status(500).json({ error: 'Failed to place order' });
    }
});

// Get orders
router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM orders WHERE user_id=$1 ORDER BY created_at DESC", [req.user.id]);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

export default router;
