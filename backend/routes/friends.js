import express from "express";
import pool from "./db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; 
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No token" });
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

// List friends for current user
router.get("/friends", authenticateToken, async (req, res) => {
  try {
    const { rows } = await pool.query(
      `SELECT u.id, u.username, u.email, u.avatar_url
       FROM friends f
       JOIN users u ON u.id = f.friend_id
       WHERE f.user_id = $1
       ORDER BY u.username ASC`,
      [req.user.id]
    );
    return res.json({ friends: rows });
  } catch (err) {
    console.error("❌ Friends list error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Add friend
router.post("/friends", authenticateToken, async (req, res) => {
  const { friend_id } = req.body;
  if (!friend_id) return res.status(400).json({ error: "friend_id required" });
  if (String(friend_id) === String(req.user.id)) return res.status(400).json({ error: "Cannot add yourself" });
  try {
    await pool.query(
      `INSERT INTO friends (user_id, friend_id) VALUES ($1, $2)
       ON CONFLICT (user_id, friend_id) DO NOTHING`,
      [req.user.id, friend_id]
    );
    return res.json({ success: true });
  } catch (err) {
    console.error("❌ Add friend error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Remove friend
router.delete("/friends/:friendId", authenticateToken, async (req, res) => {
  const friendId = req.params.friendId;
  try {
    await pool.query(
      `DELETE FROM friends WHERE user_id = $1 AND friend_id = $2`,
      [req.user.id, friendId]
    );
    return res.json({ success: true });
  } catch (err) {
    console.error("❌ Remove friend error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;


