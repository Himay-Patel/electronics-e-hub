"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { TrashIcon, PlusIcon, PencilIcon } from '@heroicons/react/24/solid';
import { toast, Toaster } from 'react-hot-toast';
import Loader from '@/components/Loader';
import Link from 'next/link';

interface Category {
    _id: string;
    name: string;
    imageUrl: string;
}

const CategoriesPage = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(process.env.API_URL + '/api/category');
                setCategories(response.data);
            } catch (error) {
                setError('Failed to fetch categories. Please try again later.');
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleUpdate = async (_id: string) => {
        router.push(`/updatecategory/${_id}`);
    };

    const handleDelete = async (_id: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this category?");
        if (confirmDelete) {
            try {
                await axios.post(process.env.API_URL + '/api/category/delete', { _id });
                setCategories(categories.filter(category => category._id !== _id));
                toast.success('Category deleted successfully');
            } catch (error) {
                setError('Failed to delete category. Please try again later.');
            }
        }
    };

    if (loading) return <Loader />;
    if (error) return <div className="text-center text-red-600">{error}</div>;

    return (
        <Layout>
            <Toaster position="top-center" reverseOrder={false} />
            <div className="w-full mx-auto p-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold mb-6">All Categories</h1>
                    {/* Uncomment this section if you want to add an Add Category button */}
                    <Link href='/categories/add'>
                        <button className="flex items-center justify-center bg-e_hub_graywhite rounded-md py-2 px-4 text-blue-600 hover:text-blue-900">
                            <PlusIcon className="w-5 h-5" />
                            Add Category
                        </button>
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Sr No.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Image</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {categories.map((category, index) => (
                                <tr key={category._id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                                    <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500">{category.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <img src={category.imageUrl} alt={category.name} className="w-20 h-20 object-cover" />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleUpdate(category._id)}
                                                className="bg-e_hub_graywhite rounded-md text-blue-600 hover:text-blue-900 flex gap-2 items-center justify-center py-2 px-4">
                                                <PencilIcon className="w-5 h-5" />
                                                Update
                                            </button><button
                                                onClick={() => handleDelete(category._id)}
                                                className="bg-e_hub_graywhite rounded-md text-red-600 hover:text-red-900 flex gap-2 items-center justify-center py-2 px-4">
                                                <TrashIcon className="w-5 h-5" />
                                                Delete
                                            </button>
                                        </div>
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

export default CategoriesPage;
