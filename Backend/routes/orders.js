import express from 'express';
import Order from '../models/Order.js';
import User from '../models/user.model.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Tạo đơn hàng mới
router.post('/', auth, async (req, res) => {
  try {
    const { items, total, shippingInfo } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Danh sách sản phẩm không hợp lệ' });
    }
    if (!total || total <= 0) {
      return res.status(400).json({ message: 'Tổng tiền không hợp lệ' });
    }
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(401).json({ message: 'Không tìm thấy người dùng' });
    }
    const order = new Order({
      user: user._id,
      items,
      total,
      shippingInfo: shippingInfo || {},
      status: 'pending'
    });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.error('Order create error:', err);
    res.status(500).json({ message: 'Lỗi server khi tạo đơn hàng' });
  }
});

export default router; 