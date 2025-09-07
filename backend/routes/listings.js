import express from 'express';
import { pool } from './db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Add listing
router.post('/', authenticateToken, async (req, res) => {
    const { title, description, category, price, image_url } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO listings (title, description, category, price, image_url, seller_id) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
            [title, description, category, price, image_url, req.user.id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add listing' });
    }
});

// Get all listings
router.get('/', async (req, res) => {
    const { category, search } = req.query;
    let query = "SELECT * FROM listings";
    let values = [];

    if (category) {
        values.push(category);
        query += ` WHERE category = $${values.length}`;
    }
    if (search) {
        values.push(`%${search}%`);
        query += values.length === 1 ? " WHERE" : " AND";
        query += ` title ILIKE $${values.length}`;
    }

    try {
        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch listings' });
    }
});

// Get single listing
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM listings WHERE id=$1", [req.params.id]);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch listing' });
    }
});

// Update listing
router.put('/:id', authenticateToken, async (req, res) => {
    const { title, description, category, price, image_url } = req.body;
    try {
        await pool.query(
            "UPDATE listings SET title=$1, description=$2, category=$3, price=$4, image_url=$5 WHERE id=$6 AND seller_id=$7",
            [title, description, category, price, image_url, req.params.id, req.user.id]
        );
        res.json({ message: 'Listing updated' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update listing' });
    }
});

// Delete listing
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await pool.query("DELETE FROM listings WHERE id=$1 AND seller_id=$2", [req.params.id, req.user.id]);
        res.json({ message: 'Listing deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete listing' });
    }
});

export default router;
