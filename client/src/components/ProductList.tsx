'use client'
import { useAppSelector } from '@/lib/redux/hooks'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
// import products from "../../public/data/products";

const ProductList = () => {
    const filterValue = useAppSelector(state => state.filter.value);
    const products = useAppSelector(state => state.products.products)!.filter(product => {
        return filterValue.length > 0 ? product.category.name.toLowerCase() === filterValue.toLowerCase() : product;
    });
    
    useEffect(() => {
        console.log(products);
    }, [products]);
    
    return (
        <div className='mt-12 overflow-x-auto items-center justify-center'>
            <div className='flex gap-x-14 gap-y-16 justify-between flex-nowrap sm:flex-wrap p-3'>
                {products.map((product) => (
                    <Link
                        key={product._id}
                        href="/test"
                        className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[20%] min-w-[80%] sm:min-w-0'
                    >
                        <div className="relative w-full h-80">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                fill
                                priority = {true}
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
                        <button className='rounded-md ring-2 ring-e_hub_orange text-e_hub_orange w-max py-2 px-4 text-sm font-bold hover:bg-e_hub_orange hover:text-e_hub_white'>
                            Add to cart
                        </button>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ProductList
