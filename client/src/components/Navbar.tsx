import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import Image from 'next/image'
import logo from '../../public/logo.png'
import SearchBar from './SearchBar'
import NavIcons from './NavIcons'

const Navbar = () => {
    return (
        // <div className='h-20 px-4 md:px-8 bg-e_hub_black text-e_hub_white relative'>
        <div className='h-20 px-4 sticky top-0 md:px-8 bg-e_hub_black text-e_hub_white z-[100]'>
            {/* mobile */}
            <div className="h-full flex items-center justify-between md:hidden">
                <Link href="/" className='font-bold text-2xl tracking-widest'>E-hub</Link>
                <Menu />
            </div>
            {/* bigger screens */}
            <div className="hidden md:flex items-center justify-between lg:gap-8 h-full">
                {/* left */}
                <div className="w-1/3 xl:w-1/2 flex items-center xl:gap-24 2xl:gap-48">
                    <Link href="/" className='flex items-center gap-1'>
                        <Image src={logo} alt='logo' height={50} width={50} className='rounded-full' />
                        <div className='font-bold text-2xl tracking-widest'>E-hub</div>
                    </Link>
                    <div className="hidden xl:flex gap-4 font-medium text-xl">
                        <Link href="/">Home</Link>
                        <Link href="/list">Shop</Link>
                        <Link href="/blog">Blogs</Link>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                    </div>
                </div>
                {/* right */}
                <div className="w-2/3 xl:w-1/2 flex items-center justify-between gap-8">
                    <SearchBar />
                    <NavIcons />
                </div>
            </div>
        </div>
    )
}

export default Navbar