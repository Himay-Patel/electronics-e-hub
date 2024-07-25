import React from 'react';
import Container from './Container';
import { motion } from 'framer-motion';

interface Props {
    title: string;
    description: string;
}

const SlidetText = ({ title, description }: Props) => {
    return (
        <div className='hidden lg:inline-block absolute top-0 left-0 2xl:-left-20 w-full h-full'>
            <Container className='flex h-full flex-col gap-y-10 justify-center'>
                {/* Title */}
                <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className='text-dark font-thin mb-2 md:mb-3 border-l-4 border-e_hub_orange px-2 text-xl xl:text-3xl text-e_hub_light_black uppercase'>
                    {title}
                </motion.h2>

                {/* Description */}
                <motion.h1
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                    className='font-bold mb-2 md:mb-3 text-2xl lg:text-4xl xl:5xl 2xl:text-6xl text-e_hub_black_'
                    dangerouslySetInnerHTML={{ __html: description }} />

                {/* Button */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}>
                    <button className='py-3 px-6 rounded-md bg-e_hub_gray hover:bg-e_hub_light_black duration-200 text-lg font-bold text-center text-e_hub_white uppercase'>
                        Shop Now
                    </button>
                </motion.div>
            </Container>
        </div>
    );
};

export default SlidetText;
