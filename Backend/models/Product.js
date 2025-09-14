import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    product_id: {
        type: String,
        required: true,
        unique: true
    },
    product_title: {
        type: String,
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    Specification: [{
        type: String
    }],
    availability: {
        type: Boolean,
        default: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    sold: {
        type: Number,
        default: 0
    }
});

export default mongoose.model('Product', productSchema);