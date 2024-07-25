import React from 'react'

const CustomizeProducts = () => {
  return (
    <div className='flex flex-col gap-6'>
      <h4 className='font-medium'>Choose a Color</h4>
      <ul className="flex items-center gap-3">
        <li className='w-8 h-8 rounded-full ring-1 ring-e_hub_black cursor-pointer relative bg-e_hub_blue'>
          <div className='absolute w-10 h-10 rounded-full ring-2 ring-e_hub_black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
        </li>
        <li className='w-8 h-8 rounded-full ring-1 ring-e_hub_black cursor-not-allowed relative bg-e_hub_white'>
          <div className='absolute w-10 h-[2px] bg-red-600 rotate-45  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2' />
        </li>
        <li className='w-8 h-8 rounded-full ring-1 ring-e_hub_black cursor-pointer relative bg-e_hub_light_black'></li>
        <li className='w-8 h-8 rounded-full ring-1 ring-e_hub_black cursor-pointer relative bg-red-600'></li>
      </ul>
    </div>
  )
}

export default CustomizeProducts