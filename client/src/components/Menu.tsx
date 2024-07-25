"use client"

import { useState } from "react";
import menu_icon from "../../public/menu.png"
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import axios from "axios";
import { setUser } from "@/lib/redux/features/userSlice";


const Menu = () => {

    const [open, setOpen] = useState(false);

    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();

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
        <div>
            <Image src={menu_icon} alt='menu_icon' width={25} height={25} className='cursor-pointer' onClick={() => setOpen((prev) => !prev)} />
            {
                open && (
                    <div className='absolute w-full h-[calc(100vh-80px)] bg-e_hub_gray text-e_hub_white left-0 top-20 flex flex-col justify-center items-center gap-10 text-xl z-10 font-semibold'>
                        <Link href="/">Home</Link>
                        <Link href="#shop">Shop</Link>
                        <Link href="#search">Search</Link>
                        <Link href="#about">About</Link>
                        <Link href="#contact">Contact</Link>
                        <Link href="#profile">{user._id && user.email && user.username ? user.username : "Profile"}</Link>
                        <button onClick={handleLogout}>Logout</button>
                        <Link href="#cart">Cart(0)</Link>
                    </div>
                )
            }
        </div>
    )
}

export default Menu