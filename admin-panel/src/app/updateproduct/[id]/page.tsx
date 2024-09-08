"use client";

import React, { useEffect, useState } from 'react';
import EditProductForm from '@/components/EditProductForm';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';

interface EditProductProps {
    params: {
        id: string;
    };
}

interface Product {
    _id: string
    name: string
    price: Number
    description: string,
    quantityAvailable: Number
    category: {
        _id: string,
        name: string
    }
    images: string[]
    company: string
    color: string
}

const getProductById = async (id: string): Promise<Product | null> => {
    try {
        const response = await fetch(`${process.env.API_URL}/api/product/${id}`, {
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
            throw new Error('Failed to fetch product data.');
        }

        return data.product;
    } catch (error) {
        console.error('Failed to fetch product data:', error);
        return null;
    }
};

const EditProduct: React.FC<EditProductProps> = ({ params }) => {
    const { id } = params;
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        // const fetchProduct = async () => {
        //     const fetchedProduct = await getProductById(id);
        //     setProduct(fetchedProduct);
        // };

        // fetchProduct();
        axios.get(`${process.env.API_URL}/api/product/${id}`, {
            withCredentials: true
        })
        .then(response => {
            console.log(response);
            setProduct(response.data);
        })
        .catch(err => {
            console.error(err);
        })
    }, [id]);

    return (
        <Layout>
            <Toaster position="top-center" reverseOrder={false} />
            <div>
                {product ? (
                    <EditProductForm product={product} />
                ) : (
                    <Loader />
                )}
            </div>
        </Layout>
    );
};

export default EditProduct;

