import dotenv from "dotenv";
import pkg from "pg";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const { Pool } = pkg;

// Explicitly load .env from backend folder
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

 // TEMP for debugging

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: String(process.env.PGPASSWORD), // force string
  port: Number(process.env.PGPORT),
});

export default pool;

