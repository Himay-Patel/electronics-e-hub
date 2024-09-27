"use client";
import React, { useState } from 'react'

const Widgets: React.FC = () => {
    const [activeTab, setActiveTab] = useState('description');
    return (
        <div className="px-6 md:px-12 lg:px-24 xl:px-48">
            <div className="w-full h-3/4 mx-auto p-10 bg-e_hub_light_black text-e_hub_white rounded-lg shadow-md">
                <div className="flex border-b border-e_hub_gray mb-4">
                    <div
                        className={`descriptiobox-nav-box cursor-pointer p-2 text-center flex-1 transition-all duration-300 ${activeTab === 'description' ? 'text-e_hub_orange border-b-2 border-e_hub_orange' : 'text-e_hub_light_gray'}`}
                        onClick={() => setActiveTab('description')}>
                        Description
                    </div>
                    <div
                        className={`descriptiobox-nav-box cursor-pointer p-2 text-center flex-1 transition-all duration-300 ${activeTab === 'reviews' ? 'text-e_hub_orange border-b-2 border-e_hub_orange' : 'text-e_hub_light_gray'}`}
                        onClick={() => setActiveTab('reviews')}>
                        Reviews (122)
                    </div>
                </div>
                <div className="descriptiobox-content">
                    {activeTab === 'description' ? (
                        <div className="descriptiobox-description text-e_hub_light_gray">
                            <p>
                                An e-com store website is an online platform that facilitates the buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-com websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
                            </p>
                            <p className="mt-4">
                                E-com store websites typically display products or services along with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
                            </p>
                        </div>
                    ) : (
                        <div className="descriptiobox-reviews text-e_hub_light_gray">
                            <p className="text-center">
                                Reviews coming soon!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Widgets