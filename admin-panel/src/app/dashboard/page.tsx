"use client";

import Layout from '../../components/Layout';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, BarElement, ArcElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, Title, Tooltip, Legend, PointElement, BarElement, ArcElement);

const DashboardPage = () => {
    const [totalOrders,setTotalOrders] = useState<any>(0);
    const [totalCustomers,setTotalCustomer] = useState<any>(0);
    const [totalSales,setTotalSales] = useState<any>(0);
    const [lineData, setLineData] = useState<any>({ labels: [], datasets: [] });
    const [barData, setBarData] = useState<any>({ labels: [], datasets: [] });
    const [pieData, setPieData] = useState<any>({ labels: [], datasets: [] });

    useEffect(() => {
        // Generate static data for the charts
        const generateData = async () => {
            try {
                const orderresponse = await axios.get(`${process.env.API_URL}/api/order`);
                const customerresponse = await axios.get(`${process.env.API_URL}/api/user/totaluser`);
                const totalsalesresponse = await axios.get(`${process.env.API_URL}/api/order/totalsales`);
                const salestaticresponse = await axios.get(`${process.env.API_URL}/api/order/salestatic`);
                const totalproductresponse = await axios.get(`${process.env.API_URL}/api/order/totalproductsale`);

                const totalorder = orderresponse.data;
                const totaluser = customerresponse.data.countUser;
                const totalamount = totalsalesresponse.data.totalsale;
                const salestatic = salestaticresponse.data;
                const totalproduct = totalproductresponse.data;
                /* {item.orderItems.productId.category.name: } */
                const temp = totalproduct.reduce((acc:any, order:any) => {
                    order.orderItems.forEach((item:any) => {
                      const categoryName = item.productId.category.name;
                      acc[categoryName] = (acc[categoryName] || 0) + item.quantity;
                    });
                    return acc;
                  }, {});
                
                
                
                setTotalOrders(totalorder.length);
                setTotalCustomer(totaluser);
                setTotalSales(totalamount);
                const labels =  salestatic.map((item: { _id: { year: any; month: any; }; }) => `${item._id.year}-${item._id.month}`);
                const salesDataPoints =  salestatic.map((item: { totalSales: any; }) => item.totalSales);
                const revenueDataPoints = salestatic.map((item: { totalSales: any; }) => ((item.totalSales*30)/100));
                const profitDataPoints = [500, 300, 200, 400, 600, 150, 350, 250]; // Example static data for pie chart
    
                setLineData({
                    labels,
                    datasets: [
                        {
                            label: 'Sales',
                            data: salesDataPoints,
                            borderColor: '#4F46E5',
                            backgroundColor: 'rgba(79, 70, 229, 0.2)',
                            borderWidth: 2,
                        }
                    ]
                });
                
                
                
    
                setBarData({
                    labels,
                    datasets: [
                        {
                            label: 'Revenue',
                            data: revenueDataPoints,
                            backgroundColor: 'rgba(16, 185, 129, 0.8)',
                        }
                    ]
                });
    
                setPieData({
                    labels: Object.keys(temp),
                    datasets: [
                        {
                            label: 'Products',
                            data: Object.values(temp),
                            backgroundColor: ['#F59E0B', '#10B981', '#3B82F6', '#EF4444', '#6366F1', '#F97316', '#34D399', '#8B5CF6'],
                        }
                    ]
                });
                
                
            } catch (error) {
                console.log(error);
                
            }
           
        };

        generateData();
    }, []);

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                callbacks: {
                    label: (context: any) => {
                        const label = context.dataset.label || context.label || '';
                        const value = context.raw;
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };

    return (
        <Layout>
            <div className="flex flex-col gap-5">
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
                            <p className="text-2xl font-bold">{totalSales}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-2">Total Orders</h2>
                            <p className="text-2xl font-bold">{totalOrders}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow">
                            <h2 className="text-lg font-semibold mb-2">Total Customers</h2>
                            <p className="text-2xl font-bold">{totalCustomers}</p>
                        </div>
                    </div>
                </div>

                {/* Line Chart for Sales */}
               
                <div className="p-6 bg-gray-100 rounded-lg">
                    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
                        <h1 className="text-2xl font-bold mb-6">Sales Statistics</h1>
                        <div className="mb-6">
                            <Line data={lineData} options={chartOptions} />
                        </div>
                    </div>
                </div>
              

                <div className="flex flex-wrap gap-6">
                    {/* Bar Chart for Revenue */}
                    <div className="p-6 bg-gray-100 rounded-lg flex-1 min-w-[300px]">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h1 className="text-2xl font-bold mb-6">Revenue Statistics</h1>
                            <div className="mb-6">
                                <Bar data={barData} options={chartOptions} />
                            </div>
                        </div>
                    </div>

                    {/* Pie Chart for Profit */}
                    <div className="p-6 bg-gray-100 rounded-lg flex-1 min-w-[300px]">
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h1 className="text-2xl font-bold mb-6">Orders Statistics</h1>
                            <div className="mb-6">
                                <Pie data={pieData} options={chartOptions} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default DashboardPage;
