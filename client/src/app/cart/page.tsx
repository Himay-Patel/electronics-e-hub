"use client"
import { increaseQuantityOrAdd, decreaseQuantityOrDelete, remove } from '@/lib/redux/features/cartSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect } from 'react'

const CartPage = () => {
    const user = useAppSelector(state => state.user);
    const [hydrated, setHydrated] = React.useState(false);
    const cart = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setHydrated(true);
    }, []);

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
        }, 1500);
        return () => {
            clearTimeout(timer);
        }
    }, [cart]);

    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    return (
        // <section className="py-24 relative">
        //     <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">

        //         <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">
        //             { cart.items.length > 0 ? "Shopping Cart" : "Your Cart is empty" }
        //         </h2>
        //         {
        //             cart.items.length > 0 && <>
        //                 <div className="hidden lg:grid grid-cols-2 py-6">
        //                     <div className="font-normal text-xl leading-8 text-gray-500">Product</div>
        //                     <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
        //                         <span className="w-full max-w-[200px] text-center">Price</span>
        //                         <span className="w-full max-w-[260px] text-center">Quantity</span>
        //                         <span className="w-full max-w-[200px] text-center">Total</span>
        //                     </p>
        //                 </div>
        //                 <div className='max-h-80 overflow-y-scroll'>
        //                     {
        //                         cart.items.map((item, index) => <div key={item._id} className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
        //                             <div
        //                                 className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
        //                                 <div className="img-box"><img src={item.images[0]} alt={item.name + " image"} className="size-[120px] md:size-[140px] xl:w-[140px] rounded-xl object-cover" /></div>
        //                                 <div className="pro-data w-full max-w-sm ">
        //                                     <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">{item.name}</h5>
        //                                     <p className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">{item.category.name}</p>
        //                                 </div>
        //                             </div>
        //                             <div
        //                                 className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
        //                                 <h6 className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
        //                                     &#x20b9; {item.price} <span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap">(Delivery
        //                                         Charge)</span></h6>
        //                                 <div className="flex items-center w-full mx-auto justify-center">
        //                                     <button className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50" onClick={(e) => {
        //                                         e.preventDefault();
        //                                         dispatch(decreaseQuantityOrDelete({
        //                                             _id: item._id,
        //                                             name: item.name,
        //                                             price: item.price as number,
        //                                             description: item.description,
        //                                             images: item.images,
        //                                             category: item.category,
        //                                             company: item.company,
        //                                             color: item.color,
        //                                             quantity: 1
        //                                         }));
        //                                     }}>
        //                                         <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
        //                                             xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
        //                                             fill="none">
        //                                             <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
        //                                             <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
        //                                                 strokeLinecap="round" />
        //                                             <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
        //                                                 strokeLinecap="round" />
        //                                         </svg>
        //                                     </button>
        //                                     <input type="text"
        //                                         className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
        //                                         value={item.quantity} readOnly />
        //                                     <button className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50" onClick={(e) => {
        //                                         e.preventDefault();
        //                                         dispatch(increaseQuantityOrAdd({
        //                                             _id: item._id,
        //                                             name: item.name,
        //                                             price: item.price as number,
        //                                             description: item.description,
        //                                             images: item.images,
        //                                             category: item.category,
        //                                             company: item.company,
        //                                             color: item.color,
        //                                             quantity: 1
        //                                         }));
        //                                     }}>
        //                                         <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
        //                                             xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
        //                                             fill="none">
        //                                             <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6"
        //                                                 strokeLinecap="round" />
        //                                             <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
        //                                                 strokeLinecap="round" />
        //                                             <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
        //                                                 strokeLinecap="round" />
        //                                         </svg>
        //                                     </button>
        //                                 </div>
        //                                 <h6 className="text-indigo-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
        //                                     &#x20b9; {item.price * item.quantity}
        //                                 </h6>
        //                             </div>
        //                         </div>)
        //                     }
        //                 </div>

        //                 <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto mt-2">
        //                     <div className="flex items-center justify-between w-full mb-6">
        //                         <p className="font-normal text-xl leading-8 text-gray-400">Sub Total</p>
        //                         <h6 className="font-semibold text-xl leading-8 text-gray-900">
        //                             &#x20b9; {cart.total}
        //                         </h6>
        //                     </div>
        //                     <div className="flex items-center justify-between w-full pb-6 border-b border-gray-200">
        //                         <p className="font-normal text-xl leading-8 text-gray-400">Delivery Charge</p>
        //                         <h6 className="font-semibold text-xl leading-8 text-gray-900">
        //                             &#x20b9; {cart.total * 0.01}
        //                         </h6>
        //                     </div>
        //                     <div className="flex items-center justify-between w-full py-6">
        //                         <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
        //                         <h6 className="font-manrope font-medium text-2xl leading-9 text-indigo-500">
        //                             &#x20b9; {cart.total + cart.total * 0.01}
        //                         </h6>
        //                     </div>
        //                 </div>
        //                 <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
        //                     <button
        //                         className="rounded-full w-full max-w-[280px] py-4 text-center justify-center items-center bg-e_hub_orange font-semibold text-lg text-white flex transition-all duration-500 hover:bg-indigo-700">Continue
        //                         to Payment
        //                         <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="23" height="22" viewBox="0 0 23 22"
        //                             fill="none">
        //                             <path d="M8.75324 5.49609L14.2535 10.9963L8.75 16.4998" stroke="white" strokeWidth="1.6"
        //                                 strokeLinecap="round" strokeLinejoin="round" />
        //                         </svg>
        //                     </button>
        //                 </div>
        //             </>
        //         }
        //     </div>
        // </section>
        <section className="bg-white py-8 antialiased md:py-16">
            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
                
                <h2 className={`text-xl font-semibold text-gray-900 sm:text-2xl ${cart.items.length === 0 ? "w-full flex justify-center" : ""}`}>{cart.items.length > 0 ? "Shopping Cart" : "Your Cart is empty"}</h2>
                {
                    cart.items.length > 0 && <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                    <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
                        <div className="space-y-6 max-h-80 overflow-y-auto">
                            {
                                cart.items.map((item) => <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6" key={item._id}>
                                    <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
                                        <a href="#" className="shrink-0 md:order-1">
                                            <img className="h-20 w-20" src={item.images[0]} alt="imac image" />
                                        </a>

                                        <label htmlFor="counter-input" className="sr-only">Choose quantity:</label>
                                        <div className="flex items-center justify-between md:order-3 md:justify-end">
                                            <div className="flex items-center">
                                                <button type="button" id="decrement-button" data-input-counter-decrement="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100" onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(decreaseQuantityOrDelete({
                                                        _id: item._id,
                                                        name: item.name,
                                                        price: item.price as number,
                                                        description: item.description,
                                                        images: item.images,
                                                        category: item.category,
                                                        company: item.company,
                                                        color: item.color,
                                                        quantity: 1
                                                    }));
                                                }}>
                                                    <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                                                    </svg>
                                                </button>
                                                <input type="text" id="counter-input" data-input-counter className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0" placeholder="" value={item.quantity}readOnly />
                                                <button type="button" id="increment-button" data-input-counter-increment="counter-input" className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100" onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(increaseQuantityOrAdd({
                                                        _id: item._id,
                                                        name: item.name,
                                                        price: item.price as number,
                                                        description: item.description,
                                                        images: item.images,
                                                        category: item.category,
                                                        company: item.company,
                                                        color: item.color,
                                                        quantity: 1
                                                    }));
                                                }}>
                                                    <svg className="h-2.5 w-2.5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                            <div className="text-end md:order-4 md:w-32">
                                                <p className="text-base font-bold text-gray-900">&#x20b9; {item.price}</p>
                                            </div>
                                        </div>

                                        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                                            <p className="text-base font-medium text-gray-900">{item.name}<br/>{item.description}</p>

                                            <div className="flex items-center gap-4">
                                                <button type="button" className="inline-flex items-center text-sm font-medium text-white bg-red-500 rounded-lg px-2.5 py-[5px]" onClick={(e) => {
                                                    e.preventDefault();
                                                    dispatch(remove(item));
                                                }}>
                                                    <svg className="me-1.5 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                                                    </svg>
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>)
                            }
                        </div>
                    </div>

                    <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
                        <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                            <p className="text-xl font-semibold text-gray-900">Order summary</p>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500">Original price</dt>
                                        <dd className="text-base font-medium text-gray-900">&#x20b9; {cart.total}</dd>
                                    </dl>

                                    <dl className="flex items-center justify-between gap-4">
                                        <dt className="text-base font-normal text-gray-500">Tax</dt>
                                        <dd className="text-base font-medium text-gray-900">&#x20b9; {cart.total * 0.01}</dd>
                                    </dl>
                                </div>

                                <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                    <dt className="text-base font-bold text-gray-900">Total</dt>
                                    <dd className="text-base font-bold text-gray-900">&#x20b9; {cart.total + cart.total * 0.01}</dd>
                                </dl>
                            </div>
                            <button className="flex w-full items-center justify-center rounded-lg bg-e_hub_orange px-5 py-2.5 text-sm font-medium text-white">Proceed to Checkout</button>
                        </div>
                    </div>
                </div>
                }
            </div>
        </section>
    )
}

export default CartPage