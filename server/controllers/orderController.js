import mongoose from 'mongoose';
import Order from '../models/orderModels.js';
import Product from '../models/productModel.js';
import { sendOrdersMail } from '../utils/ordersMail.js';

const allOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .select("_id userId totalAmount orderItems address status createdAt")
            .populate({
                path: "orderItems.productId",
                select: "-quantityAvailable -updatedAt -__v"
            }).populate({
                path: "userId",
                select: "username"
            }).populate({
                path: "address",
                select: "street city state zipCode"
            });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).send('Server Error');
    }
}

const orderdetail = async (req, res) => {
    try {
        const order = await Order.findById(req.params._id)
            .populate('orderItems.productId').
            populate({
                path: "orderItems.productId",
                populate: {
                    path: "category",
                    select: "name"
                }
            });

        if (!order) {
            return res.status(500).json({ message: 'Order not found' });
        }
        res.status(200).json(order);

    } catch (error) {
        res.status(500).send('Server Error');
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params._id)
        if (!order) {
            res.status(404).json({ message: "Order not found" });
        } else {
            res.status(200).json(order);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

const updateStatus = async (req, res) => {
    try {
        const _id = req.params._id;
        const { status } = req.body;
        const orderstatus = await Order.findOne({ _id: new mongoose.Types.ObjectId(_id) });

        if (!orderstatus) {
            res.status(404).json({ message: "Order not found" });
        } else {
            orderstatus.status = status;
            await orderstatus.save();
            sendOrdersMail(orderstatus._id);
        }
        res.status(201).json({
            message: "OrderStatus updated successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update product",
        });
        console.error(err);
    }
}

const cancelOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.body;

        const order = await Order.findOne({ _id: orderId });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.status = "canceled";
        await order.save();
        await sendOrdersMail(order._id);
        return res.status(200).json({
            message: "Order status updated successfully",
            order,
        });
    } catch (err) {
        console.error("Error updating order status:", err);
        return res.status(500).json({
            message: "Failed to update order status",
        });
    }
}

const totalSales = async (req, res) => {
    try {
        const totalSale = await Order.aggregate([{ $group: { _id: null, totalSales: { $sum: '$totalAmount' } } }])
        return res.status(200).json({ totalsale: totalSale[0].totalSales })
    } catch (error) {
        res.status(500).send("server error")
    }
}

const totalProductsale = async (req, res) => {
    try {
        const orders = await Order.find().select("_id orderItems").populate({
            path: "orderItems.productId",
            select: '_id category',
            populate: {
                path: "category",
                select: "_id name"
            }
        });

        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
    }
}

const salestat = async (req, res) => {
    try {
        const salestatic = await Order.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: "$createdAt" },
                        month: { $month: "$createdAt" }
                    },
                    totalSales: { $sum: "$totalAmount" },
                },
            },
            {
                $sort: { "_id.year": -1, "_id.month": -1 }
            },
            {
                $limit: 12
            }
        ])
        return res.status(200).json(salestatic);
    } catch (error) {
        res.status(500).send("server error")
    }
}

const generateOrder = async (req, res) => {
    try {
        const user = req.user;
        const { totalAmount, products, address, paymentMethod } = req.body;
        const orderItems = products.map(product => ({
            productId: product._id,
            quantity: product.quantity,
        }));
        const order = await Order.create({
            userId: new mongoose.Types.ObjectId(user._id),
            orderItems,
            totalAmount,
            address: new mongoose.Types.ObjectId(address),
            paymentMethod
        });
        orderItems.forEach(item => {
            Product.updateOne({ _id: new mongoose.Types.ObjectId(item.productId) }, { $inc: { quantityAvailable: -item.quantity } })
                .then(res => { })
                .catch(err => { console.log(err) });
        });
        await sendOrdersMail(order._id);
        res.status(201).json(order);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

export { allOrders, generateOrder, totalSales, salestat, totalProductsale, orderdetail, getOrderById, updateStatus, cancelOrderStatus }