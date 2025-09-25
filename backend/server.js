import express from "express";
import cors from "cors";
import signInApi from "./routes/signinapi.js";
import verify from './routes/verify.js'
import sendOtp from './routes/email.js';
import login from './routes/loginapi.js'
import Profile from './routes/users.js';
import productRoutes from "./routes/products.js";
import userDashboard from "./routes/userDashboard.js";
import cloud from "./routes/cloudinary.js";
import posts from "./routes/communityPost.js"
import productDetails from "./routes/productDetail.js"
import friends from "./routes/friends.js"
const app = express();
import http from "http";
import setupChat from "./routes/chatting.js";
const port = process.env.PORT || 3000;
const server = http.createServer(app);
// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  credentials: true
}));
app.use(express.json());


app.use("/api", signInApi);
app.use('/api',verify);
app.use('/api',sendOtp);
app.use('/api',login)
app.use('/api',Profile);
app.use("/api", productRoutes);
app.use("/api",cloud)
app.use("/api", userDashboard)
app.use("/api",posts);
app.use('/api',productDetails)
app.use('/api', friends)

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    socket: 'Socket.io server is running'
  });
});

const io = setupChat(server);
// Start server
server.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
