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
  username: string;
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
  status: string;
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

  const handleStatusChange = async (orderId: string, status: string) => {

    try {
      await axios.post(`${process.env.API_URL}/api/order/updatestatus/${orderId}`, {
        _id: orderId,
        status: status
      });


      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  return (
    <Layout>
      <div className="w-full mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">All Orders</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Sr No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Total Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Update</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.userId ? order.userId.username : 'Unknown User'}</td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500">{order.address ? `${order.address.street}, ${order.address.city}, ${order.address.state} ${order.address.zipCode}` : 'No Address'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'No Date'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderItems.length}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹ {order.totalAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-5 py-2 text-white rounded-full 
                                            ${order.status === 'confirm order' ? 'bg-[#369236]' :
                        order.status === 'cancel order' ? 'bg-[#f02929]' :
                          order.status === 'dispatch order' ? 'bg-[#4141ff]' :
                            order.status === 'delivered order' ? 'bg-gray-500' :
                              'bg-[#025720]'
                      }`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <select
                      value={order.status}
                      disabled={order.status === "cancel order" || order.status === "delivered order"}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg disabled:cursor-not-allowed">
                      <option value="confirm order">Confirm Order</option>
                      <option value="cancel order">Cancel Order</option>
                      <option value="dispatch order">Dispatch Order</option>
                      <option value="delivered order">Delivered Order</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline"
                      onClick={() => handleNavigation(order._id)}
                    >
                      Show More
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
}

export default AllOrdersPage;
// thsi is my backend logic 
// const updateStatus = async (req, res) => {
//     try {
//         const { _id, status } = req.body;
//         const orderstatus = await Order.findOne({ _id: new mongoose.Types.ObjectId(_id) });

//         if (!orderstatus) {
//             res.status(404).json({ message: "Order not found" });
//         } else {
//             orderstatus.status = status;

//             await orderstatus.save();
//         }
//         res.status(201).json({
//             message: "OrderStatus updated successfully",
//         });
//     } catch (err) {
//         res.status(500).json({
//             message: "Failed to update product",
//         });
//         console.error(err);
//     }
// }
// and this is my route
// router.route('/updatestatus').post(updateStatus);