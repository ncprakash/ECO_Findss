import express from 'express';
import { pool } from './db.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Send friend request
router.post('/', authenticateToken, async (req, res) => {
    const { receiver_id } = req.body;
    try {
        const exists = await pool.query(
            "SELECT * FROM friend_requests WHERE sender_id=$1 AND receiver_id=$2",
            [req.user.id, receiver_id]
        );
        if (exists.rows.length) return res.status(400).json({ error: 'Friend request already sent' });

        const result = await pool.query(
            "INSERT INTO friend_requests (sender_id, receiver_id) VALUES ($1,$2) RETURNING *",
            [req.user.id, receiver_id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Failed to send friend request' });
    }
});

// Get incoming friend requests
router.get('/incoming', authenticateToken, async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT fr.id, u.id as sender_id, u.username, u.avatar_url FROM friend_requests fr JOIN users u ON fr.sender_id = u.id WHERE fr.receiver_id=$1",
            [req.user.id]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch friend requests' });
    }
});

// Accept friend request
router.post('/accept/:id', authenticateToken, async (req, res) => {
    try {
        const request = await pool.query(
            "SELECT * FROM friend_requests WHERE id=$1 AND receiver_id=$2",
            [req.params.id, req.user.id]
        );
        if (!request.rows.length) return res.status(404).json({ error: 'Request not found' });

        const sender_id = request.rows[0].sender_id;

        await pool.query(
            "INSERT INTO friends (user_id1, user_id2) VALUES ($1,$2), ($2,$1)",
            [req.user.id, sender_id]
        );

        await pool.query("DELETE FROM friend_requests WHERE id=$1", [req.params.id]);

        res.json({ message: 'Friend request accepted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to accept request' });
    }
});

// Decline friend request
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await pool.query("DELETE FROM friend_requests WHERE id=$1 AND receiver_id=$2", [req.params.id, req.user.id]);
        res.json({ message: 'Friend request declined' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to decline request' });
    }
});

export default router;
