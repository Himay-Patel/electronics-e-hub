"use client";
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import products from '../../public/data/products2';

const ProductList2 = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Phones', 'Watches', 'Headphones', 'Laptops', 'Cameras', 'A/C', 'Refrigerators', 'Television', 'H/T'];

    const filteredProducts = selectedCategory === 'All'
        ? products
        : products.filter(product => product.category === selectedCategory);

    return (
        <div className='mt-12'>
            <div className='flex flex-wrap justify-center gap-2 mb-6'>
                {categories.map(category => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded ${selectedCategory === category ? 'bg-e_hub_orange text-white' : 'bg-e_hub_white ring-1 ring-e_hub_orange text-e_hub_orange'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className='overflow-x-auto items-center justify-center'>
                <div className='flex gap-x-14 gap-y-16 justify-between flex-nowrap sm:flex-wrap p-3'>
                    {filteredProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={`/products/${product.id}`}
                            className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[20%] min-w-[80%] sm:min-w-0'
                        >
                            <div className="relative w-full h-80">
                                <Image
                                    src={product.imgSrc1}
                                    alt={product.name}
                                    fill
                                    sizes='100vw'
                                    className='absolute rounded-md object-cover z-10 hover:opacity-0 transition-opacity duration-500'
                                />
                                <Image
                                    src={product.imgSrc2}
                                    alt={product.name}
                                    fill
                                    sizes='100vw'
                                    className='absolute rounded-md object-cover'
                                />
                            </div>
                            <div className="flex justify-between">
                                <span className='font-medium'>{product.name}</span>
                                <span className='font-semibold'>₹{product.price}</span>
                            </div>
                            <div className="text-sm text-e_hub_gray">{product.description}</div>
                            <button className='rounded-md ring-2 ring-e_hub_orange text-e_hub_orange w-max py-2 px-4 text-sm font-bold hover:bg-e_hub_orange hover:text-e_hub_white'>
                                sAdd to cart
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ProductList2;
