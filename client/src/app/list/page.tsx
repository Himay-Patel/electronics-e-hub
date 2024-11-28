"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import img1 from '../../../public/products/samrtwatch.png';
import backgroundImg from '../../../public/img-1.png';
import Filter from '@/components/Filter';
import AllProducts from '@/components/AllProducts';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAppDispatch } from '@/lib/redux/hooks';
import { increaseQuantityOrAdd } from '@/lib/redux/features/cartSlice';
import axios from 'axios';

interface Product {
  _id: string
  name: string
  price: Number
  description: string
  category: {
      _id: string,
      name: string
  }
  images: string[]
  company: string
  color: string
}

const Listpage = () => {
  const searchParam = useSearchParams();
  const name = searchParam.get("name");

  const dispatch = useAppDispatch();

  const [products, setProducts] = useState<Product[]>([]);
  
  useEffect(() => {
    // console.log(name);
    axios.get(`${process.env.API_URL}/api/product/search/${name}`)
    .then((response) => {
      setProducts(response.data);
    }).catch((err) => {
      console.log(err);
    });
  }, [name]);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      <div
        className="hidden mt-3 rounded-md bg-e_hub_gray px-4 sm:flex justify-between sm:h-72 xl:h-96 bg-cover bg-center opacity-80"
        style={{ backgroundImage: `url(${backgroundImg.src})` }}>
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className='sm:text-2xl xl:text-4xl font-semibold leading-[48px] text-e_hub_white'>Grab up to 50% off on <br />selected products</h1>
          <button className='rounded-md bg-e_hub_orange text-e_hub_white w-max sm:py-1 sm:px-3 xl:py-3 xl:px-5 text-sm'>Buy Now</button>
        </div>
        <div className="relative w-1/3">
          <Image src={img1} alt="Product" fill className="object-contain" />
        </div>
      </div>
      {/* filter */}
      {/* <Filter /> */}
      {/* products */}
      <h1 className='mt-12 text-xl'>Search result for <b>{name}</b></h1>
      <div className='mt-12 overflow-x-auto items-center justify-center'>
        <div className='flex gap-x-14 gap-y-16 justify-between flex-nowrap sm:flex-wrap p-3'>
          {products.map((product) => (
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
                  priority={true}
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
                dispatch(increaseQuantityOrAdd({
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
  );
};

export default Listpage;
