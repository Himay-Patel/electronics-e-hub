"use client"
import React, { useState } from 'react'

const Add = () => {
  const [quantity, setQuantity] = useState(1)

  // tmp
  const stock = 3

  const handleQuantity = (type: "decrease" | "increase") => {
    if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }

    if (type === "increase" && quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  }

  return (
    <div className='flex flex-col gap-4'>
      <h4 className='font-medium'>Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-e_hub_orange py-2 px-4 text-e_hub_white rounded-3xl flex items-center justify-between w-32">
            <button className='cursor-pointer text-xl' onClick={() => handleQuantity("decrease")}>-</button>
            {quantity}
            <button className='cursor-pointer text-xl' onClick={() => handleQuantity("increase")}>+</button>
          </div>
          <div className="text-xs">Only <span className='text-e_hub_orange'>3 items</span> left!<br /> {"Don't"}{" "} miss it</div>
        </div>
        <button className='w-36 text-sm font-bold rounded-md ring-2 ring-e_hub_orange text-e_hub_orange hover:bg-e_hub_orange hover:text-e_hub_white py-2 px-4 disabled:cursor-not-allowed disabled:bg-red-200 disabled:text-e_hub_black disabled:ring-none '>Add to Cart</button>
      </div>
    </div>
  )
}

export default Add