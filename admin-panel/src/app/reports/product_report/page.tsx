"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import { toast, Toaster } from 'react-hot-toast';
import Loader from '@/components/Loader';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface Product {
  _id: string;
  name: string;
  price: Number;
  description: string;
  quantityAvailable: Number;
  category: {
    _id: string;
    name: string;
  };
  images: string[];
  company: string;
  color: string;
  createdAt: string;
}

const ProductReport = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(process.env.API_URL + '/api/product');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        setError('Failed to fetch products. Please try again later.');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterProductsByDate = () => {
    if (startDate && endDate) {
      const filtered = products.filter((product) => {
        const productCreatedAt = new Date(product.createdAt).getTime();
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        return productCreatedAt >= start && productCreatedAt <= end;
      });
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  useEffect(() => {
    filterProductsByDate();
  }, [startDate, endDate, products]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Product Report', doc.internal.pageSize.width / 2, 20, { align: 'center' });

    doc.setFontSize(12);
    if (startDate && endDate) {
      doc.text(`Data from ${startDate} to ${endDate}`, doc.internal.pageSize.width / 2, 30, { align: 'center' });
    } else {
      doc.text('All Product Data', doc.internal.pageSize.width / 2, 30, { align: 'center' });
    }

    const tableColumn = ['Sr No.', 'Name', 'Price', 'Description', 'Category', 'Company', 'Quantity', 'Color', 'Created At']
    const tableRows = filteredProducts.map((product, index) => [
      index + 1,
      product.name,
      product.price.toString(),
      product.description,
      product.category.name,
      product.company,
      product.quantityAvailable.toString(),
      product.color,
      new Date(product.createdAt).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    const fileName = `product_report_between_${startDate.replace(/\//g, '-')}_to_${endDate.replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
  };

  useEffect(() => {
    filterProductsByDate();
  }, [startDate, endDate, products]);

  if (loading) return <Loader />;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Product Report</h1>
        <div className='flex justify-between'>
          <div className="mb-6">
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
          <div className="mb-6">
            <button
              onClick={downloadPDF}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Download Report
            </button>
          </div>
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Created At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product, index) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500">{product.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.price.toString()}</td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500">{product.description}</td>
                  <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-500">{product.category.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.quantityAvailable.toString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.color}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(product.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default ProductReport;
