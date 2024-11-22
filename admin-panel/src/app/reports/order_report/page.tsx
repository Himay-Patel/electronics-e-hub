"use client";

import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

interface OrderItem {
  productId: string;
  quantity: number;
  price: number; // Assuming price is a field of the product
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

const OrderReport = () => {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  // Filtered orders based on date range
  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return orderDate >= start && orderDate <= end;
    }
    if (start) {
      return orderDate >= start;
    }
    if (end) {
      return orderDate <= end;
    }
    return true; // No filter applied
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.API_URL}/api/order`);
        const fetchedOrders = response.data;

        // Fetching order details for each order
        const ordersWithDetails = await Promise.all(
          fetchedOrders.map(async (order: Order) => {
            const orderDetailResponse = await axios.get(
              `${process.env.API_URL}/api/order/orderdetail/${order._id}`
            );
            return { ...order, orderItems: orderDetailResponse.data.orderItems };
          })
        );

        setOrders(ordersWithDetails);
      } catch (err) {
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Order Report', doc.internal.pageSize.width / 2, 20, { align: 'center' });

    doc.setFontSize(12);
    if (startDate && endDate) {
      doc.text(`Data from ${startDate} to ${endDate}`, doc.internal.pageSize.width / 2, 30, { align: 'center' });
    } else {
      doc.text('All Order Data', doc.internal.pageSize.width / 2, 30, { align: 'center' });
    }

    const tableColumn = [
      'Sr No.',
      'User',
      'Product Details',
      'Address',
      'Date',
      'Total Item',
      'Total Amount',
      'Status',
    ];

    const tableRows = filteredOrders.map((order, index) => {
      const productDetails = order.orderItems
        .map((item: any) => `${item.productId.name} - Rs.${item.productId.price}`)
        .join(', ');

      const address = `${order.address.street}, ${order.address.city}, ${order.address.state} ${order.address.zipCode}`;
      const orderDate = new Date(order.createdAt).toLocaleDateString();
      const totalAmt = `Rs. ${order.totalAmount}`;

      return [
        index + 1,
        order.userId ? order.userId.username : 'Unknown User',
        productDetails,
        address,
        orderDate,
        order.orderItems.length,
        totalAmt,
        order.status,
      ];
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    const fileName = `order_report_between_${startDate.replace(/\//g, '-')}_to_${endDate.replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
  };

  if (loading) {
    return <div className="text-center mt-5"><Loader /></div>;
  }

  return (
    <Layout>
      <div className="w-full mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Order Report</h1>

        {/* Date Filters */}
        <div className='flex justify-between mb-6'>
          <div>
            <label className="mr-2">Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border px-4 py-2 rounded-md"
            />
            <label className="mx-4">End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border px-4 py-2 rounded-md"
            />
          </div>
          <div>
            <button
              onClick={downloadPDF}
              className="bg-blue-500 text-white px-6 py-2 rounded-md mb-6"
            >
              Download Report
            </button>
          </div>
        </div>

        {/* Order Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Sr No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Product Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Total Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order, index) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.userId ? order.userId.username : 'Unknown User'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="space-y-2">
                      {order.orderItems.map((item: any, index: number) => (
                        <div key={index} className="flex flex-col justify-between p-1 gap-3">
                          <p><span className='font-bold'>Name :</span> {item.productId.name}</p>
                          <p><span className='font-bold'>Price :</span> ₹ {item.productId.price}</p>
                          {/* {order.orderItems.length > 1 && index < order.orderItems.length - 1 && <hr className='border-gray-400' />} */}
                          {order.orderItems.length > 1 && index < order.orderItems.length - 1 && <p></p>}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500">{order.address ? `${order.address.street}, ${order.address.city}, ${order.address.state} ${order.address.zipCode}` : 'No Address'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'No Date'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.orderItems.length}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹ {order.totalAmount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default OrderReport;
