import express from "express";
import cors from "cors";
import signInApi from "./routes/signinapi.js";
import verify from './routes/verify.js'
import sendOtp from './routes/email.js';
import login from './routes/loginapi.js'

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", signInApi);
app.use('/api',verify);
app.use('/api',sendOtp);
app.use('/api',login)

// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
