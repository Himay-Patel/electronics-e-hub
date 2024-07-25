"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import blogs from '../../../../public/data/blogdata';
import { FaUser } from "react-icons/fa";
import { CiCalendarDate } from "react-icons/ci";
import { IoBookmarksOutline } from "react-icons/io5";

const BlogDetail = () => {
    const { link } = useParams();
    const blogLink = typeof link === 'string' ? link : '';
    const blog = blogs.find((b) => b.link === blogLink);

    if (!blog) {
        return <p>Blog not found</p>;
    }

    return (
        <section className="blog-section py-3 py-md-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
            <div className="container mx-auto">
                <div className="row justify-content-center">
                    <div className="col-xxl-9 col-md-8 mt-0">
                        <div className="blog-detail-image">
                            <div className="blog-image-contain pb-4">
                                <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
                                <div className="flex items-center flex-wrap mb-4 gap-8">
                                    <div className="flex items-center">
                                        <FaUser />
                                        <span className="ms-2 text-capitalize">{blog.author}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <CiCalendarDate />
                                        <span className="ms-2">{blog.date}</span>
                                    </div>
                                    {blog.type === 'general' && (
                                        <div className="flex items-center">
                                            <IoBookmarksOutline />
                                            <span className="ms-2 text-capitalize" role="button">General</span>
                                        </div>
                                    )}
                                </div>
                                <div className="relative">
                                    <Image
                                        src={blog.imageUrl}
                                        alt={blog.title}
                                        layout="responsive"
                                        width={800}
                                        height={460}
                                        objectFit="cover"
                                        className="img-fluid w-100"
                                    />
                                </div>
                            </div>
                            <div className="mt-3">
                                <p className="text-lg leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.fullContent }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BlogDetail;
