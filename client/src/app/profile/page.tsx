"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';
import { useAppDispatch } from "@/lib/redux/hooks";

const profile = () => {
    const [user, setUserState] = useState({
        _id: "",
        username: "",
        email: "",
        imageUrl: "",
    });

    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUserState(JSON.parse(storedUser));
        } else {
            router.push("/login");
        }
    }, [router]);


    return (
        <div className="min-h-[70%] flex items-center justify-center bg-e_hub_white py-8 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <div className="flex flex-col items-center">
                    <Image
                        src={user.imageUrl || "/profile.png"}
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className="rounded-full mb-4"
                    />
                    <h2 className="text-xl font-semibold mb-2">{user.username || "Guest"}</h2>
                    <p className="text-gray-600 mb-4">{user.email || "No email available"}</p>
                    <Link href="/edit-profile" className="w-full bg-e_hub_black text-white py-2 rounded-md mt-4 flex items-center justify-center">
                        <button>
                            Edit Profile
                        </button>
                    </Link>
                    <Link href="/" className="mt-4 text-blue-500 hover:underline">
                        Back to Home
                    </Link>
                </div>
            </div>
        </div >
    );
};

export default profile;
