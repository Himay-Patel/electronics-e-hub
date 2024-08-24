import Category from "../models/categoryModel.js";

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

export { getAllCategories }