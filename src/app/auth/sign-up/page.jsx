"use client";

import React, { useState } from 'react';
import { PiEyeClosedBold, PiEyeClosedDuotone } from "react-icons/pi";
import bg from '../../../../public/pana.png';
import Image from 'next/image';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const baseUrl = process.env.NEXT_PUBLIC_URL;
    const router = useRouter();
const [isEyeOpen, setIsEyeOpen] = useState(false);
const [isEyeOpend, setIsEyeOpend] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Password confirmation logic
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    // Prepare only the required fields
    const { name, email, password } = formData;

    try {
      setLoading(true);
      const response = await fetch(`${baseUrl}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), // ✅ Only sending required data
      });

      const data = await response.json();
      if (response) {
  setFormData({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  
}

      if (!response.ok) {
        throw new Error(data.message || 'Signup failed');
      }

      toast.success('Signup successful!');
      
      // Optional: redirect after success
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
    router.push("/auth/login")
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='flex flex-col lg:flex-row gap-8 lg:gap-16 mx-4 sm:mx-8 lg:mx-20 mt-8 lg:mt-10'>
  {/* Image Section */}
  <div className='lg:w-1/2 flex justify-center items-center order-2 lg:order-1'>
    <div className='relative'>
      <Image 
        className='w-full max-w-sm lg:max-w-md xl:max-w-lg h-auto' 
        height={400} 
        width={400} 
        src={bg} 
        alt='' 
      />
    </div>
  </div>

  {/* Form Section */}
  <div className='lg:w-1/2 flex flex-col gap-5 justify-center order-1 lg:order-2 lg:border-l-2 lg:border-l-red-800 lg:pl-10'>
    <h1 className='font-bold text-3xl sm:text-4xl text-center lg:text-left'>Sign Up</h1>

    {/* User Name */}
    <div className='flex flex-col gap-2'>
      <label className='font-medium text-gray-700'>User Name</label>
      <input
        name="name"
        type="text"
        className='w-full lg:w-4/5 border border-slate-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all'
        placeholder='Enter your name'
        value={formData.name}
        onChange={handleChange}
        required
      />
    </div>

    {/* Email */}
    <div className='flex flex-col gap-2'>
      <label className='font-medium text-gray-700'>Email</label>
      <input
        name="email"
        type="email"
        className='w-full lg:w-4/5 border border-slate-300 rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all'
        placeholder='Enter your email'
        value={formData.email}
        onChange={handleChange}
        required
      />
    </div>

    {/* Password */}
    <div className='flex flex-col gap-2'>
      <label className='font-medium text-gray-700'>Password</label>
      <div className="relative w-full lg:w-4/5">
        <input
          name="password"
          type={isEyeOpen ? "text" : "password"}
          className='w-full border border-slate-300 rounded-2xl p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all'
          placeholder="Enter a new password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => setIsEyeOpen(!isEyeOpen)}
        >
          {isEyeOpen ? (
            <PiEyeClosedBold className="text-xl" />
          ) : (
            <PiEyeClosedDuotone className="text-xl" />
          )}
        </button>
      </div>
    </div>

    {/* Confirm Password */}
    <div className='flex flex-col gap-2'>
      <label className='font-medium text-gray-700'>Confirm Password</label>
      <div className="relative w-full lg:w-4/5">
        <input
          name="confirmPassword"
          type={isEyeOpend ? "text" : "password"}
          className='w-full border border-slate-300 rounded-2xl p-4 pr-12 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all'
          placeholder='Re-enter your password'
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          onClick={() => setIsEyeOpend(!isEyeOpend)}
        >
          {isEyeOpend ? (
            <PiEyeClosedBold className="text-xl" />
          ) : (
            <PiEyeClosedDuotone className="text-xl" />
          )}
        </button>
      </div>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className='w-full lg:w-4/5 bg-gradient-to-r from-red-600 to-red-900 hover:from-red-700 hover:to-red-950 text-white p-4 rounded-full font-medium text-lg sm:text-xl transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-4'
      disabled={loading}
    >
      {loading ? 'Signing Up...' : 'Sign Up'}
    </button>

    {/* Sign In Link */}
    <div className='w-full lg:w-4/5'>
      <p className='text-center lg:text-left text-gray-600'>
        Already have an account?{' '}
        <Link className='text-red-800 hover:text-red-900 font-medium transition-colors' href={"/auth/login"}>
          Sign In
        </Link>
      </p>
    </div>
  </div>
</form>

      {/* Toast notifications */}
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
};

export default SignUp;
