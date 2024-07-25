import React from 'react';
import banner from "../../public/products/banner.jpg";
import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <div className="container mx-auto">
            <div className="flex flex-wrap">
                <div className="w-full relative">
                    <div className="w-full">
                        <Image
                            loading="lazy"
                            alt="Up To 25% Discount Check it Out"
                            src={banner}
                            className="w-full h-auto rounded-md"
                        />
                    </div>
                    <div className="col-8 col-md-5 absolute top-1/2 start-0 transform -translate-y-1/2 ps-2 ps-md-4 ms-lg-5">
                        <h3 className="text-e_hub_banner_text mb-2 md:mb-5 xl:mb-10 text-sm md:text-xl lg:text-2xl">New Offers</h3>
                        <h2 className="text-e_hub_banner_text font-bold mb-3 md:mb-5 xl:mb-12 text-sm md:text-xl lg:text-3xl xl:text-5xl leading-normal">{`Up To 25% Discount Check it Out`}</h2>
                        <Link href="/" className="m-10 p-0 px-3 md:px-4 lg:p-2 ring-2 ring-e_hub_banner_text text-sm md:text-xl rounded-sm text-e_hub_white hover:bg-e_hub_gray">Shop Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
