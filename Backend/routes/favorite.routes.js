import express from 'express';
import User from '../models/user.model.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// Lấy danh sách yêu thích của user
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .populate('favorites');
    res.json(user.favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Thêm/Xóa sản phẩm khỏi danh sách yêu thích
router.post('/:productId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const productId = req.params.productId;

    const favoriteIndex = user.favorites.indexOf(productId);

    if (favoriteIndex > -1) {
      // Nếu sản phẩm đã có trong danh sách yêu thích thì xóa
      user.favorites.splice(favoriteIndex, 1);
    } else {
      // Nếu chưa có thì thêm vào
      user.favorites.push(productId);
    }

    await user.save();

    // Trả về danh sách yêu thích đã populate
    const updatedUser = await User.findById(req.user.userId)
      .populate('favorites');
    res.json(updatedUser.favorites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 