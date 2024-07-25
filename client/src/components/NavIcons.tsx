"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import profile_icon from "../../public/profile.png";
import cart_icon from "../../public/cart.png";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import CartModal from './CartModal';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import axios from 'axios';
import { setUser } from '@/lib/redux/features/userSlice';

const NavIcons = () => {

    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

    const router = useRouter();
    // temp
    const isLoggedIn = false;

    const handleProfile = () => {
        if (!isLoggedIn) {
            router.push("/login");
        }
        setIsProfileOpen((prev) => !prev);
    };

    const handleLogout = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.post(process.env.API_URL + "/api/user/logout", null, { withCredentials: true });
            console.log(response);
            localStorage.removeItem('user');
            dispatch(setUser({
                _id: null,
                email: null,
                username: null,
                imageUrl: null
            }));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='flex items-center gap-8 xl:gap-6 relative'>
            <Image src={profile_icon} alt='' width={45} height={45} className='cursor-pointer' onClick={handleProfile} />
            {
                isProfileOpen && (
                    <div className='absolute p-4 rounded-md top-12 right-14 gap-5 text-lg shadow-[0_3px_10px_rgb(0,0,0,0.4)] bg-e_hub_gray z-20 flex flex-col justify-between items-center'>
                        <Link href="#profile">{user._id && user.email && user.username ? user.username : "Profile"}</Link>
                        <Link href="#profile">My Orders</Link>
                        <Link href="#profile">cancellection</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )
            }
            <div className='relative cursor-pointer' onClick={() => setIsCartOpen((prev) => !prev)}>
                <Image src={cart_icon} alt='' width={40} height={40} />
                <div className='absolute -top-0 -right-1 w-6 h-6 bg-e_hub_orange rounded-full text-e_hub_white flex items-center justify-center font-bold'>0</div>
            </div>
            {isCartOpen && <CartModal />}
        </div>
    )
}

export default NavIcons