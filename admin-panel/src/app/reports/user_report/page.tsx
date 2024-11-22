"use client";

import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import Loader from '@/components/Loader';
import toast, { Toaster } from 'react-hot-toast';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface User {
  _id: string;
  username: string;
  email: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

const UserReport = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(process.env.API_URL + '/api/user');
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users. Please try again later.');
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filterUsersByDate = () => {
    if (startDate && endDate) {
      const filtered = users.filter((user) => {
        const userCreatedAt = new Date(user.createdAt).getTime();
        const start = new Date(startDate).getTime();
        const end = new Date(endDate).getTime();
        return userCreatedAt >= start && userCreatedAt <= end;
      });
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  };

  useEffect(() => {
    filterUsersByDate();
  }, [startDate, endDate, users]);

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('User Report', doc.internal.pageSize.width / 2, 20, { align: 'center' });

    doc.setFontSize(12);
    if (startDate && endDate) {
      doc.text(`Data from ${startDate} to ${endDate}`, doc.internal.pageSize.width / 2, 30, { align: 'center' });
    } else {
      doc.text('All Users Data', doc.internal.pageSize.width / 2, 30, { align: 'center' });
    }

    const tableColumn = ["Sr No.", "Username", "Email", "Created At", "Updated At"];
    const tableRows = filteredUsers.map((user, index) => [
      index + 1,
      user.username,
      user.email,
      new Date(user.createdAt).toLocaleDateString(),
      new Date(user.updatedAt).toLocaleDateString(),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 40,
    });

    const fileName = `user_report_between_${startDate.replace(/\//g, '-')}_to_${endDate.replace(/\//g, '-')}.pdf`;
    doc.save(fileName);
  };

  if (loading) {
    return <Loader />;
  }
  if (error) return <div className="text-center text-red-600">{error}</div>;

  return (
    <Layout>
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">User Report</h1>
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
              Download PDF
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Sr No.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Username</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Created At</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 capitalize tracking-wider">Updated At</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user, index) => (
                <tr key={user._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.updatedAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default UserReport;
