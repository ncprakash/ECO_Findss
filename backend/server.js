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
const app = express();
import http from "http";
import setupChat from "./routes/chatting.js";
const port = 3000;
const server = http.createServer(app);
// Middleware
app.use(cors());
app.use(express.json());

// Routes
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

const io = setupChat(server);
// Start server
server.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
