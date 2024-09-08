'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import logo from '../../../public/logo.png';
import Loading from '@/components/Loading';

interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
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
    try {
      // Simulate login process
      // Replace with your actual authentication logic
      if (data.email === "ehub123@gmail.com" && data.password === "ehub@123") {
        setErrMsg("Login successful!");
        router.push('/dashboard'); // Redirect to dashboard
      } else {
        setErrMsg("Login failed! Invalid credentials.");
      }
    } catch (error) {
      setErrMsg("An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-e_hub_white w-full h-screen flex items-center justify-center p-6">
      <div className="w-full md:w-2/3 h-auto lg:h-full py-8 lg:py-0 flex bg-e_hub_white rounded-xl overflow-hidden">
        {/* Left side */}
        <div className="hidden w-1/2 h-full lg:flex flex-col items-center justify-center bg-e_hub_white">
          <Image src={logo} alt="Bg_Image" className="w-5/6 object-cover" />
        </div>

        {/* Right side */}
        <div className="w-full lg:w-1/2 h-full p-10 lg:px-20 flex flex-col justify-center text-e_hub_black">
          <div className="w-full flex gap-2 items-center mb-6">
            <Image src={logo} alt="logo" className="rounded-full w-12 h-12" />
            <span className="text-2xl font-semibold">E-Hub Admin-panel</span>
          </div>
          <form className="py-8 flex flex-col gap-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div className="w-full flex flex-col mt-2">
              <label htmlFor="email" className="text-sm mb-2 ml-2">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="example@email.com"
                {...register("email", { required: "Email Address is required" })}
                className={`bg-white border border-gray-300 text-gray-900 outline-none text-sm px-4 py-3 placeholder-gray-400 w-full rounded-full`}
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              {errors.email && (
                <span className="text-xs text-red-600 mt-0.5">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="w-full flex flex-col mt-2">
              <label htmlFor="password" className="text-sm mb-2 ml-2">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password", { required: "Password is required" })}
                className={`bg-white border border-gray-300 text-gray-900 outline-none text-sm px-4 py-3 placeholder-gray-400 w-full rounded-full`}
                aria-invalid={errors.password ? 'true' : 'false'}
              />
              {errors.password && (
                <span className="text-xs text-red-600 mt-0.5">{errors.password.message}</span>
              )}
            </div>

            {/* Show the response from the backend */}
            {errMsg && (
              <span className={`text-sm mt-0.5 ${errMsg.includes('failed') ? 'text-red-600' : 'text-green-600'}`}>
                {errMsg}
              </span>
            )}

            {/* Login button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-e_hub_light_black text-white rounded-full px-6 py-3 mt-4 font-semibold flex items-center justify-center"
            >
              {isSubmitting ? <Loading /> : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
