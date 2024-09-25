'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import mainImage from '../../public/images/cameraforTendingProduct.png';
// import products from '../../public/data/trendingproducts';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import axios from 'axios';
import { increaseQuantityOrAdd } from '@/lib/redux/features/cartSlice';

const TrendingProducts = () => {
  const dispath = useAppDispatch();
  const cart = useAppSelector(state => state.cart);
  const user = useAppSelector(state => state.user);
  const trendinproducts = useAppSelector(state => state.trendinproducts.trendingproducts.slice(0,5));

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

  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-5">
          <div className="w-full lg:w-1/2">
            <Image
              loading="lazy"
              alt="Main Product"
              src={mainImage}
              className="object-cover w-full h-full shadow rounded-md"
            />
          </div>
          <div className="w-full lg:w-1/2 overflow-x-auto justify-center items-center">
            <div className="flex gap-x-4 gap-y-16 flex-nowrap sm:flex-wrap m-2 justify-between items-center">
              {trendinproducts.map(product => (
                <Link key={product._id} href={`/product/${product._id}`} className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[45%] min-w-[80%] sm:min-w-0'>
                  <div className="relative w-full h-80">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes='100vw'
                      className='absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity duration-500'
                    />
                    <Image
                      src={product.images[1]}
                      alt={product.name}
                      fill
                      sizes='100vw'
                      className='absolute object-cover rounded-md'
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className='font-medium'>{product.name}</span>
                    <span className='font-semibold'>₹{product.price.toString()}</span>
                  </div>
                  <div className="text-sm text-e_hub_gray">{product.description}</div>
                  {/* <button className='rounded-md ring-2 ring-e_hub_orange text-e_hub_orange w-max py-2 px-4 text-sm font-bold hover:bg-e_hub_orange hover:text-e_hub_white'>Add to cart</button> */}
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
    </section>
  );
};

export default TrendingProducts;
