import { useState } from 'react';
import Link from 'next/link';
import { ChevronDownIcon, PlusIcon, ListBulletIcon, ShoppingBagIcon, UserCircleIcon, HomeIcon, CubeIcon, ChartPieIcon, TagIcon } from '@heroicons/react/24/solid';

const Sidebar = () => {
    const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
    const [isReportsDropdownOpen, setIsReportsDropdownOpen] = useState(false);

    const toggleProductsDropdown = () => {
        setIsProductsDropdownOpen(!isProductsDropdownOpen);
    };

    const toggleReportsDropdown = () => {
        setIsReportsDropdownOpen(!isReportsDropdownOpen);
    };

    return (
        <nav className="w-64 bg-e_hub_light_black text-white sticky top-0 h-screen">
            <div className="p-4 text-xl font-bold">Admin Panel</div>
            <ul>
                <li>
                    <Link href="/dashboard" className="flex items-center p-4 hover:bg-e_hub_gray">
                        <HomeIcon className="w-5 h-5 mr-2" />
                        <span className="mr-2">Dashboard</span>
                    </Link>
                </li>
                <li>
                    <button
                        onClick={toggleProductsDropdown}
                        className="flex items-center w-full p-4 text-left hover:bg-e_hub_gray"
                    >
                        <CubeIcon className="w-5 h-5 mr-2" />
                        <span className="mr-2">Products</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isProductsDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    {isProductsDropdownOpen && (
                        <ul className="pl-4 bg-e_hub_gray">
                            <li>
                                <Link href="/products/add" className="flex items-center p-4 hover:bg-e_hub_white hover:text-e_hub_light_black">
                                    <PlusIcon className="w-5 h-5 mr-2" />
                                    <span>Add Product</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/products" className="flex items-center p-4 hover:bg-e_hub_white hover:text-e_hub_light_black">
                                    <ListBulletIcon className="w-5 h-5 mr-2" />
                                    <span>All Products</span>
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
                <li>
                    <Link href="/categories" className="flex items-center p-4 hover:bg-e_hub_gray">
                        <TagIcon className="w-5 h-5 mr-2" />
                        <span>Categories</span>
                    </Link>
                </li>
                <li>
                    <Link href="/orders" className="flex items-center p-4 hover:bg-e_hub_gray">
                        <ShoppingBagIcon className="w-5 h-5 mr-2" />
                        <span>Orders</span>
                    </Link>
                </li>
                <li>
                    <Link href="/users" className="flex items-center p-4 hover:bg-e_hub_gray">
                        <UserCircleIcon className="w-5 h-5 mr-2" />
                        <span>Users</span>
                    </Link>
                </li>
                <li>
                    <button
                        onClick={toggleReportsDropdown}
                        className="flex items-center w-full p-4 text-left hover:bg-e_hub_gray"
                    >
                        <ChartPieIcon className="w-5 h-5 mr-2" />
                        <span className="mr-2">Reports</span>
                        <ChevronDownIcon className={`w-5 h-5 transition-transform ${isReportsDropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                    </button>
                    {isReportsDropdownOpen && (
                        <ul className="pl-4 bg-e_hub_gray">
                            <li>
                                <Link href="/reports/product_report" className="flex items-center p-4 hover:bg-e_hub_white hover:text-e_hub_light_black">
                                    <span>Product Report</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/reports/user_report" className="flex items-center p-4 hover:bg-e_hub_white hover:text-e_hub_light_black">
                                    <span>User Report</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/reports/order_report" className="flex items-center p-4 hover:bg-e_hub_white hover:text-e_hub_light_black">
                                    <span>Order Report</span>
                                </Link>
                            </li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Sidebar;
