"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import iphone1img from '../../public/products/phone/iphone14/img1.png';
import iphone2img from '../../public/products/phone/iphone14/img2.png';
import iphone3img from '../../public/products/phone/iphone14/img3.png';

const images = [
    {
        id: 1,
        url: iphone1img,
    },
    {
        id: 2,
        url: iphone2img,
    },
    {
        id: 3,
        url: iphone3img,
    },
]

const ProductImages = () => {
    const [index, setIndex] = useState(0)

    return (
        <div className=''>
            <div className="h-[550px] relative ring-1 ring-e_hub_gray rounded-sm overflow-hidden group">
                <Image
                    src={images[index].url}
                    alt='Product Image'
                    fill
                    sizes='50vw'
                    className='object-cover rounded-md transition-transform duration-300 ease-in-out transform group-hover:scale-110'
                />
            </div>
            <div className="flex justify-between gap-4 mt-8">
                {images.map((img, i) => (
                    <div
                        className="w-1/4 h-32 relative ring-1 ring-e_hub_gray rounded-sm cursor-pointer"
                        key={img.id}
                        onClick={() => setIndex(i)}
                    >
                        <Image
                            src={img.url}
                            alt='Thumbnail Image'
                            fill
                            sizes='30vw'
                            className='object-cover rounded-md transition-transform duration-300 ease-in-out transform hover:scale-110'
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductImages
