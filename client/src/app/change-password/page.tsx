"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import logo from '../../../public/logo.png';
import Loading from "../../components/Loading"

interface ChangePasswordFormInputs {
    password: string;
    confirmPassword: string;
}

const ChangePasswordPage: React.FC = () => {
    const [errMsg, setErrMsg] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm<ChangePasswordFormInputs>();

    const onSubmit: SubmitHandler<ChangePasswordFormInputs> = async (data) => {
        setIsSubmitting(true);
        // add try catch hear
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

                        {/* password */}
                        <div className='w-full flex flex-col mt-2'>
                            <label htmlFor="password" className='text-sm mb-2 ml-2'>Password</label>
                            <input
                                id="password"
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: "Password is required"
                                })}
                                className={`bg-e_hub_white border border-e_hub_black text-e_hub_black outline-none text-sm px-4 py-3 placeholder:text-e_hub_light_gray w-full rounded-full`}
                                aria-invalid={errors.password ? 'true' : 'false'}
                            />
                            {errors.password && (
                                <span className='text-xs text-red-600 mt-0.5'>{errors.password.message}</span>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className='w-full flex flex-col mt-2'>
                            <label htmlFor="confirmPassword" className='text-sm mb-2 ml-2'>Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                placeholder="Confirm Password"
                                {...register("confirmPassword", {
                                    required: "Confirm Password is required",
                                    validate: (value) => {
                                        const { password } = getValues();
                                        if (password !== value) {
                                            return "Passwords do not match";
                                        }
                                    }
                                })}
                                className={`bg-e_hub_white border border-e_hub_black text-e_hub_black outline-none text-sm px-4 py-3 placeholder:text-e_hub_light_gray w-full rounded-full`}
                                aria-invalid={errors.confirmPassword ? 'true' : 'false'}
                            />
                            {errors.confirmPassword && (
                                <span className='text-xs text-red-600 mt-0.5'>{errors.confirmPassword.message}</span>
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

                        {/* ChangePassword btn */}
                        <button
                            type='submit'
                            disabled={isSubmitting}
                            className='bg-e_hub_black text-white rounded-full px-6 py-3 mt-4 font-semibold flex items-center justify-center'
                        >
                            {isSubmitting ? <Loading /> : 'Change Password'}
                        </button>
                    </form>

                </div>

            </div>
        </div>
    );
}

export default ChangePasswordPage;