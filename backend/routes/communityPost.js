import express from "express";
import pool from './db.js'

const router = express.Router();

router.get("/post", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "No product found" });
    }

    res.json(result.rows); // send all products
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ message: "Failed to fetch products", error: err });
  }
});

export default router;
