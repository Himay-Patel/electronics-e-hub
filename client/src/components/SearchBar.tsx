"use client"
import Image from 'next/image'
import React from 'react'
import search_icon from '../../public/search.png'
import { useRouter } from 'next/navigation'

const SearchBar = () => {
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;

        if (name) {
            router.push(`/list?name=${name}`);
        }
    };
    return (
        <form className='flex items-center justify-between gap-4 bg-e_hub_white text-e_hub_black p-2 rounded-md flex-1' onSubmit={handleSearch} >
            <input type="text" name='name' placeholder='Search Product...' className='bg-transparent text-base font-medium outline-none flex-1' />
            <button className='cursor-pointer'>
                <Image src={search_icon} alt='search_icon' width={20} height={20} />
            </button>
        </form>
    )
}

export default SearchBar