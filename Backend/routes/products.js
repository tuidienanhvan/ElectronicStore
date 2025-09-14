import express from 'express';
const router = express.Router();
import Product from '../models/Product.js';

// Get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get product by ID
router.get('/:product_id', async (req, res) => {
    try {
        const product = await Product.findOne({ product_id: req.params.product_id });
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get products by category
router.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category.charAt(0).toUpperCase() + req.params.category.slice(1);
        const products = await Product.find({ category: category });
        if (products.length > 0) {
            res.json(products);
        } else {
            res.status(404).json({ message: 'Không tìm thấy sản phẩm trong danh mục này' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;