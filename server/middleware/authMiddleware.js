import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';
import mongoose from 'mongoose';

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || "";
    try {
        const decode = jwt.decode(token, process.env.JWT_SECRET);
        req.user = await User.findOne({ _id: new mongoose.Types.ObjectId(decode._id) }, ["-password", "-createdAt", "-updatedAt", "-__v"]);
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
}

export default authMiddleware;