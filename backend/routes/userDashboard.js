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
      `SELECT id, username, full_name, bio, email, avatar_url, friends_count, eco_points, city, country
       FROM users 
       WHERE id = $1`,
      [user_id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Get all product details for this user
    const productResult = await pool.query(
      `SELECT id, user_id, image_url, title, category, description, price, quantity,
              condition, year_of_manufacture, brand, model, dimensions, weight,
              material, color, original_packaging, manual_included, working_condition_desc, created_at, updated_at
       FROM products
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [user_id]
    );

    return res.json({
      user: userResult.rows[0],
      products: productResult.rows, // full details
    });
  } catch (err) {
    console.error("❌ Error fetching user details:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
