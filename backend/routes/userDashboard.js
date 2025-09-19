// backend/routes/userDetails.js
import express from "express";
import pool from "./db.js";

const router = express.Router();

router.post("/userDashboard", async (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: "user_id is required" });
  }

  try {
    // ✅ Get user details using id from users
    const userResult = await pool.query(
      `SELECT username, full_name, bio, email 
       FROM users 
       WHERE id = $1`,
      [user_id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Get product details where user_id matches in products
    const productResult = await pool.query(
      `SELECT title, image_url, description 
       FROM products 
       WHERE user_id = $1`,
      [user_id]
    );

    return res.json({
      user: userResult.rows[0],
      products: productResult.rows, // can be empty if user has no products
    });
  } catch (err) {
    console.error("❌ Error fetching user details:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
