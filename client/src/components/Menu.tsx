"use client"

import { useEffect, useState } from "react";
import menu_icon from "../../public/menu.png"
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import axios from "axios";
import { setUser } from "@/lib/redux/features/userSlice";
import { initiate } from "@/lib/redux/features/cartSlice";


const Menu = () => {

    const [open, setOpen] = useState(false);

    const user = useAppSelector(state => state.user);
    const cart = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     sessionStorage.setItem('cart', JSON.stringify(cart));
    // }, [cart]);

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

    const handleLinkClick = () => {
        setOpen(false);
    };

    return (
        <div>
            <Image src={menu_icon} alt='menu_icon' width={25} height={25} className='cursor-pointer' onClick={() => setOpen((prev) => !prev)} />
            {
                open && (
                    <div className='absolute w-full h-[calc(100vh-80px)] bg-e_hub_gray text-e_hub_white left-0 top-20 flex flex-col justify-center items-center gap-10 text-xl z-10 font-semibold'>
                        <Link href="/" onClick={handleLinkClick}>Home</Link>
                        <Link href="/list" onClick={handleLinkClick}>Shop</Link>
                        <Link href="#search" onClick={handleLinkClick}>Search</Link>
                        <Link href="/about" onClick={handleLinkClick}>About</Link>
                        <Link href="/contact" onClick={handleLinkClick}>Contact</Link>
                        <Link href="/profile" onClick={handleLinkClick}>{user._id && user.email && user.username ? user.username : "Profile"}</Link>
                        <Link href="/cart" onClick={handleLinkClick}>Cart</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </div>
                )
            }
        </div>
    )
}

export default Menu