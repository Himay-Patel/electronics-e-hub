import Product from '../models/productModel.js'
import mongoose from 'mongoose';
import fs from 'node:fs';

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}, '-__v -createdAt -updatedAt').populate({ path: 'category', select: "_id name" });
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

const getTrendingProducts = async (req, res) => {
    try {
        const trendingProducts = await Product.aggregate([
            {
                $sample: { size: 8 }
            }
        ]);
        const populatedProducts = await Product.populate(trendingProducts, { path: 'category', select: '_id name' });

        res.status(200).json(populatedProducts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

const getLastestProducts = async (req, res) => {
    try {
        const products = await Product.find({}, '-__v -createdAt -updatedAt').sort({ createdAt: -1 }).limit(3).populate({ path: 'category', select: "_id name" });

        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
}

const addProduct = async (req, res) => {
    try {
        const images = req.files.map(element => {
            return process.env.DOMAIN_NAME + "/image/product/" + element.filename;
        });
        const { name, price, description, category, company, quantity, color } = req.body;
        const product = await Product.create({
            name,
            price: Number.parseFloat(price),
            description,
            category: new mongoose.Types.ObjectId(category),
            company,
            quantityAvailable: Number.parseInt(quantity),
            images,
            color
        });
        res.status(201).json({
            message: "Product added successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to add product",
        });
        console.error(err);
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params._id, '-__v -createdAt -updatedAt').populate({ path: 'category', select: "_id name" })
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            res.status(200).json(product);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

const updateProduct = async (req, res) => {
    try {
        const images = req.files.map(element => {
            return process.env.DOMAIN_NAME + "/image/product/" + element.filename;
        });
        const { _id, name, price, description, category, company, quantity, color } = req.body;
        const product = await Product.findOne({ _id: new mongoose.Types.ObjectId(_id) });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            const oldImages = product.images.map(image => {
                return image.split(process.env.DOMAIN_NAME)[1];
            });

            oldImages.forEach(path => {
                fs.unlinkSync('./public' + path)
            });

            product.name = name;
            product.price = Number.parseFloat(price);
            product.description = description;
            product.category = new mongoose.Types.ObjectId(category);
            product.company = company;
            product.quantityAvailable = Number.parseInt(quantity);
            product.images = images;
            product.color = color;
            await product.save();
        }
        res.status(201).json({
            message: "Product updated successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update product",
        });
        console.error(err);
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { _id } = req.body;
        const product = await Product.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(_id) });
        if (!product) {
            res.status(404).json({ message: "Product not found" });
        } else {
            const oldImages = product.images.map(image => {
                return image.split(process.env.DOMAIN_NAME)[1];
            });
            oldImages.forEach(path => {
                fs.unlinkSync('./public' + path);
            });
            res.status(200).json({
                message: "Product deleted successfully",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

const getProductColours = async (req, res) => {
    try {
        const productName = req.params.name;
        const products = await Product.find({ name: { $regex: `^${productName}$`, $options: 'i' } }).select("_id color");
        res.status(200).json(products)
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

export { getAllProducts, getTrendingProducts, getLastestProducts, addProduct, getProductById, updateProduct, deleteProduct, getProductColours }