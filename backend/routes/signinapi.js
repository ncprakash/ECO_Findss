import express from "express";
import bcrypt from "bcrypt";
import pool from "./db.js";
import { z } from "zod";

const router = express.Router();


const signupSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  full_name: z.string().optional().nullable(),
  bio: z.string().max(500).optional().nullable(),
  phone: z.string().optional().nullable(),
  gender: z.enum(["male", "female", "other"]).optional().nullable(),
  dob: z.string().datetime().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  state: z.string().optional().nullable(),
  country: z.string().optional().nullable(),
  postal_code: z.string().optional().nullable(),
});

router.post("/signup", async (req, res) => {
  const parse = signupSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: "Invalid input", details: parse.error.flatten() });
  }
  const { username, email, password, full_name, bio, phone, gender, dob, address, city, state, country, postal_code } = parse.data;

  try {
    // Check if user already exists
    const check = await pool.query(
      "SELECT * FROM users WHERE username = $1 OR email = $2",
      [username, email]
    );

    if (check.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into database
    const query = `
      INSERT INTO users(username, email, password_hash, full_name, bio, phone, gender, dob, address, city, state, country, postal_code)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
      RETURNING id, username, email, full_name;
    `;
    const values = [
      username,
      email,
      hashedPassword,
      full_name,
      bio,
      phone,
      gender,
      dob || null,
      address,
      city,
      state,
      country,
      postal_code,
    ];

    const result = await pool.query(query, values);

    return res.status(201).json({
      message: "✅ User created successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    return res.status(500).json({ error: "Database error" });
  }
});

export default router;
