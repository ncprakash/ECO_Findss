import express from 'express';
import pool from './db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Ensure eco_transactions table exists
async function ensureEcoTransactionsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS eco_transactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        points INTEGER NOT NULL,
        action TEXT NOT NULL,
        metadata JSONB DEFAULT '{}'::jsonb,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_eco_tx_user_time ON eco_transactions(user_id, created_at DESC);
      CREATE INDEX IF NOT EXISTS idx_eco_tx_action ON eco_transactions(action);
    `);
  } catch (err) {
    console.error('Failed ensuring eco_transactions:', err.message);
  }
}

// Get eco points
router.get('/', auth, async (req, res) => {
    try {
        const result = await pool.query("SELECT points FROM eco_points WHERE user_id=$1", [req.user.id]);
        res.json(result.rows[0] || { points: 0 });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch eco points' });
    }
});

// Add eco points and optionally record a transaction
router.post('/add', auth, async (req, res) => {
    const { points } = req.body;
    try {
        const client = await pool.connect();
        try {
          await client.query('BEGIN');
          const upsert = await client.query(
            "INSERT INTO eco_points (user_id, points) VALUES ($1,$2) ON CONFLICT (user_id) DO UPDATE SET points = eco_points.points + EXCLUDED.points RETURNING *",
            [req.user.id, points]
          );
          await ensureEcoTransactionsTable();
          await client.query(
            `INSERT INTO eco_transactions (user_id, points, action, metadata) VALUES ($1, $2, $3, $4)`,
            [req.user.id, Number(points) || 0, 'manual_adjust', {}]
          );
          await client.query('COMMIT');
          res.json(upsert.rows[0]);
        } catch (e) {
          await client.query('ROLLBACK');
          throw e;
        } finally {
          client.release();
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to add eco points' });
    }
});

// Get eco transactions (history)
router.get('/transactions', auth, async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 20, 100);
  const offset = Number(req.query.offset) || 0;
  try {
    await ensureEcoTransactionsTable();
    const { rows } = await pool.query(
      `SELECT id, points, action, metadata, created_at
       FROM eco_transactions
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT $2 OFFSET $3`,
      [req.user.id, limit, offset]
    );
    res.json({ transactions: rows });
  } catch (err) {
    console.error('Failed to fetch eco transactions:', err.message);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

export default router;
