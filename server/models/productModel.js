import mongoose from 'mongoose'

const productSchema = mongoose.Schema({
    name: {
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
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories',
        required: true
    },
    images: [{
        type: String,
        required: true
    }],
    company: {
        type: String,
        required: true
    },
    quantityAvailable: {
        type: Number,
        required: true
    },
    color: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Product = mongoose.model('products', productSchema);

export default Product;