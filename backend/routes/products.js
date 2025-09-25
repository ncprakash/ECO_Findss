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
    const result = await pool.query(
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

    res.json(result.rows[0]);
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