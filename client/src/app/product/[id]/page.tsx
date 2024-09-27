"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductImages from '@/components/ProductImages';
import Add from '@/components/Add';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import Link from 'next/link';
import Image from 'next/image';
import { increaseQuantityOrAdd } from '@/lib/redux/features/cartSlice';
import { setTrendingProducts } from '@/lib/redux/features/trendingproductSlice';
import Widgets from '@/components/Widgets';

interface UniqueColorProducts {
    _id: string,
    color: string
}

const ProductDetails = ({ params }: { params: { id: string } }) => {
    const dispatch = useAppDispatch();
    const { id } = params;
    const [product, setProduct] = useState<any>(null);
    const [differentColorProduct, setDifferentColorProduct] = useState<UniqueColorProducts[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const dispath = useAppDispatch();
    const cart = useAppSelector(state => state.cart);
    const user = useAppSelector(state => state.user);
    const relatedProducts = useAppSelector(state => state.trendinproducts.trendingproducts);

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cart));
        let timer = setTimeout(() => {
            if (user._id) {
                axios.post(process.env.API_URL + '/api/cart/modify', {
                    cartId: user.cartId,
                    cartItems: cart.items,
                    cartTotal: cart.total
                }, {
                    withCredentials: true
                })
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }, 1200);
        return () => {
            clearTimeout(timer);
        }
    }, [cart]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`${process.env.API_URL}/api/product/${id}`);
                const colorResponse = await axios.get(process.env.API_URL + "/api/product/colors/" + response.data.name);
                const relatedProducts = await axios.get(process.env.API_URL + "/api/product/trending");
                dispatch(setTrendingProducts(relatedProducts.data));
                setProduct(response.data);
                setDifferentColorProduct(colorResponse.data);
            } catch (err) {
                setError("Product not found.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, []);

    if (loading) return <div className="text-center py-20">Loading...</div>;
    if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
    if (!product) return <div className="text-center py-20">Product not found</div>;

    return (
        <div className='flex flex-col gap-20'>
            <div className="mt-3 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
                {/* Left side - Product Images */}
                <div className="w-full mt-16 lg:w-1/2 lg:sticky top-20 h-max">
                    <ProductImages images={product.images} />
                </div>

                {/* Right side - Product Details */}
                <div className="w-full lg:w-1/2 mt-8 flex flex-col justify-center gap-6">
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
                    {/* color */}
                    <div className="p-4">
                        <h2 className="text-xl font-bold mb-4">Available Colors</h2>
                        <ul className="flex gap-4 flex-wrap">
                            {differentColorProduct.map(item => (
                                <li key={item._id} className="flex items-center gap-2">
                                    <Link href={`/product/${item._id}`} className={`ring-1 ring-e_hub_orange p-2 font-medium rounded-md ${product.color === item.color ? 'bg-e_hub_orange text-e_hub_white' : 'hover:bg-e_hub_orange hover:opacity-80 hover:text-e_hub_white'}`}>{item.color}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Add productId={product._id} />
                </div>
            </div>
            <div className="">
                <Widgets />
            </div>
            <div className="px-4 md:px-8 lg:px-16 xl:px-32 relative">
                <p className='text-center font-medium text-4xl underline'>Related Products</p>
                <div className='mt-12 overflow-x-auto items-center justify-center'>
                    <div className='flex gap-x-14 gap-y-16 justify-between flex-nowrap sm:flex-wrap p-3'>
                        {relatedProducts.map(product => (
                            <Link
                                key={product._id}
                                href={`/product/${product._id}`}
                                className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[20%] min-w-[80%] sm:min-w-0'
                            >
                                <div className="relative w-full h-80">
                                    <Image
                                        src={product.images[0]}
                                        alt={product.name}
                                        fill
                                        sizes='100vw'
                                        className='absolute rounded-md object-cover z-10 hover:opacity-0 transition-opacity duration-500'
                                    />
                                    <Image
                                        src={product.images[1]}
                                        alt={product.name}
                                        fill
                                        sizes='100vw'
                                        className='absolute rounded-md object-cover'
                                    />
                                </div>
                                <div className="flex justify-between">
                                    <span className='font-medium'>{product.name}</span>
                                    <span className='font-semibold'>₹{product.price.toString()}</span>
                                </div>
                                <div className="text-sm text-e_hub_gray">{product.description}</div>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    dispath(increaseQuantityOrAdd({
                                        _id: product._id,
                                        name: product.name,
                                        price: product.price as number,
                                        description: product.description,
                                        images: product.images,
                                        category: product.category,
                                        company: product.company,
                                        color: product.color,
                                        quantity: 1
                                    }));
                                }} className='rounded-md ring-2 ring-e_hub_orange text-e_hub_orange w-max py-2 px-4 text-sm font-bold hover:bg-e_hub_orange hover:text-e_hub_white'>
                                    Add to cart
                                </button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
