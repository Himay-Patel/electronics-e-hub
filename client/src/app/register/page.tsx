"use client";

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import logo from '../../../public/logo.png';
import Link from 'next/link';
import Loading from "../../components/Loading"; // Ensure this path is correct
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { setUser } from '@/lib/redux/features/userSlice';
import { Toaster, toast } from 'sonner'

interface RegisterFormInputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [errMsg, setErrMsg] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<RegisterFormInputs>();

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
      setErrMsg("");
    }
  }, [errMsg]);

  const onSubmit: SubmitHandler<RegisterFormInputs> = async (data) => {
    setIsSubmitting(true);
    // add try catch hear
    try {
      const response = await axios.post(process.env.API_URL + "/api/user/register", data, { withCredentials: true });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch(setUser({
        _id: response.data.user._id,
        username: response.data.user.username,
        email: response.data.user.email,
        imageUrl: response.data.user.imageUrl
      }));
      router.push('/');
    } catch (err: AxiosError | any) {
      console.log(err);
      if (err.response.status === 400) {
        setErrMsg(err.response.data.message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position='top-center' expand={false} richColors toastOptions={{
        duration: 2000
      }}/>
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
            <span className='text-sm mt-2'>Create your account on E-hub</span>
            <form className='py-8 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
              <div className="flex gap-5">
                {/* firstname */}
                <div className='w-full flex flex-col mt-2'>
                  <label htmlFor="firstname" className='text-sm mb-2 ml-2'>First Name</label>
                  <input
                    id="firstname"
                    type="text"
                    placeholder="first name"
                    {...register("firstname", {
                      required: "First Name is required"
                    })}
                    className={`bg-e_hub_white border border-e_hub_black text-e_hub_black outline-none text-sm px-4 py-3 placeholder:text-e_hub_light_gray w-full rounded-full`}
                    aria-invalid={errors.firstname ? 'true' : 'false'}
                  />
                  {errors.firstname && (
                    <span className='text-xs text-red-600 mt-0.5'>{errors.firstname.message}</span>
                  )}
                </div>

                {/* lastname */}
                <div className='w-full flex flex-col mt-2'>
                  <label htmlFor="lastname" className='text-sm mb-2 ml-2'>Last Name</label>
                  <input
                    id="lastname"
                    type="text"
                    placeholder="last name"
                    {...register("lastname", {
                      required: "Last Name is required"
                    })}
                    className={`bg-e_hub_white border border-e_hub_black text-e_hub_black outline-none text-sm px-4 py-3 placeholder:text-e_hub_light_gray w-full rounded-full`}
                    aria-invalid={errors.lastname ? 'true' : 'false'}
                  />
                  {errors.lastname && (
                    <span className='text-xs text-red-600 mt-0.5'>{errors.lastname.message}</span>
                  )}
                </div>
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
              {/* {errMsg && (
                <span className={`text-sm ${errMsg.includes('failed')
                  ? 'text-[#f64949fe]'
                  : 'text-[#2ba150fe]'
                  } mt-0.5`}>
                  {errMsg}
                </span>
              )} */}

              {/* Register btn */}
              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-e_hub_black text-white rounded-full px-6 py-3 mt-4 font-semibold flex items-center justify-center'
              >
                {isSubmitting ? <Loading /> : 'Register'}
              </button>
            </form>

            <p className='text-ascent-2 text-sm text-center'>
              Already have an account?
              <Link href="/login" className='text-blue-600 font-semibold ml-2 cursor-pointer'>
                Login
              </Link>
            </p>

          </div>

        </div>
      </div>
    </>
  )
}

export default RegisterPage