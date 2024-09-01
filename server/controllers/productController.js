import Product from '../models/productModel.js'

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate({path: 'category', select: "_id name"});
        res.status(200).json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

export { getAllProducts }