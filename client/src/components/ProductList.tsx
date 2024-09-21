'use client'
import { increaseQuantityOrAdd } from '@/lib/redux/features/cartSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
// import products from "../../public/data/products";

const ProductList = (props: any) => {
  const dispatch = useAppDispatch();
  const filterValue = useAppSelector(state => state.filter.value);
  const cart = useAppSelector(state => state.cart);
  const user = useAppSelector(state => state.user);
  // const products = useAppSelector(state => state.products.products.slice(0,40))!.filter(product => {
  //     return filterValue.length > 0 ? product.category.name.toLowerCase() === filterValue.toLowerCase() : product;
  // });
  let products = useAppSelector(state => state.products.products).filter(product => {
    return filterValue.length > 0 ? product.category.name.toLowerCase() === filterValue.toLowerCase() : product;
  });


  if (props.all !== 'true') {
    products = products.slice(0, 40);
  }

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
  )
}

export default ProductList
