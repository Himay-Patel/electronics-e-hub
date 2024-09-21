"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import '../../tailwind.config'
import '../app/globals.css'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import axios from 'axios'
import { increaseQuantityOrAdd } from '@/lib/redux/features/cartSlice'

const Cards = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector(state => state.cart);
    const user = useAppSelector(state => state.user);
    const latestproducts = useAppSelector(state => state.latestproducts.latestproducts);

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
        <section className='flex justify-center items-center h-full bg-e_hub_white md:flex-col'>
            <div className="container flex flex-row-reverse justify-around items-center gap-2 relative my-0 mx-5 flex-wrap">
                {latestproducts.map((product) => (
                    <div key={product._id} className="card relative w-80 h-96 bg-e_hub_light_black rounded-2xl overflow-hidden before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-e_hub_gray my-3 sm:flex-shrink sm:px-3">
                        <div className="imgbox absolute top-2/4 -translate-y-1/2 z-50 w-full h-56 duration-500 bg-transparent">
                            <Image
                                src={product.images[0]}
                                alt={product.name}
                                className='img absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 w-36 object-contain mix-blend-color-burn'
                                width={150}
                                height={150}
                            />
                        </div>

                        <div className="contentbox flex flex-col items-center justify-center absolute bottom-0 w-full h-24 text-center duration-1000 z-10">
                            <h2 className='relative font-bold text-3xl letter tracking-wider text-e_hub_white capitalize'>{product.name}</h2>
                            <p className='text-e_hub_white font-semibold'>{product.description}</p>
                            <div className="price flex justify-center items-center py-2 px-5 duration-500 opacity-0 invisible">
                                <h3 className='text-e_hub_white font-bold text-sm uppercase tracking-wider mr-2'>price :</h3>
                                {Array.from(product.price.toString()).map((char, index) => (
                                    <span key={index} className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>{char}</span>
                                ))}
                            </div>
                            {/* <a href="#" className='inline-block py-2 px-5 bg-e_hub_white rounded-md mt-2 font-bold text-e_hub_black opacity-0 translate-y-12 duration-500'>Buy Now</a> */}
                            <a onClick={(e) => {
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
                            }} className='inline-block py-2 px-5 bg-e_hub_white hover:bg-e_hub_gray rounded-md mt-2 font-bold text-e_hub_black hover:text-e_hub_white opacity-0 translate-y-12 duration-500 cursor-pointer'>
                                Add to cart
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Cards