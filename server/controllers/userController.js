import User from '../models/userModel.js';
import generateJwtToken from '../utils/generateJwtToken.js';
import cookieOptions from '../utils/cookieOptions.js';
import mongoose from 'mongoose';
import { validateEmail } from '../utils/emailValidator.js';

const register = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    try {
        const isEmailValid = await validateEmail(email);
        if(!isEmailValid) {
            return res.status(400).json({ message: 'Invalid email' });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        } else {
            const user = await User.create({
                username: firstname + " " + lastname,
                email,
                password
            });
            await user.encryptPassword(password);
            const token = generateJwtToken(user._id, user.username, user.email);
            return res.cookie('token', token, cookieOptions).status(201).json({
                message: "User created successfully",
                user: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    imageUrl: user.imageUrl
                },
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        } else {
            const isMatch = await user.matchPassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: "Invalid credentials" });
            } else {
                const token = generateJwtToken(user._id, user.username, user.email, "10m");
                return res.cookie('token', token, cookieOptions).status(200).json({
                    message: "Valid credentials",
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

const logout = async (req, res) => {
    try {
        return res.clearCookie('token').status(200).json({
            message: "User logged out successfully",
        });
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

const initiateResetPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if(user) {
            const token = generateJwtToken(user._id, user.username, user.email, "10m");
            return res.cookie('token', token, cookieOptions).status(200).json({
                message: "Reset password initiated successfully",
            });
        } else {
            return res.status(400).json({ message: "User not found" });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}
const totalUser = async(req,res)=>{
    
    try {
        const countUser = await User.countDocuments();
        return res.status(200).json({ countUser});
        console.log(countUser);
        
    } catch (error) {
        return res.status(500).json({ message : "server error"})
    }
}

const resetPassword = async (req, res) => {
    const user = req.user;
    const userId = new mongoose.Types.ObjectId(user._id);
    const { password } = req.body;

    try {
        const user = await User.findOneAndUpdate({ _id: userId }, { password });
        await user.encryptPassword(password);
        return res.clearCookie('token').status(200).json({ message: "Password reset successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

export { register, login, logout, initiateResetPassword, resetPassword, totalUser }