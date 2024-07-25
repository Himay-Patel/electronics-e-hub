"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import logo from '../../../public/logo.png';
import Loading from "../../components/Loading"
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface LoginFormInputs {
    email: string;
}

const ResetPasswordPage: React.FC = () => {
    const [errMsg, setErrMsg] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
        setIsSubmitting(true);
        // add try catch hear
        try {
            const response = axios.post(process.env.API_URL + "/api/user/password/reset/initiate", data, { withCredentials: true });
            await axios.post(process.env.API_URL + "/api/otp/generate", {} , { withCredentials: true });
            router.push('/otp');
        } catch (err: AxiosError | any) {
            console.log(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
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
                    <form className='py-8 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>

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

                        {/* show the res for the backend */}
                        {errMsg && (
                            <span className={`text-sm ${errMsg.includes('failed')
                                ? 'text-[#f64949fe]'
                                : 'text-[#2ba150fe]'
                                } mt-0.5`}>
                                {errMsg}
                            </span>
                        )}

                        {/* Submit btn */}
                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className='bg-e_hub_black text-white rounded-full px-6 py-3 mt-4 font-semibold flex items-center justify-center'
                        >
                            {isSubmitting ? <Loading /> : 'Send OTP'}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}

export default ResetPasswordPage