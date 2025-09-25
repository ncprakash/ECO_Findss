// backend/routes/profile.js
import express from "express";
import pool from "./db.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify token
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    req.user = user; // decoded { id, email }
    next();
  });
}

// Protected profile route
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
         id, email, username, full_name, phone, gender, dob, address, city, state, country, 
        postal_code, avatar_url, bio, friends_count, created_at, updated_at
       FROM users 
       WHERE id = $1`,
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("❌ Profile fetch error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;

// Update profile
router.patch("/profile", authenticateToken, async (req, res) => {
  const {
    username,
    email,
    full_name,
    phone,
    gender,
    dob,
    address,
    city,
    state,
    country,
    postal_code,
    avatar_url,
    bio
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE users SET
        username = COALESCE($1, username),
        email = COALESCE($2, email),
        full_name = COALESCE($3, full_name),
        phone = COALESCE($4, phone),
        gender = COALESCE($5, gender),
        dob = COALESCE($6, dob),
        address = COALESCE($7, address),
        city = COALESCE($8, city),
        state = COALESCE($9, state),
        country = COALESCE($10, country),
        postal_code = COALESCE($11, postal_code),
        avatar_url = COALESCE($12, avatar_url),
        bio = COALESCE($13, bio),
        updated_at = NOW()
      WHERE id = $14
      RETURNING id, email, username, full_name, phone, gender, dob, address, city, state, country, postal_code, avatar_url, bio, friends_count, created_at, updated_at`,
      [
        username,
        email,
        full_name,
        phone,
        gender,
        dob,
        address,
        city,
        state,
        country,
        postal_code,
        avatar_url,
        bio,
        req.user.id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ user: result.rows[0] });
  } catch (err) {
    console.error("❌ Profile update error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});