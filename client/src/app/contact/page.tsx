"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import logo from '../../../public/logo.png';
import { Toaster, toast } from 'sonner';
import Loading from '../../components/Loading';
import axios from 'axios';

interface ContactFormInputs {
    name: string;
    email: string;
    message: string;
}

const ContactUsPage: React.FC = () => {
    const [errMsg, setErrMsg] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset // Add this line to get the reset function
    } = useForm<ContactFormInputs>();

    const onSubmit: SubmitHandler<ContactFormInputs> = async (data) => {
        setIsSubmitting(true);
        try {
            const formData = {
                name: data.name,
                email: data.email,
                message: data.message,
                access_key: "f47620d1-9053-4432-9883-630075aff973"
            };
            const response = await axios.post("https://api.web3forms.com/submit", formData, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            });
            if (response.data.success) {
                toast.success("Your message has been sent!");
                reset();
            } else {
                throw new Error(response.data.message || "Failed to send message. Please try again.");
            }
        } catch (err: any) {
            console.log(err);
            setErrMsg(err.message || "Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Toaster position='top-center' expand={false} richColors toastOptions={{
                duration: 1500
            }} />
            <div className='bg-e_hub_white w-full h-[100vh] flex items-center justify-center p-6'>
                <div className='w-full md:w-2/3 h-fit lg:h-full 2xl:h-5/6 py-8 lg:py-0 flex bg-e_hub_white rounded-xl overflow-hidden'>
                    {/* left side */}
                    <div className='hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-blue'>
                        <Image src={logo} alt='Bg_Image' className='w-5/6 object-cover' />
                    </div>

                    {/* right side */}
                    <div className='w-full lg:w-1/2 h-full p-10 2xl:px-20 flex flex-col justify-center text-e_hub_black'>
                        <div className='w-full flex gap-2 items-center mb-6'>
                            <Image src={logo} alt='logo' className='rounded-full w-12 h-12' />
                            <span className='text-2xl font-semibold'>Electronic E-Hub</span>
                        </div>
                        <span className='text-sm mt-2'>We'd love to hear from you!</span>
                        <form className='py-8 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>

                            {/* name */}
                            <div className='w-full flex flex-col mt-2'>
                                <label htmlFor="name" className='text-sm mb-2 ml-2'>Full Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    placeholder="e-hub"
                                    {...register("name", {
                                        required: "Full Name is required"
                                    })}
                                    className={`bg-e_hub_white border border-e_hub_black text-e_hub_black outline-none text-sm px-4 py-3 placeholder:text-e_hub_light_gray w-full rounded-full`}
                                    aria-invalid={errors.name ? 'true' : 'false'}
                                />
                                {errors.name && (
                                    <span className='text-xs text-red-600 mt-0.5'>{errors.name.message}</span>
                                )}
                            </div>

                            {/* email */}
                            <div className='w-full flex flex-col mt-2'>
                                <label htmlFor="email" className='text-sm mb-2 ml-2'>Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="example@email.com"
                                    {...register("email", {
                                        required: "Email Address is required"
                                    })}
                                    className={`bg-e_hub_white border border-e_hub_black text-e_hub_black outline-none text-sm px-4 py-3 placeholder:text-e_hub_light_gray w-full rounded-full`}
                                    aria-invalid={errors.email ? 'true' : 'false'}
                                />
                                {errors.email && (
                                    <span className='text-xs text-red-600 mt-0.5'>{errors.email.message}</span>
                                )}
                            </div>

                            {/* message */}
                            <div className='w-full flex flex-col mt-2'>
                                <label htmlFor="message" className='text-sm mb-2 ml-2'>Message</label>
                                <textarea
                                    id="message"
                                    placeholder="Write your message here..."
                                    rows={4}
                                    {...register("message", {
                                        required: "Message is required"
                                    })}
                                    className={`bg-e_hub_white border border-e_hub_black text-e_hub_black outline-none text-sm px-4 py-3 placeholder:text-e_hub_light_gray w-full rounded-lg`}
                                    aria-invalid={errors.message ? 'true' : 'false'}
                                />
                                {errors.message && (
                                    <span className='text-xs text-red-600 mt-0.5'>{errors.message.message}</span>
                                )}
                            </div>

                            {/* show error message */}
                            {errMsg && (
                                <span className={`text-sm text-[#f64949fe] mt-0.5`}>
                                    {errMsg}
                                </span>
                            )}

                            {/* submit button */}
                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='bg-e_hub_black text-white rounded-full px-6 py-3 mt-4 font-semibold flex items-center justify-center'
                            >
                                {isSubmitting ? <Loading /> : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactUsPage;
