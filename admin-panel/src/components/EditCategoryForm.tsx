"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import toast from 'react-hot-toast';

interface Category {
    _id: string
    name: string
    imageUrl: string
}

interface EditCategoryFormProps {
    categori: Category;
}



const EditCategoryForm: React.FC<EditCategoryFormProps> = ({ categori }) => {
    const [name, setName] = useState(categori.name);
    const [file, setFile] = useState<File[]>([]);
    const router = useRouter();

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(Array.from(e.target.files));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(categori._id);
        const formData = new FormData();
        formData.append("_id", categori._id);
        formData.append('name', name);

        file.forEach(image => {
            formData.append('imageUrl', image);
        })

        try {
            const response = await axios.post(process.env.API_URL + '/api/category/update', formData);
            toast.success('Category updates successfully!');
            setName('');
            setFile([]);
            router.push('/categories');
        } catch (err) {
            console.error('Error adding product:', err);
            toast.error('Error! Please try again.');
        }
    }

    return (
        <div className="max-w-5xl mx-auto p-8 bg-e_hub_graywhite rounded-lg">
            <h1 className="text-xl font-semibold text-center">Update Category</h1>
            <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
                <div>
                    <label htmlFor="name" className="text-lg font-semibold text-e_hub_light_black">Category Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-12 px-4 mt-2 text-e_hub_light_black border border-opacity-50 border-e_hub_light_black rounded-md focus:outline-none focus:border-e_hub_orange focus:ring-e_hub_orange"
                        required
                    />
                </div>
                <div className="mt-4">
                    <label htmlFor="imageUrl" className="text-lg font-semibold text-e_hub_light_black">Category Image</label>
                    <input
                        type="file"
                        id="imageUrl"
                        name="imageUrl"
                        onChange={onFileChange}
                        required
                        className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
                    />
                </div>
                <button
                    type="submit"
                    className="mt-5 w-full py-2 px-4 bg-e_hub_graywhite text-e_hub_light_black ring-1 ring-e_hub_light_black font-medium rounded-md hover:bg-e_hub_light_black hover:text-e_hub_white focus:outline-none focus:ring-2">
                    Update Category
                </button>
            </form>
        </div>
    )
}

export default EditCategoryForm