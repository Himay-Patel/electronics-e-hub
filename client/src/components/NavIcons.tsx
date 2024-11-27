"use client"
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import profile_icon from "../../public/profile.png";
import cart_icon from "../../public/cart.png";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CartModal from './CartModal';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import axios from 'axios';
import { setUser } from '@/lib/redux/features/userSlice';
import { initiate } from '@/lib/redux/features/cartSlice';

const NavIcons = () => {
    const [hydrated, setHydrated] = React.useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const profileDropdownRef = useRef<HTMLDivElement>(null);
    const totalItems = useAppSelector(state => state.cart.totalItems);
    const router = useRouter();

    const user = useAppSelector(state => state.user);
    const cart = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    const handleProfile = () => {
        setIsProfileOpen((prev) => !prev);
    };

    useEffect(() => {
        setHydrated(true);
    }, []);

    // useEffect(() => {
    //     sessionStorage.setItem('cart', JSON.stringify(cart));
    // }, [cart]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        if (isProfileOpen) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isProfileOpen]);

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.post(process.env.API_URL + "/api/user/logout", null, { withCredentials: true });
            localStorage.removeItem('user');
            dispatch(setUser({
                _id: null,
                email: null,
                username: null,
                imageUrl: null,
                cartId: null
            }));
            dispatch(initiate({
                items: [],
                total: 0,
                totalItems: 0
            }));
            sessionStorage.removeItem('cart');
        } catch (err) {
            console.log(err);
        }
    }

    if (!hydrated) {
        // Returns null on first render, so the client and server match
        return null;
    }

    return (
        <div className='flex items-center gap-8 xl:gap-6 relative'>
            <Image src={user.imageUrl ? user.imageUrl : profile_icon} alt='' width={45} height={45} className='cursor-pointer rounded-full' onClick={handleProfile} />
            {
                isProfileOpen && (
                    <div ref={profileDropdownRef} className='absolute w-48 p-4 rounded-md top-14 right-14 gap-5 text-lg shadow-[0_3px_10px_rgb(0,0,0,0.4)] bg-e_hub_gray z-20 flex flex-col justify-between items-center'>
                        <Link href={(user._id && user.email && user.username) ? '/profile' : '/login'}>{user._id && user.email && user.username ? user.username : "Login"}</Link>
                        { (user._id && user.email && user.username) && <Link href="/order">My Orders</Link>}
                        { (user._id && user.email && user.username) && <Link href="/cancelorder">Cancel Order</Link>}
                        {(user._id && user.email && user.username) && <button onClick={handleLogout}>Logout</button>}
                    </div>
                )
            }
            <div className='relative cursor-pointer' onClick={() => {router.push('/cart')}}>
                <Image src={cart_icon} alt='' width={40} height={40} />
                <div className='absolute -top-0 -right-1 w-6 h-6 bg-e_hub_orange rounded-full text-e_hub_white flex items-center justify-center font-bold'>{totalItems}</div>
                {/* {isCartOpen && <CartModal />} */}
            </div>
        </div>
    )
}

export default NavIcons