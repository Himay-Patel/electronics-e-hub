"use client";

import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';



const OrderDetailPage = () => {
  
  const params = useParams(); // Get the parameters
  const id = params.id as string; // Cast to string if you are sure it is defined
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!id) return; // Handle undefined id
      try {
        const response = await axios.get(`${process.env.API_URL}/api/order/orderdetail/${id}`);
        setOrder(response.data);
      } catch (err) {
        console.error('Error fetching order details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center mt-5"><Loader /></div>;
  }

  if (!order) {
    return <div>No order found.</div>;
    
  }

  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Order Details</h1>
        
        <h3>Order Items:</h3>
        <ul>
          {order.orderItems.map((item: { productId: { name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; price: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; category: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; company: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; color: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; quantity: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }, index: React.Key | null | undefined) => (
            <li key={index} className="mb-4">
              <strong>Product Name:</strong> {item.productId.name} <br />
              <strong>Price:</strong> ${item.productId.price} <br />
              <strong>Category:</strong> {item.productId.category.name} <br />
              <strong>Company:</strong> {item.productId.company} <br />
              <strong>Color:</strong> {item.productId.color} <br />
              <strong>Quantity:</strong> {item.quantity} <br />
            </li>
          ))}
        </ul>
        <h3>Total Amount: ${order.totalAmount}</h3>
        <h3>Payment Method: {order.paymentMethod}</h3>
        <h3>Created At: {new Date(order.createdAt).toLocaleString()}</h3>
      </div>
    </Layout>
  );
};

export default OrderDetailPage;