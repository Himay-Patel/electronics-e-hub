import mongoose from 'mongoose';
import Otp from '../models/otpModel.js'
import generateOtp from '../utils/generateOtp.js';
import sendEmail from '../utils/sendEmail.js';
import generateJwtToken from '../utils/generateJWTToken.js';
import cookieOptions from '../utils/cookieOptions.js';

const generate = async (req, res) => {
    const user = req.user;
    const { isLogin } = req.body;
    try {
        const userId = new mongoose.Types.ObjectId(user._id);
        const otp = generateOtp();
        await Otp.updateOne({ user: userId }, { otp }, { upsert: true });
        await sendEmail(
            user.email, 
            otp, 
            isLogin ? user.username : null,
            isLogin ? false : true
        );
        res.status(200).json({ message: "OTP sent successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error generating OTP" });
    }
}

const verify = async (req, res) => {
    const { otp } = req.body;
    const user = req.user;
    const userId = new mongoose.Types.ObjectId(user._id);
    // console.log(user, otp);
    try {
        const doc = await Otp.findOne({ user: userId, otp });
        if (!doc) {
            return res.status(400).json({ message: "Invalid OTP" });
        } else {
            await Otp.deleteOne({ user: userId, otp });
            if(req.params.slug === "login") {
                return res.cookie("token", generateJwtToken(user._id, user.username, user.email), cookieOptions).status(200).json({ 
                    message: "OTP verified successfully",
                    user: {
                        _id: user._id,
                        username: user.username,
                        email: user.email,
                        imageUrl: user.imageUrl
                    }
                });
            } else {
                return res.status(200).json({
                    message: "OTP verified successfully",
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error verifying OTP" });
    }
}

export { generate, verify }