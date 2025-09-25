import express from "express";
import pool from "./db.js";
import jwt from "jsonwebtoken";

const router = express.Router();
router.use(express.json({ limit: "10mb" })); // allow up to 10MB JSON payload

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
router.post("/products", async (req, res) => {
  const {
    user_id,
    image_url,
    title,
    category,
    description,
    price,
    quantity,
    condition,
    year_of_manufacture,
    brand,
    model,
    dimensions,
    weight,
    material,
    color,
    original_packaging,
    manual_included,
    working_condition_desc
  } = req.body;

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query(
      `INSERT INTO products (
        user_id, image_url, title, category, description, price, quantity, condition,
        year_of_manufacture, brand, model, dimensions, weight, material, color,
        original_packaging, manual_included, working_condition_desc
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8,
        $9, $10, $11, $12, $13, $14, $15,
        $16, $17, $18
      ) RETURNING *`,
        [
        user_id, image_url, title, category, description, price, quantity, condition,
        year_of_manufacture, brand, model, dimensions, weight, material, color,
        original_packaging, manual_included, working_condition_desc
        ]
      );

      // Award eco points (+10) and record transaction via existing route logic (inline)
      // Ensure tables exist and upsert points
      await client.query(
        "INSERT INTO eco_points (user_id, points) VALUES ($1,$2) ON CONFLICT (user_id) DO UPDATE SET points = eco_points.points + EXCLUDED.points",
        [user_id, 10]
      );
      await client.query(
        `CREATE TABLE IF NOT EXISTS eco_transactions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          points INTEGER NOT NULL,
          action TEXT NOT NULL,
          metadata JSONB DEFAULT '{}'::jsonb,
          created_at TIMESTAMPTZ DEFAULT NOW()
        )`
      );
      await client.query(
        `INSERT INTO eco_transactions (user_id, points, action, metadata) VALUES ($1,$2,$3,$4)`,
        [user_id, 10, 'post_created', { product_id: result.rows[0].id }]
      );

      await client.query('COMMIT');
      res.json(result.rows[0]);
    } catch (e) {
      await client.query('ROLLBACK');
      throw e;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error("❌ Error creating product:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;

// Delete a product (owner only)
router.delete("/products/:id", authenticateToken, async (req, res) => {
  const productId = req.params.id;
  try {
    const { rows } = await pool.query("SELECT user_id FROM products WHERE id = $1", [productId]);
    if (rows.length === 0) return res.status(404).json({ error: "Product not found" });
    if (String(rows[0].user_id) !== String(req.user.id)) {
      return res.status(403).json({ error: "Not authorized to delete this product" });
    }
    await pool.query("DELETE FROM products WHERE id = $1", [productId]);
    return res.json({ success: true });
  } catch (err) {
    console.error("❌ Product deletion error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});