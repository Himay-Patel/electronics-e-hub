import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import discover from '../../public/discover.png'
import skrill from '../../public/skrill.png'
import paypal from '../../public/paypal.png'
import mastercard from '../../public/mastercard.png'
import visa from '../../public/visa.png'
import { FaTruckFast } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { HiBadgeCheck } from "react-icons/hi";
import { VscSend } from "react-icons/vsc";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className='flex flex-col gap-0'>
      {/* Top */}
      <div className="py-24 px-4 md:px-8 lg:px-16 xl:px-32">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4">

          <div className=" w-full bg-e_hub_white rounded-lg shadow-xl flex md:w-1/3 p-4 items-center justify-center gap-8">
            <FaTruckFast className='text-6xl' />
            <div className="flex flex-col items-center">
              <h2 className="font-semibold text-lg">FREE AND FAST DELIVERY</h2>
              <p className='text-sm'>Free delivery for all orders over ₹200.</p>
            </div>
          </div>

          <div className=" w-full bg-e_hub_white rounded-lg shadow-xl flex md:w-1/3 p-4 items-center justify-center gap-8">
            <BiSupport className='text-6xl' />
            <div className="flex flex-col items-center">
              <h2 className="font-semibold text-lg">
                24/7 CUSTOMER SERVICE
              </h2>
              <p className='text-sm'>Friendly 24/7 customer support.</p>
            </div>
          </div>

          <div className=" w-full bg-e_hub_white rounded-lg shadow-xl flex md:w-1/3 p-4 items-center justify-center gap-8">
            <HiBadgeCheck className='text-6xl' />
            <div className="flex flex-col items-center">
              <h2 className="font-semibold text-lg">MONEY BACK GUARANTEE</h2>
              <p className='text-sm'>We reurn money within 30 days.</p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom */}
      <div className='py-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 bg-e_hub_black text-e_hub_white text-sm'>
        {/* top */}
        <div className="flex flex-col md:flex-row justify-between gap-24">
          {/* left */}
          <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
            <Link href="/">
              <div className='text-2xl tracking-widest'>E-hub</div>
            </Link>
            <p>
              B-201, ABC Plaza, PQR road, Opp. xyz bank, Ahmedabad 320008, Gujarat, India
            </p>
            <span className='font-semibold'>electronicehub123@gmail.com</span>
            <span className='font-semibold'>+91 xxxx xxxx xx</span>
          </div>
          {/* center */}
          <div className="hidden lg:flex justify-between w-1/2">
            <div className="flex flex-col justify-between">
              <h1 className='font-medium text-lg uppercase'>company</h1>
              <div className="flex flex-col gap-6 capitalize">
                <Link href="#">about us</Link>
                <Link href="#">careers</Link>
                <Link href="#">affiliates</Link>
                <Link href="/blog">blog</Link>
                <Link href="#">contact us</Link>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <h1 className='font-medium text-lg uppercase'>shop</h1>
              <div className="flex flex-col gap-6 capitalize">
                <Link href="/list">new arrivals</Link>
                <Link href="/list">mobiles</Link>
                <Link href="/list">laptops</Link>
                <Link href="/list">smart watches</Link>
                <Link href="/list">all products</Link>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <h1 className='font-medium text-lg uppercase'>help</h1>
              <div className="flex flex-col gap-6 capitalize">
                <Link href="#">customer service</Link>
                <Link href="#">my account</Link>
                <Link href="#">find a store</Link>
                <Link href="#">legal & privacy</Link>
                <Link href="#">gift card</Link>
              </div>
            </div>
          </div>
          {/* right */}
          <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
            <h1 className='font-medium text-lg uppercase'>subscribe</h1>
            <p>Enter your email below to be the first to know about new collections and product launches.</p>
            <div className="flex ring-1 ring-e_hub_white">
              <input type="email" placeholder='Email Address' className='p-4 w-3/4 border-none outline-none text-e_hub_light_gray bg-e_hub_black' />
              <button className='w-1/4 bg-e_hub_black flex justify-center items-center bg-opacity-70'>
                <VscSend className='text-3xl text-e_hub_white' />
              </button>
            </div>
            <span className='capitalize font-semibold'>secure payments</span>
            <div className="flex justify-between">
              <Image src={discover} alt='Discover' width={40} height={20} className='w-[10%]' />
              <Image src={skrill} alt='Skrill' width={40} height={20} className='w-[10%]' />
              <Image src={paypal} alt='PayPal' width={40} height={20} className='w-[10%]' />
              <Image src={mastercard} alt='MasterCard' width={40} height={20} className='w-[10%]' />
              <Image src={visa} alt='Visa' width={40} height={20} className='w-[10%]' />
            </div>
          </div>
        </div>

        {/* Add HR line */}
        <hr className='border-e_hub_light_gray opacity-50  my-16' />

        {/* bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
          <div className="flex gap-4">
            <Link href="#facebook"><FaFacebook className='text-4xl' /></Link>
            <Link href="#twitter"><FaTwitter className='text-4xl' /></Link>
            <Link href="#linkedin"><FaLinkedin className='text-4xl' /></Link>
            <Link href="#instagram"><FaInstagram className='text-4xl' /></Link>
          </div>
          <div className='text-center text-base'>© 2024 E-hub Shop</div>
          {/* <div className="flex flex-col gap-8 md:flex-row">
            <div>
              <span className='text-gray-300 mr-4'>Language</span>
              <span className='font-medium'>India | English</span>
            </div>
            <div>
              <span className='text-gray-300 mr-4'>Currency</span>
              <span className='font-medium'>₹ IND</span>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  )
}

export default Footer