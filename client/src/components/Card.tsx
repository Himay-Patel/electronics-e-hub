"use client"
import React from 'react'
import Camera from '../../public/products/camera.png'
import Iphone from '../../public/products/iphone_14.png'
import smartwatch from '../../public/products/samrtwatch.png'
import Image from 'next/image'
import '../../tailwind.config'
import '../app/globals.css'

const Cards = () => {
    return (
        <section className='flex justify-center items-center h-full bg-e_hub_white md:flex-col'>
            <div className="container flex justify-around items-center gap-2 relative my-0 mx-5 flex-wrap">

                <div className="card relative w-80 h-96 bg-e_hub_light_black rounded-2xl overflow-hidden before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-e_hub_orange my-3 sm:flex-shrink sm:px-3">

                    <div className="imgbox absolute top-2/4 -translate-y-1/2 z-50 w-full h-56 duration-500 ">
                        <Image src={Iphone} alt='' className='img absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 w-36' />
                    </div>

                    <div className="contentbox flex flex-col items-center justify-center absolute bottom-0 w-full h-24 text-center duration-1000 z-10">
                        <h2 className='relative font-bold text-3xl letter tracking-wider text-e_hub_white capitalize'>I-phone 14</h2>
                        {/* <div className="color flex justify-center items-center py-2 px-5 duration-500 opacity-0 invisible">
                            <h3 className='text-e_hub_white font-bold text-sm uppercase tracking-wider mr-2'>color :</h3>
                            <span className='w-5 h-5 bg-yellow-200 rounded-full my-0 mx-1 cursor-pointer'></span>
                            <span className='w-5 h-5 bg-orange-500 rounded-full my-0 mx-1 cursor-pointer'></span>
                            <span className='w-5 h-5 bg-blue-200 rounded-full my-0 mx-1 cursor-pointer'></span>
                        </div> */}
                        <p className='text-e_hub_white font-semibold'>128GB Blue</p>

                        <div className="price flex justify-center items-center py-2 px-5 duration-500 opacity-0 invisible">
                            <h3 className='text-e_hub_white font-bold text-sm uppercase tracking-wider mr-2'>price :</h3>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>₹</span>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>6</span>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>0</span>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>0</span>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>0</span>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>0</span>
                        </div>

                        <a href="#" className='inline-block py-2 px-5 bg-e_hub_white rounded-md mt-2 font-bold text-e_hub_black opacity-0 translate-y-12 duration-500'>Buy Now</a>
                    </div>

                </div>

                <div className="card relative w-80 h-96 bg-e_hub_light_black rounded-2xl overflow-hidden before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-e_hub_orange my-3 ">

                    <div className="imgbox absolute top-2/4 -translate-y-1/2 z-50 w-full h-56 duration-500 ">
                        <Image src={smartwatch} alt='' className='img absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 w-36' />
                    </div>

                    <div className="contentbox flex flex-col items-center justify-center absolute bottom-0 w-full h-24 text-center duration-1000 z-10">
                        <h2 className='relative font-bold text-3xl letter tracking-wider text-e_hub_white capitalize'>Smart Watch</h2>
                        {/* <div className="color flex justify-center items-center py-2 px-5 duration-500 opacity-0 invisible">
                            <h3 className='text-e_hub_white font-bold text-sm uppercase tracking-wider mr-2'>color :</h3>
                            <span className='w-5 h-5 bg-yellow-200 rounded-full my-0 mx-1 cursor-pointer'></span>
                            <span className='w-5 h-5 bg-orange-500 rounded-full my-0 mx-1 cursor-pointer'></span>
                            <span className='w-5 h-5 bg-blue-200 rounded-full my-0 mx-1 cursor-pointer'></span>
                        </div> */}
                        <p className='text-e_hub_white font-semibold'>Functional Crown, Metallic Build</p>

                        <div className="price flex justify-center items-center py-2 px-5 duration-500 opacity-0 invisible">
                            <h3 className='text-e_hub_white font-bold text-sm uppercase tracking-wider mr-2'>price :</h3>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>₹</span>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>2</span>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>4</span>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>9</span>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>9</span>
                        </div>

                        <a href="#" className='inline-block py-2 px-5 bg-e_hub_white rounded-md mt-2 font-bold text-e_hub_black opacity-0 translate-y-12 duration-500'>Buy Now</a>
                    </div>

                </div>

                <div className="card relative w-80 h-96 bg-e_hub_light_black rounded-2xl overflow-hidden before:absolute before:top-0 before:left-0 before:h-full before:w-full before:bg-e_hub_orange my-3 ">

                    <div className="imgbox absolute top-2/4 -translate-y-1/2 z-50 w-full h-56 duration-500 ">
                        <Image src={Camera} alt='' className='img absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 w-40' />
                    </div>

                    <div className="contentbox flex flex-col items-center justify-center absolute bottom-0 w-full h-24 text-center duration-1000 z-10">
                        <h2 className='relative font-bold text-3xl letter tracking-wider text-e_hub_white capitalize'>Nikon camera</h2>
                        {/* <div className="color flex justify-center items-center py-2 px-5 duration-500 opacity-0 invisible">
                            <h3 className='text-e_hub_white font-bold text-sm uppercase tracking-wider mr-2'>color :</h3>
                            <span className='w-5 h-5 bg-yellow-200 rounded-full my-0 mx-1 cursor-pointer'></span>
                            <span className='w-5 h-5 bg-orange-500 rounded-full my-0 mx-1 cursor-pointer'></span>
                            <span className='w-5 h-5 bg-blue-200 rounded-full my-0 mx-1 cursor-pointer'></span>
                        </div> */}
                        <p className='text-e_hub_white font-semibold'>with Digital SLR Flash,camera Lens</p>

                        <div className="price flex justify-center items-center py-2 px-5 duration-500 opacity-0 invisible">
                            <h3 className='text-e_hub_white font-bold text-sm uppercase tracking-wider mr-2'>price :</h3>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>₹</span>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>4</span>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>9</span>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>9</span>
                            <span className='w-5 h-5 leading-5 text-center inline-block text-e_hub_black bg-e_hub_white my-0 mx-1 duration-500 rounded cursor-pointer font-bold'>9</span>
                        </div>

                        <a href="#" className='inline-block py-2 px-5 bg-e_hub_white rounded-md mt-2 font-bold text-e_hub_black opacity-0 translate-y-12 duration-500'>Buy Now</a>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Cards