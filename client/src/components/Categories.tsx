"use client";
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';

// Sample data for images and corresponding text (replace with your actual data)
const categories = [
    { imageUrl: '/categories_img/1.png', text: 'Mobile Phones', link: '/list?cat=test' },
    { imageUrl: '/categories_img/2.png', text: 'Watches', link: '/list?cat=test' },
    { imageUrl: '/categories_img/3.png', text: 'Headphones', link: '/list?cat=test' },
    { imageUrl: '/categories_img/4.png', text: 'Laptops', link: '/list?cat=test' },
    { imageUrl: '/categories_img/5.png', text: 'Cameras', link: '/list?cat=test' },
    { imageUrl: '/categories_img/6.png', text: 'Air Conditioners', link: '/list?cat=test' },
    { imageUrl: '/categories_img/7.png', text: 'Refrigerators', link: '/list?cat=test' },
];

// Custom Arrow Components
const NextArrow = (props: any) => {
    const { onClick } = props;
    return (
        <div
            className="absolute top-0 transform -translate-y-1/2 right-4 text-e_hub_black p-2 rounded-full cursor-pointer"
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 4l8 8-8 8" />
            </svg>
        </div>
    );
};

const PrevArrow = (props: any) => {
    const { onClick } = props;
    return (
        <div
            className="absolute top-0 transform -translate-y-1/2 left-4 text-e_hub_black p-2 rounded-full cursor-pointer"
            onClick={onClick}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 4l-8 8 8 8" />
            </svg>
        </div>
    );
};

const Categories = () => {
    var settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 3.5,
                    slidesToScroll: 3.5,
                    initialSlide: 3.5,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
        ],
    };

    return (
        <div className="relative w-full">
            <Slider {...settings}>
                {categories.map((category, index) => (
                    <div key={index} className="flex justify-center p-2">
                        <Link href={category.link}>
                            <div className="relative rounded-full overflow-hidden border border-e_hub_black w-40 h-40 flex flex-col items-center justify-center">
                                <img src={category.imageUrl} alt={category.text} className="w-1/2 h-1/2 object-cover" />
                                <h3 className="m-3 text-xs font-bold">{category.text}</h3>
                                {/* <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-center opacity-0 hover:opacity-100 transition-opacity">
                                    <h3 className="text-lg font-bold">{category.text}</h3>
                                </div> */}
                            </div>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Categories;
