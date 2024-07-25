import Image from 'next/image';
import React from 'react';
import img1 from '../../../public/products/samrtwatch.png';
import backgroundImg from '../../../public/img-1.png'; // Import your background image
import Filter from '@/components/Filter';
import ProductList2 from '@/components/ProductList2';

const Listpage = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      <div
        className="hidden mt-3 bg-e_hub_gray px-4 sm:flex justify-between h-72 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImg.src})` }}>
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className='text-4xl font-semibold leading-[48px] text-e_hub_white'>Grab up to 50% off on <br />selected products</h1>
          <button className='rounded-md bg-e_hub_orange text-e_hub_white w-max py-3 px-5 text-sm'>Buy Now</button>
        </div>
        <div className="relative w-1/3">
          <Image src={img1} alt="Product" fill className="object-contain" />
        </div>
      </div>
      {/* filter */}
      {/* <Filter /> */}
      {/* products */}
      <h1 className='mt-12 text-xl font-semibold'>All Products For You!</h1>
      <ProductList2/>
    </div>
  );
};

export default Listpage;
