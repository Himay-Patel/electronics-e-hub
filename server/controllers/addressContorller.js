import mongoose from 'mongoose';
import Address from '../models/addressModel.js';

const allAddress = async (req, res) => {
    try {
        const addresses = await Address.find();
        res.status(200).json(addresses);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const userAddresses = async (req, res) => {
    const user = req.user;
    try {
        const addresses = await Address.find({ userId: new mongoose.Types.ObjectId(user._id) });
        res.status(200).json(addresses);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const createAddress = async (req, res) => {
    const user = req.user;
    const { name, street, city, state, zipCode } = req.body;
    try {
        const address = await Address.create({
            userId: new mongoose.Types.ObjectId(user._id),
            name,
            street,
            city,
            state,
            zipCode,
        });
        res.status(201).json(address);
    } catch(err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export { allAddress, userAddresses, createAddress }