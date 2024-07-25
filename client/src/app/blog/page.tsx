"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaUser } from "react-icons/fa";
import Link from 'next/link';
import blogs from '../../../public/data/blogdata';

const BlogSection = () => {
    const [isClient, setIsClient] = useState(false);
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleFilter = (type: string | null) => {
        if (type === null) {
            setFilteredBlogs(blogs);
        } else {
            setFilteredBlogs(blogs.filter(blog => blog.type === type));
        }
    };

    return (
        <>
            {isClient && (
                <section className="pt-3 pt-md-5 relative">
                    <p className='text-center text-4xl font-medium'>Blogs</p>
                    <div className="container mx-auto flex flex-col mt-10 md:flex-row">
                        <div className="md:w-3/4 w-full">
                            <div className="flex flex-wrap -mx-4">
                                {filteredBlogs.map((blog) => (
                                    <div key={blog.link} className="px-4 mb-8 w-full md:w-1/2">
                                        <div className="bg-e_hub_white rounded-lg overflow-hidden shadow-lg h-[400px] flex flex-col">
                                            <div className="relative flex-shrink-0 h-3/5 overflow-hidden">
                                                <Image
                                                    src={blog.imageUrl}
                                                    alt={blog.title}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="w-full h-full"
                                                />
                                                <Link href={`/blog/${blog.link}`} className="absolute bottom-3 left-3 bg-e_hub_orange text-white px-3 py-1 rounded">Read More</Link>
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
                            </div>
                        </div>
                        <aside className="md:w-1/4 w-full mt-8 md:mt-0 md:pl-8">
                            <div className="bg-white text-black p-4 rounded-lg shadow-md">
                                <h2 className="text-lg font-semibold mb-4">LINK LISTS</h2>
                                <div className='flex flex-col gap-3 items-start'>
                                    <button onClick={() => handleFilter(null)} className='text-blue-600'>All Blogs</button>
                                    <button onClick={() => handleFilter('general')} className='text-blue-600'>General</button>
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
            )}
        </>
    );
};

export default BlogSection;
