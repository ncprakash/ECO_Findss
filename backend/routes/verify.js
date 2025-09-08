import express from "express";
const router = express.Router();

// Temporary OTP store (in-memory, resets when server restarts)
const otpStore = {};

// OTP verification endpoint
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  const record = otpStore[email];

  if (!record) {
    return res.status(400).json({ error: "No OTP sent to this email" });
  }

  if (Date.now() > record.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ error: "OTP expired" });
  }

  if (record.otp !== otp) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  delete otpStore[email]; // OTP used up
  return res.json({ message: "OTP verified successfully" });
});

export default router;
