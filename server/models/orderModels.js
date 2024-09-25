import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addrresses',
        required: true
    },
    orderItems: [{
        _id: false,
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        required: true
    },
    
}, {
    timestamps: true
});

const Order = mongoose.model('orders', orderSchema);
export default Order;