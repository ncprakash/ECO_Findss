import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/signinapi.js';
import userRoutes from './routes/users.js';
import listingRoutes from './routes/listings.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';
import friendRequestRoutes from './routes/friendRequests.js';
import ecoPointsRoutes from './routes/ecopoints.js';
import addressRoutes from './routes/addresses.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ES module __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/listings', listingRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);
app.use('/friend-requests', friendRequestRoutes);
app.use('/eco-points', ecoPointsRoutes);
app.use('/addresses', addressRoutes);

// Serve React in production only
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`EcoFinds server running on port ${PORT}`);
});
