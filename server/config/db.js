import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MognoDB Connected");
    } catch (err) {
        console.log(err);
    }
}

export default connectDB