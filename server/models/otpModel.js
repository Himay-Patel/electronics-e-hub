import mongoose, { mongo } from "mongoose";

const otpSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    otp: { 
        type: Number, 
        required: true, 
        maxLength: 4
    },
}, {
    timestamps: true
});

otpSchema.index({updatedAt: 1}, {expireAfterSeconds: 600});

const Otp = mongoose.model('otps', otpSchema);

export default Otp;