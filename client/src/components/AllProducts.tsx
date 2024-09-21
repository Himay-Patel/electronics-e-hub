"use client";
import React, { useEffect, useState } from 'react';
import ProductList from './ProductList';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setFilter } from '@/lib/redux/features/filterSlice';

const ProductList2 = () => {

    const [isClient, setIsClient] = useState(false);
    const dispatch = useAppDispatch();
    const selectedCategory = useAppSelector(state => state.filter.value);
    const categories = useAppSelector(state => state.categories.categories);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSelectedCategory = (category: string) => {
        dispatch(setFilter(category));
    }

    return (
        <>
            {isClient && (
                <div className='mt-12'>
                    <div className='flex flex-wrap justify-center gap-2 mb-6'>
                        {categories.map((category) =>
                            <button
                                key={category._id}
                                className="flex mt-5 flex-col items-center text-center min-w-[80px] md:min-w-[100px] lg:min-w-[120px]"
                                onClick={() => { handleSelectedCategory(category.name) }}
                            >
                                <p className={`text-sm md:text-base font-medium px-4 py-2 rounded ${selectedCategory === category.name ? 'bg-e_hub_orange text-white' : 'bg-e_hub_white ring-1 ring-e_hub_orange text-e_hub_orange'}`}>{category.name}</p>
                            </button>
                        )}
                    </div>
                    <ProductList />
                </div>
            )}
        </>

    );
}

export default ProductList2;
