"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import axios from 'axios';
import Link from 'next/link';

const EditProfile = () => {
    const [user, setUser] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });

    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            const [firstname, ...lastnameArray] = parsedUser.username.split(' ');
            const lastname = lastnameArray.join(' ');

            setUser({
                firstname: firstname || '',
                lastname: lastname || '',
                email: parsedUser.email || ''
            });
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fileInput = e.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            setProfileImage(fileInput.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        formData.append('firstname', user.firstname);
        formData.append('lastname', user.lastname);
        formData.append('email', user.email);

        if (profileImage) {
            formData.append('image', profileImage);
        }

        try {
            const response = await axios.post(`${process.env.API_URL}/api/user/updateprofile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                localStorage.setItem('user', JSON.stringify(response.data));
                router.push('/profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-e_hub_white">
            <div className="bg-e_hub_white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Edit Profile</h2>
                <form onSubmit={handleSubmit} className="space-y-6" method='post'>
                    <div>
                        <label htmlFor="firstname" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstname"
                            id="firstname"
                            value={user.firstname}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="lastname" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastname"
                            id="lastname"
                            value={user.lastname}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Profile Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-e_hub_black text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2"
                        >
                            {loading ? 'Updating...' : 'Save Changes'}
                        </button>
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            disabled={loading}
                            className="w-full bg-e_hub_black text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2"
                        >
                            Change Password
                        </button>
                    </div>

                    <div className="flex items-center justify-end">
                        <Link href="/profile" className="mt-4 text-blue-500 hover:underline">
                            Back to Profile
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
