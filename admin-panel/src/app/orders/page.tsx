"use client";

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import axios from 'axios';
import { TrashIcon } from '@heroicons/react/24/solid';
import toast, { Toaster } from 'react-hot-toast';

interface OrderItem {
  _id: string;
  productId: string;
  quantity: number;
  price: number;
  orderId: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  images: string[];
}

interface Order {
  _id: string;
  userId: string;
  orderDate: string;
}

interface User {
  _id: string;
  username: string;
}

interface OrderItemWithProduct extends OrderItem {
  productName: string;
  productPrice: number;
  productImage: string[];
  customerName: string;
  orderDate: string;
}

const getOrderItems = async (): Promise<OrderItem[]> => {
  try {
    const response = await axios.get(process.env.API_URL + '/order/orderitems');
    return response.data.orderItems;
  } catch (error) {
    console.error('Failed to fetch order items:', error);
    return [];
  }
};

const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const response = await axios.get(`${process.env.API_URL}/api/products/${id}`);
    return response.data.product;
  } catch (error) {
    console.error('Failed to fetch product data:', error);
    return null;
  }
};

const getUserById = async (id: string): Promise<User | null> => {
  try {
    const response = await axios.get(`${process.env.API_URL}/users/${id}`);
    return response.data.user;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    return null;
  }
};

const getOrderById = async (id: string): Promise<Order | null> => {
  try {
    const response = await axios.get(`${process.env.API_URL}/orders/${id}`);
    return response.data.order;
  } catch (error) {
    console.error('Failed to fetch order data:', error);
    return null;
  }
};

const Orders = () => {
  const [orderItems, setOrderItems] = useState<OrderItemWithProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderItemsAndProducts = async () => {
      try {
        const items = await getOrderItems();
        const enrichedOrderItems = await Promise.all(items.map(async (item) => {
          const product = await getProductById(item.productId);
          const order = await getOrderById(item.orderId);
          const user = order ? await getUserById(order.userId) : null;
          return {
            ...item,
            productName: product ? product.name : 'Unknown',
            productPrice: product ? product.price : 0,
            productImage: product ? product.images : '',
            customerName: user ? user.username : 'Unknown',
            orderDate: order ? order.orderDate : 'Unknown',
          };
        }));
        setOrderItems(enrichedOrderItems);
      } catch (error) {
        console.error('Failed to fetch order items and products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderItemsAndProducts();
  }, []);

  const handleDelete = async (orderItemId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this orderItem?");
    if (confirmDelete) {
      try {
        const response = await axios.post(process.env.API_URL + '/removeorderitem', { _id: orderItemId });
        if (response.data.success) {
          setOrderItems(prevItems => prevItems.filter(item => item._id !== orderItemId));
          toast.error('Product deleted successfully');
        } else {
          console.error('Failed to remove order item:', response.data.message);
        }
      } catch (error) {
        console.error('Error deleting order item:', error);
      }
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">All Orders</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Sr No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Order Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Product Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Product Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Quantity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Total Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orderItems.map((item, index) => (
                <tr key={item._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.customerName.length > 0 ? (item.customerName) : ("Abc")}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.orderDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.productImage.length > 0 ? (
                      <img src={item.productImage[0]} alt={item.productName} className="w-20 h-20 object-cover" />
                    ) : (
                      'No Image'
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.productName}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{parseFloat(item.productPrice).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(parseFloat(item.productPrice) * item.quantity).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                    <div className="flex items-center justify-center bg-e_hub_graywhite rounded-md py-2 px-4">
                      <TrashIcon className="w-5 h-5" />
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-600 hover:text-red-900">
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

export default Orders;