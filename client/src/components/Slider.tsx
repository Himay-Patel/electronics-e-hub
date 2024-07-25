"use client"
import React from 'react'
import banner1 from '../../public/products/banner-1.png';
import banner2 from '../../public/products/banner-2.png';
import banner3 from '../../public/products/banner-3.png';
import banner4 from '../../public/products/banner-4.png';
import Slider from 'react-slick';
import { PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi"
import Image from 'next/image';
import SlidetText from './SlidetText';

const Slider_Products = () => {
    const description1 = "New Range Of<br />Samsung Camera";
    const description2 = "Future of health  is<br />on your wrist";
    const description3 = "MacBook with retina<br />display";
    const description4 = "Samsung Galaxy<br />Gear S3";
    
    const NextArrow = (props: any) => {
        const { onClick } = props
        return (
            <div className='hidden py-10 px-3 bg-e_hub_gray text-e_hub_white cursor-pointer duration-200 rounded-md text-xs md:text-2xl md:flex items-center justify-center z-20 absolute right-1 top-[35%] xl:top-[40%] opacity-50  hover:opacity-100' onClick={onClick}>
                <PiCaretRightLight/>
            </div>
        )
    }

    const PrevArrow = (props: any) => {
        const { onClick } = props
        return (
            <div className='hidden  py-10 px-3 bg-e_hub_gray text-e_hub_white cursor-pointer duration-200 rounded-md text-xs md:text-2xl md:flex items-center justify-center z-20 absolute left-1 top-[35%] xl:top-[40%] opacity-50 hover:opacity-100' onClick={onClick}>
                <PiCaretLeftLight />
            </div>
        )
    }

    var settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
        <div className='relative p-10 '>
            <Slider {...settings}>
                <div className='w-full h-full relative'>
                    <Image src={banner1} alt='banner1' className='w-full h-full relative' />
                    <SlidetText title="Samsung EOS600D/Kiss X5" description={description1} />
                </div>
                <div className='w-full h-full relative'>
                    <Image src={banner2} alt='banner2' className='w-full h-full relative' />
                    <SlidetText title="Apple Watch Series 7" description={description2} />
                </div>
                <div className='w-full h-full relative'>
                    <Image src={banner3} alt='banner2' className='w-full h-full relative' />
                    <SlidetText title="All new 13-inch & 15-inch" description={description3} />
                </div>
                <div className='w-full h-full relative'>
                    <Image src={banner4} alt='banner2' className='w-full h-full relative' />
                    <SlidetText title="Cyber Monday Mega Sale" description={description4} />
                </div>
            </Slider>
        </div>
    )
}

export default Slider_Products