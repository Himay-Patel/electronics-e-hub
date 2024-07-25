import React from 'react';

const TrendingProductsSection = () => {
    const products = [
        {
            title: 'Smart Phone',
            imageSrc: '/images/image1.png',
            description: 'Capture your reality.',
            discount: '',
        },
        {
            title: 'Ultra Watch',
            imageSrc: '/images/image2.png',
            description: 'Get upto 25% off.',
            discount: '25% OFF',
        },
        {
            title: 'Wireless Headset',
            imageSrc: '/images/image3.png',
            description: 'Get upto 10% off.',
            discount: '10% OFF',
        },
        {
            title: 'Earpads',
            imageSrc: '/images/image4.png',
            description: 'Get Up to 70% Off.',
            discount: '70% OFF',
        },
        {
            title: 'Modern Air Purifier',
            imageSrc: '/images/image5.png',
            description: 'Best quality of this product.',
            discount: '',
            doubleWidth: true, // Add a flag to indicate double width
        },
    ];

    return (
        <section className="pt-3 pt-md-5 mt-3">
            <div className="container overflow-x-auto">
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-5 flex-nowrap md:flex-wrap">
                    {products.map((product, index) => (
                        <div
                            key={index}
                            className={`relative overflow-hidden rounded-md shadow-md min-w-[100%] sm:min-w-[70%] md:min-w-0 ${product.doubleWidth ? 'md:col-span-2' : ''}`}
                        >
                            <img
                                loading="lazy"
                                alt={product.title}
                                src={product.imageSrc}
                                className="object-cover w-full h-64 md:h-80"
                            />
                            <div className="absolute top-0 left-0 p-2">
                                {product.discount && (
                                    <span className="inline-block bg-e_hub_light_black px-2 py-1 rounded-lg">
                                        <span className="text-white font-bold">{product.discount}</span>
                                    </span>
                                )}
                            </div>
                            <div className="absolute inset-0 bg-e_hub_light_black bg-opacity-50 flex items-center justify-center">
                                <div className="flex flex-col justify-start items-start text-e_hub_white p-4">
                                    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                                    <p className="text-sm">{product.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProductsSection;
