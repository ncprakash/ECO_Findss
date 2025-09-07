import express from "express";
import bcrypt from "bcrypt";
import pool from "./db.js"; // your db module
import cors from "cors";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
try{
  pool.connect()
  console.log("Database connected succesfully");
}catch(err){
  console.log("Database connection erro",err.message);
}

// Signup route
app.post("/signup", async (req, res) => {
  const {
    username,
    email,
    password,
    full_name,
    bio,
    phone,
    gender,
    dob,
    address,
    city,
    state,
    country,
    postal_code,
  } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Username, Email, and Password are required" });
  }

  try {
    // Check if user exists
    const check = await pool.query("SELECT * FROM users WHERE username = $1 OR email = $2", [username, email]);
    if (check.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
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
      message: "User created successfully",
      user: result.rows[0],
    });
  } catch (err) {
    console.error("❌ Signup error:", err.message);
    return res.status(500).json({ error: "Database error" });
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
