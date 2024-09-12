"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/24/solid';
import { toast, Toaster } from 'react-hot-toast';
import Loader from '@/components/Loader';

interface Product {
  _id: string
  name: string
  price: Number
  description: string,
  quantityAvailable: Number
  category: {
      _id: string,
      name: string
  }
  images: string[]
  company: string
  color: string
}
const AllProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(process.env.API_URL + '/api/product');
        setProducts(response.data);
      } catch (error) {
        setError('Failed to fetch products. Please try again later.');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (_id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await axios.post(process.env.API_URL + '/api/product/delete', { _id });
        setProducts(products.filter(product => product._id !== _id));
        toast.success('Product deleted successfully');
      } catch (error) {
        setError('Failed to delete product. Please try again later.');
      }
    }
  };

  const handleUpdate = async (_id: string) => {
    router.push(`/updateproduct/${_id}`);
  };

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full mx-auto p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-6">All Products</h1>
          {/* <Link href='/products/add'>
            <div className="flex items-center justify-center bg-e_hub_graywhite rounded-md py-2 px-4">
              <PlusIcon className="w-5 h-5" />
              <button className="text-blue-600 hover:text-blue-900">
                Add Product
              </button>
            </div>
          </Link> */}
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Sr No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Categories</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Color</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Images</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price.toString()}</td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500">{product.description}</td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500">{product.category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantityAvailable.toString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.color}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.images.length > 0 ? (
                      <img src={product.images[0]} alt={product.name} className="w-20 h-20 object-cover" />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex gap-2">
                      <div className="flex items-center justify-center bg-e_hub_graywhite rounded-md py-2 px-4">
                        <PencilIcon className="w-5 h-5" />
                        <button
                          onClick={() => handleUpdate(product._id)}
                          className="text-blue-600 hover:text-blue-900 mr-4">
                          Update
                        </button>
                      </div>
                      <div className="flex items-center justify-center bg-e_hub_graywhite rounded-md py-2 px-4">
                        <TrashIcon className="w-5 h-5" />
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="text-red-600 hover:text-red-900">
                          Delete
                        </button>
                      </div>
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

export default AllProductsPage;
