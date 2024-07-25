"use client";
import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { FaUser } from "react-icons/fa";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";
import Link from 'next/link';
import blogs from '../../public/data/blogdata'

const BlogSection = () => {
    const sliderRef = useRef<any>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const NextArrow = (props: any) => {
        const { onClick } = props;
        return (
            <button
                className="absolute top-1/2 hidden md:-right-8 lg:-right-10 xl:-right-12 transform -translate-y-1/2 bg-e_hub_gray h-20 w-10 rounded-lg md:flex items-center justify-center text-e_hub_white opacity-60 z-10"
                onClick={onClick}
                aria-label="Next"
            >
                <SlArrowRight size={24} />
            </button>
        );
    };

    const PrevArrow = (props: any) => {
        const { onClick } = props;
        return (
            <button
                className="absolute top-1/2 hidden md:-left-8 lg:-left-10 xl:-left-12 transform -translate-y-1/2 bg-e_hub_gray h-20 w-10 rounded-lg md:flex items-center justify-center text-e_hub_white opacity-60 z-10"
                onClick={onClick}
                aria-label="Previous"
            >
                <SlArrowLeft size={24} />
            </button>
        );
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <>
            {isClient && (
                <section className="pt-3 pt-md-5 relative">
                    <div className="container mx-auto">
                        <Slider {...settings} ref={sliderRef}>
                            {blogs.map((blog, index) => (
                                <div key={index} className="px-4 mb-8">
                                    <div className="bg-e_hub_white rounded-lg overflow-hidden shadow-lg h-[400px] flex flex-col">
                                        <div className="relative flex-shrink-0 h-3/5 overflow-hidden">
                                            <Image
                                                src={blog.imageUrl}
                                                alt={blog.title}
                                                layout="fill"
                                                objectFit="cover"
                                                className="w-full h-full"
                                            />
                                            <Link href={`/blog/${blog.link}`} className="absolute bottom-3 left-3 bg-e_hub_orange text-e_hub_white px-3 py-1 rounded">Read More</Link>
                                        </div>
                                        <div className="p-4 h-2/5 flex flex-col justify-between overflow-hidden">
                                            <h3 className="text-xl font-semibold mb-2 truncate">
                                                <Link href={`/blog/${blog.link}`} className="text-e_hub_black hover:text-e_hub_orange">{blog.title}</Link>
                                            </h3>
                                            <p className="text-e_hub_light_gray mb-4 truncate">{blog.description}</p>
                                            <div className="flex items-center justify-between text-sm text-e_hub_light_gray">
                                                <div className="flex items-center">
                                                    <FaUser />
                                                    <span className="ml-2">{blog.author}</span>
                                                </div>
                                                <span>{blog.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </section>
            )}
        </>
    );
};

export default BlogSection;
