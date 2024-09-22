// app/components/ProductImages.tsx
"use client";
import Image from 'next/image';
import React, { useState } from 'react';

interface ProductImagesProps {
    images: string[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
    const [index, setIndex] = useState(0);

    return (
        <div className="">
            <div className="h-[550px] relative ring-1 ring-e_hub_gray rounded-sm overflow-hidden group">
                <Image
                    src={images[index]}
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
                        key={i}
                        onClick={() => setIndex(i)}
                    >
                        <Image
                            src={img}
                            alt='Image'
                            fill
                            sizes='30vw'
                            className='object-cover rounded-md transition-transform duration-300 ease-in-out transform hover:scale-110'
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductImages;
