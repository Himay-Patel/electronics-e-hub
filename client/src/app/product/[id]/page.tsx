"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductImages from '@/components/ProductImages';
import CustomizeProducts from '@/components/CustomizeProducts';
import Add from '@/components/Add';

const ProductDetails = ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.API_URL}/api/product/${id}`);
                setProduct(response.data);
            } catch (err) {
                setError("Error fetching product details");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (error) return <div className="text-center py-20">{error}</div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className="mt-3 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
            {/* Left side - Product Images */}
            <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
                <ProductImages images={product.images} />
            </div>

            {/* Right side - Product Details */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6">
                <h1 className="text-4xl font-medium">{product.name}</h1>
                <p className="text-e_hub_gray">{product.description}</p>
                <div className="h-[2px] bg-gray-100" />
                <h2 className="text-xl font-semibold text-e_hub_orange mb-2">₹{product.price}</h2>
                <div className="h-[2px] bg-gray-100" />
                <div className="flex flex-col justify-center items-start gap-5">
                    <div className="flex gap-2 mb-4">
                        <span className="font-semibold">Company:</span>
                        <span>{product.company}</span>
                    </div>
                    <div className="flex gap-2 mb-4">
                        <span className="font-semibold">Color:</span>
                        <span>{product.color}</span>
                    </div>
                </div>
                <div className="h-[2px] bg-gray-100" />
                <CustomizeProducts />
                <Add productId={product._id} />
            </div>
        </div>
    );
};

export default ProductDetails;
