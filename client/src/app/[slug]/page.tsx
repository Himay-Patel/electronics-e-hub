import Add from '@/components/Add'
import CustomizeProducts from '@/components/CustomizeProducts'
import ProductImages from '@/components/ProductImages'
import Link from 'next/link'
import React from 'react'
import related_products from "../../../public/data/relatedData"
import Image from 'next/image'

const SinglePage = () => {
  return (
    <>
      <div className='mt-3 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16'>
        {/* img */}
        <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
          <ProductImages />
        </div>
        {/* text */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6">
          <h1 className='text-4xl font-medium'>Product Name</h1>
          <p className='text-e_hub_gray'>Experience the future of smartphone technology with the Apple iPhone 14 Plus in stunning blue. Boasting 128 GB of storage, this sleek and powerful device offers ample space for all your apps, photos, and files. The iPhone 14 Plus features a vibrant Super Retina XDR display, delivering unparalleled clarity and color accuracy. </p>
          <div className="h-[2px] bg-gray-100" />
          <div className="flex items-center gap-4">
            <h3 className='text-xl text-e_hub_banner_text line-through'>₹99</h3>
            <h2 className='font-semibold text-2xl text-e_hub_gray'>₹80</h2>
          </div>
          <div className="h-[2px] bg-gray-100" />
          <CustomizeProducts />
          <Add />
          {/* <div className="h-[2px] bg-gray-100" />
        <div className="text-sm">
          <h4 className='font-medium mb-4'>Title</h4>
          <p>Experience the future of smartphone technology with the Apple iPhone 14 Plus in stunning blue. Boasting 128 GB of storage, this sleek and powerful device offers ample space for all your apps, photos, and files. The iPhone 14 Plus features a vibrant Super Retina XDR display, delivering unparalleled clarity and color accuracy.</p>
        </div>
        <div className="text-sm">
          <h4 className='font-medium mb-4'>Title</h4>
          <p>Experience the future of smartphone technology with the Apple iPhone 14 Plus in stunning blue. Boasting 128 GB of storage, this sleek and powerful device offers ample space for all your apps, photos, and files. The iPhone 14 Plus features a vibrant Super Retina XDR display, delivering unparalleled clarity and color accuracy.</p>
        </div>
        <div className="text-sm">
          <h4 className='font-medium mb-4'>Title</h4>
          <p>Experience the future of smartphone technology with the Apple iPhone 14 Plus in stunning blue. Boasting 128 GB of storage, this sleek and powerful device offers ample space for all your apps, photos, and files. The iPhone 14 Plus features a vibrant Super Retina XDR display, delivering unparalleled clarity and color accuracy.</p>
        </div> */}
        </div>
      </div>
      <div className="mt-20 px-4 md:px-8 lg:px-16 xl:px-32 relative">
        <p className='text-center font-medium text-4xl'>Related Products</p>
        <div className='mt-12 overflow-x-auto items-center justify-center'>
          <div className='flex gap-x-14 gap-y-16 justify-between flex-nowrap sm:flex-wrap p-3'>
            {related_products.map((product) => (
              <Link
                key={product.id}
                href="/test"
                className='w-full flex flex-col gap-4 sm:w-[45%] lg:w-[20%] min-w-[80%] sm:min-w-0'
              >
                <div className="relative w-full h-80">
                  <Image
                    src={product.imgSrc1}
                    alt={product.name}
                    fill
                    sizes='100vw'
                    className='absolute rounded-md object-cover z-10 hover:opacity-0 transition-opacity duration-500'
                  />
                  <Image
                    src={product.imgSrc2}
                    alt={product.name}
                    fill
                    sizes='100vw'
                    className='absolute rounded-md object-cover'
                  />
                </div>
                <div className="flex justify-between">
                  <span className='font-medium'>{product.name}</span>
                  <span className='font-semibold'>₹{product.price}</span>
                </div>
                <div className="text-sm text-e_hub_gray">{product.description}</div>
                <button className='rounded-md ring-2 ring-e_hub_orange text-e_hub_orange w-max py-2 px-4 text-sm font-bold hover:bg-e_hub_orange hover:text-e_hub_white'>
                  Add to cart
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SinglePage