import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import otpRoutes from './routes/otpRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import os from 'node:os';
import cluster from 'node:cluster';
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

if(os.platform() === "win32") {
    cluster.schedulingPolicy = cluster.SCHED_RR;
}

if (cluster.isPrimary) {
    for (let i = 0; i < os.availableParallelism(); i++) {
        cluster.fork();
    }
} else {
    const app = express();
    const corsOptions = {
        origin: process.env.CLIENT_URL,
        credentials: true,
    };

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    app.use(express.static(path.join(__dirname, 'public')));

    connectDB();
    app.use(express.json());
    app.use(cors(corsOptions));
    app.use(cookieParser());

    app.use("/api/user", userRoutes);
    app.use("/api/otp", otpRoutes);
    app.use("/api/product", productRoutes);
    app.use("/api/category", categoryRoutes);

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
}