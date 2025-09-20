import express from "express";
import pool from "./db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  console.log("📝 Received product creation request:", req.body);
  
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

    console.log("✅ Product created successfully:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error creating product:", err.message);
    res.status(500).json({ error: "Internal server error", details: err.message });
  }
});
export default router;