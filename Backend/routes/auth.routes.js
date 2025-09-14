import express from 'express';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import User from '../models/user.model.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Đăng ký
router.post('/register',
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, password } = req.body;
      console.log('Register request data:', { name, email });

      // Kiểm tra email đã tồn tại
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }

      // Tạo user mới
      user = new User({ name, email, password });
      await user.save();
      console.log('User saved successfully:', { id: user._id, email: user.email });

      // Tạo token
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (err) {
      console.error('Register error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
      res.status(500).json({
        message: 'Server error during registration',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
);

// Đăng nhập
router.post('/login',
  [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').exists().withMessage('Password is required')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;
      console.log('Login request data:', { email });

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email
        }
      });
    } catch (err) {
      console.error('Login error:', {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
      res.status(500).json({
        message: 'Server error during login',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
      });
    }
  }
);

// Lấy thông tin user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Get user info error:', {
      message: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
    res.status(500).json({
      message: 'Server error while fetching user info',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

export default router;