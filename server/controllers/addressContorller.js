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
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const getAddressesByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const addresses = await Address.find({ userId });

        if (!addresses.length) {
            return res.status(404).json({ message: 'No addresses found for this user.' });
        }

        res.status(200).json(addresses);
    } catch (error) {
        console.error('Error fetching addresses:', error);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

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
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

export { allAddress, userAddresses, createAddress, getAddressesByUserId }