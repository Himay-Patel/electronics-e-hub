import mogoose from 'mongoose';

const cartSchema = mogoose.Schema({
    userId: {
        type: mogoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },
    cartItems: [{
        _id: String,
        name: String,
        price: Number,
        description: String,
        category: {
            _id: String,
            name: String
        },
        images: [{
            type: String,
            required: true
        }],
        company: String,
        color: String,
        quantity: Number
    }],
    totalAmount: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

const Cart = mogoose.model('carts', cartSchema);
export default Cart;