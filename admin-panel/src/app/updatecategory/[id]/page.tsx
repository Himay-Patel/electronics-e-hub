"use client";

import EditCategoryForm from '@/components/EditCategoryForm';
import Layout from '@/components/Layout'
import Loader from '@/components/Loader'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

interface EditCategoryProps {
    params: {
        id: string;
    };
}

interface Category {
    _id: string
    name: string
    imageUrl: string
}

const getCategoryById = async (id: string): Promise<Category | null> => {
    try {
        const response = await fetch(`${process.env.API_URL}/api/category/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: "include",
            cache: 'no-store',
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error('Failed to fetch category data.');
        }
        return data.categori;
    } catch (error) {
        console.error('Failed to fetch category data:', error);
        return null;
    }
}

const EditCategori: React.FC<EditCategoryProps> = ({ params }) => {

    const { id } = params;
    const [categori, setCategori] = useState<Category | null>(null);

    useEffect(() => {
        axios.get(`${process.env.API_URL}/api/category/${id}`, {
            withCredentials: true
        })
            .then(response => {
                console.log(response);
                setCategori(response.data);
            })
            .catch(err => {
                console.error(err);
            })
    }, [id]);

    return (
        <Layout>
            <Toaster position="top-center" reverseOrder={false} />
            <div>
                {categori ? (
                    <EditCategoryForm categori={categori} />
                ) : (
                    <Loader />
                )}
            </div>
        </Layout>
    )
}

export default EditCategori