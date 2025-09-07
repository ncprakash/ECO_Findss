import express from 'express';
import bcrypt from 'bcrypt';
import pool from './db.js';
import cors from 'cors';

const app = express();
const port = 3000;
 app.use(cors())
// Middleware
app.use(express.json());

// Test DB connection
(async () => {
  try {
    const client = await pool.connect();
    console.log("Database connected successfully");
    client.release();
  } catch (err) {
    console.log("Database connection failed:", err.message);
  }
})();

// Signup route
app.post('/signin', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Check if user exists
    const check = await pool.query("SELECT * FROM users WHERE name = $1", [name]);
    if (check.rows.length > 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const query = "INSERT INTO users(name,email,password) VALUES ($1,$2,$3) RETURNING *";
    const values = [name, email, hashedPassword];
    const result = await pool.query(query, values);

    return res.status(201).json({ user: result.rows[0] });

  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "Database error" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
