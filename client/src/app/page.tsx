'use client'
import Cards from '@/components/Card'
import Marquee from '@/components/Marquee'
import ProductList from '@/components/ProductList'
import Slider_Products from '@/components/Slider'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import banner from "../../public/banner.jpg"
import Link from 'next/link'
import TrendingProducts from '@/components/TrendingProducts'
import TrendingProductsSection from '@/components/TrendingProductsSection'
import HeroSection from '@/components/HeroSection'
import CategoriesList from '@/components/CategoriesList'
import BlogSection from '@/components/BlogSection'
import axios from 'axios'
import { setProducts } from '@/lib/redux/features/productSlice'
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks'
import { setCategories } from '@/lib/redux/features/categorySlice'
import { initiate } from '@/lib/redux/features/cartSlice'
import { setTrendingProducts } from '@/lib/redux/features/trendingproductSlice'
import { setLatestProducts } from '@/lib/redux/features/latestproductSlice'

const Homepage = () => {
  const cart = useAppSelector(state => state.cart);
  const user = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // Fetch Categories
    axios.get(process.env.API_URL + '/api/category')
      .then(response => {
        dispatch(setCategories(response.data));
      })
      .catch(err => {
        console.log(err);
      });
    // Fetch Products
    axios.get(process.env.API_URL + "/api/product")
      .then((response) => {
        dispatch(setProducts(response.data));
      }).catch((err) => {
        console.log(err);
      });
    // Fetch Trending Products
    axios.get(process.env.API_URL + "/api/product/trending")
      .then((response) => {
        dispatch(setTrendingProducts(response.data));
      }).catch((err) => {
        console.log(err);
      });
    // Fetch Latest Products
    axios.get(process.env.API_URL + "/api/product/latest")
      .then((response) => {
        dispatch(setLatestProducts(response.data));
      }).catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className=''>
      <Slider_Products />
      <div className="md:mt-20">
        <Marquee />
      </div>
      <div className="mt-20 px-4 md:px-8 lg:px-16 flex flex-col gap-5">
        <h2 className='text-2xl'>Categories</h2>
        <CategoriesList />
      </div>
      <div className="mt-20 px-4 md:px-8 lg:px-16">
        <div className="flex justify-between items-center">
          <h2 className='text-2xl'>Electronics Products</h2>
          <Link href='/list' className='text-blue-600 hover:text-blue-800'>All Products</Link>
        </div>
        <ProductList />
      </div>
      <div className="mt-20 px-4 md:px-8 lg:px-16 w-full">
        <Link href="/"><Image src={banner} alt='banner' className='rounded-md' /></Link>
      </div>
      <div className="mt-20 px-4 md:px-8 lg:px-16 flex flex-col gap-8">
        <h2 className='text-2xl'>Trending Products</h2>
        <TrendingProducts />
      </div>
      <div className="mt-20 px-4 md:px-8 lg:px-16 flex flex-col gap-8">
        <HeroSection />
      </div>
      <div className="mt-20 px-4 md:px-8 lg:px-16 flex flex-col gap-8 items-center">
        <TrendingProductsSection />
      </div>
      <div className="mt-20 px-4 md:px-8 lg:px-16 flex flex-col gap-8">
        <h2 className='text-2xl'>Latest Products</h2>
        <Cards />
      </div>
      <div className="mt-20 px-4 md:px-8 lg:px-16 flex flex-col gap-8">
        <div className="flex items-center justify-between">
          <h2 className='text-2xl'>Latest Blogs</h2>
          <Link href="/blog" className="text-blue-600">Show All</Link>
        </div>
        <BlogSection />
      </div>
    </div>
  )
}

export default Homepage