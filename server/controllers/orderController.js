import mongoose from 'mongoose';
import Order from '../models/orderModels.js';

const allOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .select("_id userId totalAmount orderItems")
        .populate({
            path: "orderItems.productId",
            select: "-createdAt -quantityAvailable -updatedAt -__v"
        });
        res.status(200).json(orders);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

const generateOrder = async (req, res) => {
    try {
        const user = req.user;
        const { totalAmount, products } = req.body;
        const orderItems = products.map(product => ({
            productId: product._id,
            quantity: product.quantity,
        }));
        const order = await Order.create({
            userId: new mongoose.Types.ObjectId(user._id),
            orderItems,
            totalAmount
        });
        res.status(201).json(order);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

export { allOrders, generateOrder }