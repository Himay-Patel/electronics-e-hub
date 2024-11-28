"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading";

const OrderHistory = () => {
    const router = useRouter();
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch orders when the component mounts
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(`${process.env.API_URL}/api/user/order`, {
                    withCredentials: true,
                });
                setOrders(response.data.orders);
                console.log(response.data.orders);
            } catch (err) {
                setError("Error fetching orders.");
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleNavigation = (orderId: string) => {
        router.push(`/order/${orderId}`);
    };

    if (loading) return <div className="mt-10"><Loading /></div>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6 text-center">Your Order History</h1>

            {orders.length === 0 ? (
                <p>No orders found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="py-2 px-4 border-b text-center">Order ID</th>
                                <th className="py-2 px-4 border-b text-center">Product Name</th>
                                <th className="py-2 px-4 border-b text-center">Price</th>
                                <th className="py-2 px-4 border-b text-center">Quantity</th>
                                <th className="py-2 px-4 border-b text-center">Total Amount<p>(service charges - 1%)</p></th>
                                <th className="py-2 px-4 border-b text-center">Status</th>
                                <th className="py-2 px-4 border-b text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <>
                                    {order.orderItems.map((item:any, index:any) => (
                                        <tr key={`${order._id}-${index}`} className="border-b">
                                            {index === 0 && (
                                                <td
                                                    rowSpan={order.orderItems.length}
                                                    className="py-2 px-4 border-b text-center align-middle"
                                                >
                                                    {order._id}
                                                </td>
                                            )}
                                            <td className="py-2 px-4 border-b text-center">{item.productId.name}</td>
                                            <td className="py-2 px-4 border-b text-center">₹{item.productId.price}</td>
                                            <td className="py-2 px-4 border-b text-center">{item.quantity}</td>
                                            {index === 0 && (
                                                <>
                                                    <td
                                                        rowSpan={order.orderItems.length}
                                                        className="py-2 px-4 border-b text-center align-middle"
                                                    >
                                                        ₹{order.totalAmount}
                                                    </td>
                                                    <td
                                                        rowSpan={order.orderItems.length}
                                                        className="py-2 px-4 border-b text-center align-middle"
                                                    >
                                                        <span className={order.status === "canceled" ? "text-red-500" : "text-green-500"}>
                                                            {order.status === "canceled" ? "canceled" : order.status}
                                                        </span>
                                                    </td>
                                                </>
                                            )}
                                            {index === 0 && (
                                                <>
                                                    <td
                                                        rowSpan={order.orderItems.length}
                                                        className="py-2 px-4 border-b text-center align-middle"
                                                    >
                                                        <button
                                                            className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline"
                                                            onClick={() => handleNavigation(order._id)}
                                                        >
                                                            Show More
                                                        </button>
                                                    </td>
                                                </>
                                            )}
                                        </tr>
                                    ))}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
