"use client";
import Image from 'next/image';
import React, { useState, useRef, useEffect, use, LegacyRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import logo from '../../../../public/logo.png';
import Loading from "../../../components/Loading";
import axios, { AxiosError } from 'axios';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { useParams, useRouter } from 'next/navigation';
import { setUser } from '@/lib/redux/features/userSlice';
import { Toaster, toast } from 'sonner';

interface OTPFormInputs {
    otp1: string;
    otp2: string;
    otp3: string;
    otp4: string;
}

const OTPPage: React.FC = () => {
    const [errMsg, setErrMsg] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user);

    const router = useRouter();
    const { slug } = useParams();

    useEffect(() => {
        if (user._id && user.username && user.email) {
            router.push('/');
        }
    }, []);

    useEffect(() => {
        if (errMsg.length > 0) {
            toast.error(errMsg);
        }
        return () => {
            setErrMsg('');
        }
    }, [errMsg]);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<OTPFormInputs>();

    const onSubmit: SubmitHandler<OTPFormInputs> = async (data) => {
        setIsSubmitting(true);
        setErrMsg("");

        //try catch
        try {
            const otp = Number.parseInt(data.otp1 + data.otp2 + data.otp3 + data.otp4);
            const response = await axios.post(process.env.API_URL + "/api/otp/verify/" + slug, { otp }, { withCredentials: true });
            if (slug === 'login') {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                dispatch(setUser({
                    _id: response.data.user._id,
                    username: response.data.user.username,
                    email: response.data.user.email,
                    imageUrl: response.data.user.imageUrl
                }));
                router.push('/');
            } else {
                router.push("/change-password");
            }
        } catch (err: AxiosError | any) {
            console.log(err);
            if (err.response.status === 401) {
                setErrMsg("OTP Expired");
            } else {
                setErrMsg(err.response.data.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (value.length <= 1) {
            setValue(`otp${index + 1}` as keyof OTPFormInputs, value);
            if (value && index < 3) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !e.currentTarget.value && index > 0) {
            inputRefs.current[index - 1]?.focus();
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
                        <form className='py-8 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>

                            {/* OTP */}
                            <div className='w-full flex justify-between mt-2'>
                                {Array(4).fill(0).map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength={1}
                                        {...register(`otp${index + 1}` as keyof OTPFormInputs, {
                                            required: "OTP is required"
                                        })}
                                        className={`bg-e_hub_white h-16 border border-e_hub_black text-e_hub_black outline-none text-xl px-4 py-3 placeholder:text-e_hub_light_gray w-1/5 rounded-lg text-center`}
                                        ref={(el) => (inputRefs.current[index] = el)}
                                        onChange={(e) => handleInputChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        aria-invalid={errors[`otp${index + 1}` as keyof OTPFormInputs] ? 'true' : 'false'}
                                    />
                                ))}
                            </div>
                            {Object.values(errors).some(error => error) && (
                                <span className='text-xs text-red-600 mt-0.5'>OTP is required</span>
                            )}

                            {/* show the res for the backend */}
                            {/* {errMsg && (
                                <span className={`text-sm ${errMsg.includes('failed')
                                    ? 'text-[#f64949fe]'
                                    : 'text-[#2ba150fe]'
                                    } mt-0.5`}>
                                    {errMsg}
                                </span>
                            )} */}

                            {/* Submit btn */}
                            <button
                                type='submit'
                                disabled={isSubmitting}
                                className='bg-e_hub_black text-white rounded-full px-6 py-3 mt-4 font-semibold flex items-center justify-center'
                            >
                                {isSubmitting ? <Loading /> : 'Verify OTP'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
export default OTPPage;
