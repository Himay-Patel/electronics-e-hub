"use client"
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setFilter } from '@/lib/redux/features/filterSlice';

const CategoriesList = () => {
    const [isClient, setIsClient] = useState(false);
    const dispatch = useAppDispatch();
    const selectedCategory = useAppSelector(state => state.filter.value);
    const categories = useAppSelector(state => state.categories.categories);

    // const [selectedCategory, setSelectedCategory] = useState<string>("");

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSelectedCategory = (category: string) => {
        dispatch(setFilter(category));
    }

    // const categories = [
    //     { id: 1, imageUrl: '/categories_img/1.png', name: 'Phones', link: '/list?cat=test' },
    //     { id: 2, imageUrl: '/categories_img/2.png', name: 'Watches', link: '/list?cat=test' },
    //     { id: 3, imageUrl: '/categories_img/3.png', name: 'Headphones', link: '/list?cat=test' },
    //     { id: 4, imageUrl: '/categories_img/4.png', name: 'Laptops', link: '/list?cat=test' },
    //     { id: 5, imageUrl: '/categories_img/5.png', name: 'Cameras', link: '/list?cat=test' },
    //     { id: 6, imageUrl: '/categories_img/6.png', name: 'A/C', link: '/list?cat=test' },
    //     { id: 7, imageUrl: '/categories_img/7.png', name: 'Refrigerators', link: '/list?cat=test' },
    //     { id: 8, imageUrl: '/categories_img/8.png', name: 'Television', link: '/list?cat=test' },
    //     { id: 9, imageUrl: '/categories_img/9.png', name: 'H/T', link: '/list?cat=test' },
    // ];


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
                    {/* {categories.map((category) => (
                        <div key={category._id} className="px-1">
                            <div>
                                <div className={`ring-2 p-3 m-5 ring-black rounded-full flex flex-col justify-center items-center hover:cursor-pointer ${selectedCategory === category.name ? "bg-slate-400 hover:bg-slate-400" : "hover:bg-slate-200"}`} onClick={(e) => {handleSelectedCategory(category.name)}}>
                                    <img src={category.imageUrl} alt={category.name} className="w-16 h-16 object-cover" />
                                    <p className="text-center py-2">{category.name}</p>
                                </div>
                            </div>
                        </div>
                    ))} */}
                    {categories.map((category) => <div key={category._id} className="flex mt-5 flex-col items-center text-center min-w-[80px] md:min-w-[100px] lg:min-w-[120px]" onClick={() => { handleSelectedCategory(category.name) }}>
                                <div className={`p-3 rounded-full flex flex-col items-center gap-2`}>
                                    <img
                                        src={category.imageUrl}
                                        alt={category.name}
                                        className={`size-20 md:size-24 lg:size-26 xl:size-32 rounded-full cursor-pointer transition-transform transform hover:scale-105 ${selectedCategory === category.name ? "p-2 ring-2 ring-e_hub_black" : ""}`}
                                    />
                                    <p className="mt-2 text-sm md:text-base font-medium">{category.name}</p>
                                </div>
                            </div>
                        )}
                </Slider>
            )}
        </>
    );
};

export default CategoriesList;
