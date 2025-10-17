'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '@/Assets/assets';

const Header = () => {
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("email", email);

      const response = await axios.post('/api/email', formData);

      if (response.data.success) {
        toast.success(response.data.msg);
        setEmail("");
      } else {
        toast.error(response.data.msg || "Error subscribing");
      }
    } catch (error) {
      console.error("❌ Error submitting email:", error);
      toast.error("Something went wrong. Try again later!");
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      {/* Top Bar */}
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={180}
          alt="Logo"
          className="w-[130px] sm:w-auto"
        />
      </div>

      {/* Main Text + Email Form */}
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] mx-auto text-xs sm:text-base">
          This space is a blank canvas, a place where I'll be sharing my thoughts, ideas, and projects. 
          I've always wanted a simple and clean way to document things, and this app seems like the perfect tool for the job.
        </p>

        <form
          onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Enter Your Email"
            className="pl-4 outline-none w-full"
            required
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
