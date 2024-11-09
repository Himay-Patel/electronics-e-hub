import mongoose from 'mongoose';
import Order from '../models/orderModels.js';
import Product from '../models/productModel.js';

const allOrders = async (req, res) => {
    try {
        const orders = await Order.find()
        .select("_id userId totalAmount orderItems address createdAt")
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
const orderdetail = async (req,res)=> {
    try {
        

         // Find the order by ID
         const order = await Order.findById(req.params._id)
         .populate('orderItems.productId').
         populate({
            path: "orderItems.productId",
            populate:{
                path:"category",
                select:"name"
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
const totalSales = async (req,res)=> {
    try {
        const totalSale = await Order.aggregate([{$group : { _id: null, totalSales: { $sum: '$totalAmount' }}}])
        return res.status(200).json({totalsale : totalSale[0].totalSales})
    } catch (error) {
        res.status(500).send("server error")
    }
}
const totalProductsale = async(req,res) => {
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
const salestat = async(req,res) => {
    try {
        const salestatic = await Order.aggregate([
            {
                $group: {
                  _id: { year: { $year: "$createdAt" },
                  month: { $month: "$createdAt" } },
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
            Product.updateOne({ _id: new mongoose.Types.ObjectId(item.productId)}, { $inc: { quantityAvailable: -item.quantity }})
            .then(res => {})
            .catch(err => {console.log(err)});
        });
        res.status(201).json(order);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}

export { allOrders, generateOrder, totalSales, salestat, totalProductsale, orderdetail }