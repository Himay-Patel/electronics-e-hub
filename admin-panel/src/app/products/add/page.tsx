"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '@/components/Layout';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';

interface Category {
  _id: string,
  name: string,
  imageUrl: string
}

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(''); // Default category
  const [company, setCompany] = useState('');
  const [quantity, setQuantity] = useState('');
  const [files, setFiles] = useState<File[]>([]); // Array for multiple files
  const [color, setColor] = useState('');

  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(process.env.API_URL + '/api/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files)); // Convert FileList to Array
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('company', company);
    formData.append('quantity', quantity);
    formData.append('color', color);

    // Append files to FormData
    files.forEach((file) => {
      formData.append(`images`, file);
    });

    const priceRegex = /^\d+(\.\d{1,2})?$/;
    if (!priceRegex.test(price)) {
      alert('Invalid price format. Use a positive number with up to two decimal places.');
      return;
    }

    const quantityRegex = /^\d+$/;
    if (!quantityRegex.test(quantity)) {
      alert('Invalid quantity. Use a positive integer.');
      return;
    }

    try {
      const response = await axios.post(process.env.API_URL + '/api/product/add', formData);
      toast.success('Product added successfully!');
      (document.getElementById('images') as HTMLInputElement).value = '';
      setName('');
      setPrice('');
      setDescription('');
      setCategory('');
      setCompany('');
      setQuantity('');
      setColor('');
      setFiles([]);
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Error! Please try again.');
    }
  };

  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="max-w-5xl mx-auto p-8 bg-e_hub_graywhite rounded-lg">
        <h1 className="text-xl font-semibold text-center">Add New Product</h1>
        <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
          <div className="flex flex-col gap-10 mb-4">
            <div className="flex gap-10 mb-4">
              <div className='w-full'>
                <label htmlFor="name" className="text-lg font-semibold text-e_hub_light_black">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => { setName(e.target.value) }}
                  className="w-full h-12 px-4 mt-2 text-e_hub_light_black border border-opacity-50 border-e_hub_light_black rounded-md focus:outline-none focus:border-e_hub_orange focus:ring-e_hub_orange"
                  required
                />
              </div>
              <div className='w-full'>
                <label htmlFor="price" className="text-lg font-semibold text-e_hub_light_black">Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  pattern="\d*\.?\d*"
                  value={price}
                  onChange={(e) => { setPrice(e.target.value) }}
                  className="w-full h-12 px-4 mt-2 text-e_hub_light_black border border-opacity-50 border-e_hub_light_black rounded-md focus:outline-none focus:border-e_hub_orange focus:ring-e_hub_orange"
                  required
                />
              </div>
            </div>
            <div className="col-span-2">
              <label htmlFor="description" className="text-lg font-semibold text-e_hub_light_black">Description</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => { setDescription(e.target.value) }}
                className="w-full h-24 px-4 mt-2 border border-e_hub_light_black rounded-md focus:outline-none focus:border-e_hub_orange focus:ring-e_hub_orange"
                rows={4}
                required
              />
            </div>
            <div>
              <label htmlFor="categories" className="text-lg font-semibold text-e_hub_light_black">Category</label>
              <select
                id="categories"
                name="categories"
                value={category}
                onChange={(e) => { setCategory(e.target.value) }}
                className="w-full h-12 px-4 mt-2 text-e_hub_light_black border border-opacity-50 border-e_hub_light_black rounded-md focus:outline-none focus:border-e_hub_orange focus:ring-e_hub_orange"
                required>
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="flex gap-10 mb-4">
              <div>
                <label htmlFor="company" className="text-lg font-semibold text-e_hub_light_black">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={company}
                  onChange={(e) => { setCompany(e.target.value) }}
                  className="w-full h-12 px-4 mt-2 text-e_hub_light_black border border-opacity-50 border-e_hub_light_black rounded-md focus:outline-none focus:border-e_hub_orange focus:ring-e_hub_orange"
                  required
                />
              </div>
              <div>
                <label htmlFor="quantity" className="text-lg font-semibold text-e_hub_light_black">Quantity</label>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  pattern="\d*"
                  value={quantity}
                  onChange={(e) => { setQuantity(e.target.value) }}
                  className="w-full h-12 px-4 mt-2 text-e_hub_light_black border border-opacity-50 border-e_hub_light_black rounded-md focus:outline-none focus:border-e_hub_orange focus:ring-e_hub_orange"
                  required
                />
              </div>
              <div>
                <label htmlFor="color" className="text-lg font-semibold text-e_hub_light_black">Color</label>
                <input
                  type="text"
                  id="color"
                  name="color"
                  value={color}
                  onChange={(e) => { setColor(e.target.value) }}
                  className="w-full h-12 px-4 mt-2 text-e_hub_light_black border border-opacity-50 border-e_hub_light_black rounded-md focus:outline-none focus:border-e_hub_orange focus:ring-e_hub_orange"
                  required
                />
              </div>
            </div>
          </div>

          <div className="">
            <label htmlFor="images" className="text-lg font-semibold text-e_hub_light_black">Images</label>
            <div className="flex gap-5 mt-2">
              <div>
                <label htmlFor="image1" className="text-sm font-semibold text-e_hub_light_black">Upload Images</label>
                <input
                  type="file"
                  name="images"
                  id='images'
                  onChange={onFileChange}
                  multiple
                  required
                  className="mt-1 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-md file:text-sm file:font-medium file:bg-gray-50 hover:file:bg-gray-100"
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="mt-5 w-full py-2 px-4 bg-e_hub_graywhite text-e_hub_light_black ring-1 ring-e_hub_light_black font-medium rounded-md hover:bg-e_hub_light_black hover:text-e_hub_white focus:outline-none focus:ring-2">
            Add Product
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddProduct;