import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Import routes
import authRoutes from './routes/auth.routes.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.routes.js';
import favoriteRoutes from './routes/favorite.routes.js';
import orderRoutes from './routes/orders.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Connect to MongoDB with improved error handling
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Start server after MongoDB connection
connectToMongoDB().then(() => {
  const PORT = process.env.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/orders', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON format' });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.name === 'MongoServerError' && err.code === 11000) {
    return res.status(400).json({ message: 'Duplicate key error', details: err.keyValue });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong on the server!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});