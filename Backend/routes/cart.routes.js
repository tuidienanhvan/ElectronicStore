import express from 'express';
import User from '../models/user.model.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Lấy giỏ hàng của user
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('cart.product');
    res.json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Thêm sản phẩm vào giỏ hàng
router.post('/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const productId = req.params.productId;
    const quantity = req.body.quantity || 1;

    // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
    const cartItemIndex = user.cart.findIndex(
      item => item.product.toString() === productId
    );

    if (cartItemIndex > -1) {
      // Nếu có rồi thì tăng số lượng
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      // Nếu chưa có thì thêm mới
      user.cart.push({ product: productId, quantity });
    }

    await user.save();
    
    // Trả về giỏ hàng đã populate
    const updatedUser = await User.findById(req.user.userId)
      .populate('cart.product');
    res.json(updatedUser.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Cập nhật số lượng sản phẩm trong giỏ hàng
router.put('/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const productId = req.params.productId;
    const { quantity } = req.body;

    const cartItem = user.cart.find(
      item => item.product.toString() === productId
    );

    if (!cartItem) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cartItem.quantity = quantity;
    await user.save();

    const updatedUser = await User.findById(req.user.userId)
      .populate('cart.product');
    res.json(updatedUser.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Xóa sản phẩm khỏi giỏ hàng
router.delete('/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const productId = req.params.productId;

    user.cart = user.cart.filter(
      item => item.product.toString() !== productId
    );

    await user.save();

    const updatedUser = await User.findById(req.user.userId)
      .populate('cart.product');
    res.json(updatedUser.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 