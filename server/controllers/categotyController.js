import Category from "../models/categoryModel.js";
import mongoose from "mongoose";
import fs from 'node:fs';

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

const addCategori = async (req, res) => {
    try {
        const imageUrl = req.files.map(element => {
            return process.env.DOMAIN_NAME + "/image/category/" + element.filename;
        });
        const { name } = req.body;
        const categori = await Category.create({
            name,
            imageUrl: imageUrl[0]
        });
        res.status(201).json({
            message: "Category added successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to add categori",
        });
        console.error(err);
    }
}

const getCategoriById = async (req, res) => {
    try {
        const categori = await Category.findById(req.params._id)
        if (!categori) {
            res.status(404).json({ message: "Category not found" });
        } else {
            res.status(200).json(categori);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

const updateCategori = async (req, res) => {
    try {
        const imageUrl = req.files.map(element => {
            return process.env.DOMAIN_NAME + "/image/category/" + element.filename;
        });
        const { _id, name } = req.body;
        const categori = await Category.findOne({ _id: new mongoose.Types.ObjectId(_id) });
        if (!categori) {
            res.status(404).json({ message: "Category not found" });
        } else {
            const oldImages = categori.imageUrl.split(process.env.DOMAIN_NAME)[1];
            fs.unlinkSync('./public' + oldImages);

            categori.name = name;
            categori.imageUrl = imageUrl[0];
            await categori.save();
        }
        res.status(201).json({
            message: "Category updated successfully",
        });
    } catch (err) {
        res.status(500).json({
            message: "Failed to update category",
        });
        console.error(err);
    }
}

const deleteCategori = async (req, res) => {
    try {
        const { _id } = req.body;
        const categori = await Category.findByIdAndDelete({ _id: new mongoose.Types.ObjectId(_id) });
        if (!categori) {
            res.status(404).json({ message: "Category not found" });
        }
        else {
            const oldImages = categori.imageUrl.split(process.env.DOMAIN_NAME)[1];
            fs.unlinkSync('./public' + oldImages);
            res.status(200).json({
                message: "Category deleted successfully",
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

export { getAllCategories, addCategori, getCategoriById, updateCategori, deleteCategori }