"use client"
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import Link from 'next/link';

const CategoriesList = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const categories = [
        { id: 1, imageUrl: '/categories_img/1.png', name: 'Phones', link: '/list?cat=test' },
        { id: 2, imageUrl: '/categories_img/2.png', name: 'Watches', link: '/list?cat=test' },
        { id: 3, imageUrl: '/categories_img/3.png', name: 'Headphones', link: '/list?cat=test' },
        { id: 4, imageUrl: '/categories_img/4.png', name: 'Laptops', link: '/list?cat=test' },
        { id: 5, imageUrl: '/categories_img/5.png', name: 'Cameras', link: '/list?cat=test' },
        { id: 6, imageUrl: '/categories_img/6.png', name: 'A/C', link: '/list?cat=test' },
        { id: 7, imageUrl: '/categories_img/7.png', name: 'Refrigerators', link: '/list?cat=test' },
        { id: 8, imageUrl: '/categories_img/8.png', name: 'Television', link: '/list?cat=test' },
        { id: 9, imageUrl: '/categories_img/9.png', name: 'H/T', link: '/list?cat=test' },
    ];

    // Define NextArrow component
    const NextArrow = (props: any) => {
        const { onClick } = props;
        return (
            <button
                className="absolute top-1/2 -right-3 md:-right-5 lg:-right-7 xl:-right-10 transform -translate-y-1/2 bg-transparent text-black"
                onClick={onClick}
            >
                <SlArrowRight />
            </button>
        );
    };

    // Define PrevArrow component
    const PrevArrow = (props: any) => {
        const { onClick } = props;
        return (
            <button
                className="absolute top-1/2 -left-3 md:-left-5 lg:-left-7 xl:-left-10 transform -translate-y-1/2 bg-transparent text-black"
                onClick={onClick}
            >
                <SlArrowLeft />
            </button>
        );
    };

    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5, // Default slides to show for desktop
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4 , // Adjust slides to show for desktop view
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4, // Adjust slides to show for desktop view
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3, // Adjust slides to show for tablet view
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2, // Adjust slides to show for mobile view
                },
            },
        ],
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <>
            {isClient && (
                <Slider {...settings}>
                    {categories.map((category) => (
                        <div key={category.id} className="px-1">
                            <Link href={category.link}>
                                <div className="ring-2 p-3 m-5 ring-black rounded-full flex flex-col justify-center items-center">
                                    <img src={category.imageUrl} alt={category.name} className="w-16 h-16 object-cover" />
                                    <p className="text-center py-2">{category.name}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </Slider>
            )}
        </>
    );
};

export default CategoriesList;
