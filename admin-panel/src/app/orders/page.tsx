"use client";

import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface OrderItem {
  productId: string;
  quantity: number;
  
}
interface User {
  _id: string;
  username: string; // Assuming this is the field that contains the user's name
}
interface Address {
  _id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

interface Order {
  _id: string;
  userId: User | null;
  address: Address;
  orderItems: OrderItem[];
  totalAmount: number;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

const AllOrdersPage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(process.env.API_URL + '/api/order');
        console.log(response);
        
        setOrders(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center mt-5"><Loader /></div>;
  }
  const handleNavigation = (orderId: string) => {
    router.push(`/orderdetail/${orderId}`); // Navigate to a different page
  };

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Orders Admin Panel</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">User</th>
                
                <th className="px-4 py-2 border-b">Address</th>
                <th className="px-4 py-2 border-b">Date</th>
                <th className="px-4 py-2 border-b">Total Item</th>
                <th className="px-4 py-2 border-b">Total Amount</th>
                <th className="px-4 py-2 border-b">Actions</th>
                
                
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-4 py-2 border-b">{order.userId ? order.userId.username : 'Unknown User'}</td>
                  
                  <td className="px-4  py-2 border-b">{order.address ? `${order.address.street}, ${order.address.city}, ${order.address.state} ${order.address.zipCode}` : 'No Address'}</td>
                  <td className="px-4 py-2 border-b">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'No Date'}</td>
                  <td className="px-4  py-2 border-b">{order.orderItems.length}</td>
                  <td className="px-4  py-2 border-b">{order.totalAmount}</td>
                  <button 
                      className="px-4  py-2 border-b text-blue-500 hover:underline" 
                      onClick={() => handleNavigation(order._id)} // Navigate to the order detail page
                    >
                      Show More
                    </button>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}

export default AllOrdersPage;