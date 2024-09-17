"use client"
import Image from 'next/image';
import React from 'react';

const CartModal = () => {

  const cartItems = true;

  return (
    <div className='w-max absolute p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.4)] bg-e_hub_gray top-12 right-0 flex flex-col overflow-scroll'>
      {
        !cartItems ? (
          <div className=''>Cart is Empty</div>
        ) : (
          <div className='flex flex-col gap-4'>
          <h2 className='text-xl'>Shopping Cart</h2>
          {/* list */}
            <div className=" flex flex-col gap-8">
              {/* item */}
              <div className='flex gap-4'>
                <Image
                  src="https://i.ibb.co/jTMbP5r/nextamazon1.jpg"
                  alt=''
                  width={50}
                  height={90}
                  className='object-cover rounded-md'
                />
                <div className="flex flex-col justify-between w-full">
                  {/* top */}
                  <div className="">
                    {/* title */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className='font-semibold'>Product Name</h3>
                      <div className="p-1 bg-e_hub_orange rounded-sm text-e_hub_white font-bold">₹99</div>
                    </div>
                    {/* desc */}
                    <div className="text-sm text-gray-300">available</div>
                  </div>
                  {/* bottom */}
                  <div className="flex justify-between text-sm">
                    <span className='text-gray-300'>Qty. 2</span>
                    <span className='text-e_hub_white cursor-pointer'>Remove</span>
                  </div>
                </div>
              </div>
              {/* item */}
              <div className='flex gap-4'>
                <Image
                  src="https://i.ibb.co/jTMbP5r/nextamazon1.jpg"
                  alt=''
                  width={50}
                  height={90}
                  className='object-cover rounded-md'
                />
                <div className="flex flex-col justify-between w-full">
                  {/* top */}
                  <div className="">
                    {/* title */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className='font-semibold'>Product Name</h3>
                      <div className="p-1 bg-e_hub_orange rounded-sm text-e_hub_white font-bold">₹99</div>
                    </div>
                    {/* desc */}
                    <div className="text-sm text-gray-300">available</div>
                  </div>
                  {/* bottom */}
                  <div className="flex justify-between text-sm">
                    <span className='text-gray-300'>Qty. 2</span>
                    <span className='text-e_hub_white cursor-pointer'>Remove</span>
                  </div>
                </div>
              </div>
              {/* item */}
              <div className='flex gap-4'>
                <Image
                  src="https://i.ibb.co/jTMbP5r/nextamazon1.jpg"
                  alt=''
                  width={50}
                  height={90}
                  className='object-cover rounded-md'
                />
                <div className="flex flex-col justify-between w-full">
                  {/* top */}
                  <div className="">
                    {/* title */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className='font-semibold'>Product Name</h3>
                      <div className="p-1 bg-e_hub_orange rounded-sm text-e_hub_white font-bold">₹99</div>
                    </div>
                    {/* desc */}
                    <div className="text-sm text-gray-300">available</div>
                  </div>
                  {/* bottom */}
                  <div className="flex justify-between text-sm">
                    <span className='text-gray-300'>Qty. 2</span>
                    <span className='text-e_hub_white cursor-pointer'>Remove</span>
                  </div>
                </div>
              </div>
              {/* item */}
              <div className='flex gap-4'>
                <Image
                  src="https://i.ibb.co/jTMbP5r/nextamazon1.jpg"
                  alt=''
                  width={50}
                  height={90}
                  className='object-cover rounded-md'
                />
                <div className="flex flex-col justify-between w-full">
                  {/* top */}
                  <div className="">
                    {/* title */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className='font-semibold'>Product Name</h3>
                      <div className="p-1 bg-e_hub_orange rounded-sm text-e_hub_white font-bold">₹99</div>
                    </div>
                    {/* desc */}
                    <div className="text-sm text-gray-300">available</div>
                  </div>
                  {/* bottom */}
                  <div className="flex justify-between text-sm">
                    <span className='text-gray-300'>Qty. 2</span>
                    <span className='text-e_hub_white cursor-pointer'>Remove</span>
                  </div>
                </div>
              </div>
            </div>
            {/* bottom */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between font-semibold mt-3">
                <span>Subtotal</span>
                <span>₹99</span>
              </div>
              <p className='text-gray-300'>Shipping and taxes calculated at checkout.</p>
              <div className="flex justify-between text-sm">
                <button className='rounded-md py-3 px-4 ring-1 ring-e_hub_orange font-bold'>View Cart</button>
                <button className='rounded-md py-3 px-4 bg-e_hub_orange text-e_hub_white font-bold'>Checkout</button>
              </div>
            </div>
          </div>)
      }
    </div>
  )
}

export default CartModal