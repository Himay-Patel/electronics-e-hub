"use client";

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import Loader from '@/components/Loader';
import toast, { Toaster } from 'react-hot-toast';

interface User {
    _id: string;
    username: string;
    email: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

interface Address {
    _id: string;
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [addresses, setAddresses] = useState<Record<string, Address[]>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(process.env.API_URL + '/api/user');
                setUsers(response.data);
            } catch (error) {
                setError('Failed to fetch users. Please try again later.');
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const fetchAddresses = async (userId: string) => {
        try {
            const response = await axios.get(`${process.env.API_URL}/api/address/user=${userId}`);
            setAddresses((prev) => ({ ...prev, [userId]: response.data }));
        } catch (error) {
            setError('Address not found.  Please try again later.');
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (_id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");
        if (confirmDelete) {
            try {
                await axios.post(process.env.API_URL + '/api/user/delete', { _id });
                setUsers(users.filter(user => user._id !== _id));
                toast.success('User deleted successfully');
            } catch (error) {
                setError('Failed to delete user. Please try again later.');
            }
        }
    };


    if (loading) {
        return <Loader />;
    }
    if (error) return <div className="text-center text-red-600">{error}</div>;

    return (
        <Layout>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full mx-auto p-6">
                <h1 className="text-3xl font-bold mb-6">All Users</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Sr No.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Username</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Addresses</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Profile Pic</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Created At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Updated At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button onClick={() => fetchAddresses(user._id)} className="flex items-center justify-center text-blue-600 hover:text-blue-900 bg-slate-300 p-2 rounded-lg">
                                            Show All Addresses
                                        </button>
                                        {addresses[user._id] && (
                                            <ul className="mt-2 text-sm text-gray-700 whitespace-pre-wrap">
                                                {addresses[user._id].map((address, index) => (
                                                    <li key={address._id}>
                                                        <span className='font-bold'>Address {index + 1} : </span>
                                                        {address.street}, {address.city}, {address.state} -{" "}
                                                        {address.zipCode}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {user.imageUrl ? (
                                            <img src={user.imageUrl} alt="Profile" className="w-10 h-10 rounded-full object-cover" />
                                        ) : (
                                            'No Image'
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.updatedAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                                        <button
                                            onClick={() => handleDelete(user._id)}
                                            className="flex items-center justify-center text-red-600 hover:text-red-900 bg-slate-300 p-2 rounded-lg">
                                            <TrashIcon className="w-5 h-5" />
                                            <p>Delete</p>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
};

export default Users;
