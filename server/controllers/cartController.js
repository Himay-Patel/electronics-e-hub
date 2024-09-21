import Cart from '../models/cartModel.js';
import mongoose, { mongo } from 'mongoose';

const generate = async (req, res) => {
    try {
        const user = req.user;
        const userId = new mongoose.Types.ObjectId(user._id);
        const cart = await Cart.create({
            userId
        });
        const response = await cart.populate({
            path: 'userId',
            select: '_id username email imageUrl'
        });
        res.status(201).json({
            message: 'Cart created successfully', user: {
                _id: response.userId._id,
                username: response.userId.username,
                email: response.userId.email,
                imageUrl: response.userId.imageUrl,
                cartId: response._id
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const modify = async (req, res) => {
    try {
        const { cartId, cartItems, cartTotal } = req.body;
        const userId = req.user._id;
        const cart = await Cart.findOneAndUpdate({ 
            _id: new mongoose.Types.ObjectId(cartId) 
        }, {
            $set: {
                cartItems,
                totalAmount: cartTotal
            }
        });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        } else {
            res.status(200).json({ message: 'Cart modified successfully' });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getDetails = async (req, res) => {
    const _id = new mongoose.Types.ObjectId(req.params._id);
    try {
        const cart = await Cart.findOne({ _id }).select("_id totalAmount cartItems");
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        } else {
            return res.status(200).json({
                cart
            });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export { generate, modify, getDetails }