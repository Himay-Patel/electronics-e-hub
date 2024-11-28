"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/components/Loading";

const OrderDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            if (!id) return;
            try {
                const response = await axios.get(
                    `${process.env.API_URL}/api/user/order/${id}`,
                    { withCredentials: true }
                );
                setOrder(response.data);
            } catch (err) {
                setError("Error fetching order details.");
                console.error("Error fetching order:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    const handleCancelOrder = async (orderId: string) => {
        const confirmCancelOrder = window.confirm("Are you sure you want to cancel this order?");
        if (confirmCancelOrder) {
            try {
                setLoading(true);
                const response = await axios.post(`${process.env.API_URL}/api/order/cancelorder`,
                    { orderId },
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    setOrder((prevOrder: any) => ({
                        ...prevOrder,
                        status: "cancel order",
                    }));
                    router.push("/order");
                } else {
                    setStatusMessage("Failed to cancel the order.");
                }
            } catch (err) {
                setStatusMessage("Failed to cancel order.");
                console.error("Error canceling order:", err);
            } finally {
                setLoading(false);
            }
        }
    };

    if (loading) return <div className="mt-10"><Loading /></div>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-semibold mb-8 text-center text-gray-800">Order Details</h1>

            {order && (
                <div className="bg-white shadow-lg rounded-lg p-6 space-y-6">
                    <div className="border-b border-gray-300 pb-6">
                        <div className="flex flex-col justify-center md:flex-row md:justify-between items-center">
                            <div className="flex flex-col justify-center items-center md:items-start">
                                <p className="text-lg font-semibold text-gray-700">Order ID: <span className="text-gray-500">{order._id}</span></p>
                                <p className="text-sm text-gray-500">Order Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="flex flex-col justify-center items-center md:items-start">
                                {/* <p className="text-lg font-semibold text-green-500">Status: {order.status}</p> */}
                                <p className={`text-lg font-semibold ${order.status === "cancel order" ? "text-red-500" : "text-green-500"}`}>
                                    Status: {order.status}
                                </p>
                                <p className="text-md text-gray-600">Payment Method: {order.paymentMethod}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex justify-between items-center">
                            <div className="flex gap-7 text-xl font-bold text-gray-900 items-center justify-center">
                                <p>Total Amount<p>(service charges - 1%):</p></p>
                                <p>₹{order.totalAmount}</p>
                            </div>
                            {/* <p className="text-xl font-bold text-gray-900">Total Amount<p>(service charges - 1%)</p>: ₹{order.totalAmount}</p> */}
                            {/* <div>
                                {order.status !== "cancel order" ? (
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none">Track Order</button>
                                ) : (
                                    <p></p>
                                )}
                            </div> */}
                        </div>
                    </div>

                    {/* Order Items Section */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800">Order Items</h2>
                        <div className="overflow-x-auto mt-4">
                            <table className="min-w-full table-auto border-collapse border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="py-3 px-4">Sr No</th>
                                        <th className="py-3 px-4">Product Name</th>
                                        <th className="py-3 px-4">Description</th>
                                        <th className="py-3 px-4">Image</th>
                                        <th className="py-3 px-4">Company</th>
                                        <th className="py-3 px-4">Price</th>
                                        <th className="py-3 px-4">Quantity</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.orderItems.map((item: any, index: number) => (
                                        <tr key={`${order._id}-${index}`} className="border-b">
                                            <td className="py-3 px-4 text-gray-600 text-center">{index + 1}</td>
                                            <td className="py-3 px-4 text-gray-600 text-center">{item.productId.name}</td>
                                            <td className="py-3 px-4 text-gray-600 text-center">{item.productId.description}</td>
                                            <td className="py-3 px-4 flex justify-center items-center">
                                                <img src={item.productId.images[0]} alt={item.productId.name} className="w-12 h-12 object-cover rounded-md mr-4" />
                                            </td>
                                            <td className="py-3 px-4 text-gray-600 text-center capitalize">{item.productId.company}</td>
                                            <td className="py-3 px-4 text-gray-600 text-center">₹{item.productId.price}</td>
                                            <td className="py-3 px-4 text-gray-600 text-center">{item.quantity}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                        {order.status !== "cancel order" ? (
                            <button
                                onClick={() => handleCancelOrder(order._id)}
                                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 focus:outline-none"
                            >
                                Cancel Order
                            </button>
                        ) : (
                            <p className="text-lg text-red-500">You have already canceled this order.</p>
                        )}
                        {/* <button className="px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 focus:outline-none">Return Items</button> */}
                    </div>
                    {statusMessage && (
                        <div className={`mt-4 text-center ${statusMessage.includes("Failed") ? "text-red-500" : "text-green-500"}`}>
                            {statusMessage}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default OrderDetailPage;
