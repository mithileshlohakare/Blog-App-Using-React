import React from 'react'
import Image from 'next/image'
import { assets } from '@/Assets/assets'
const Header = () => {
  return (
    <div className='py-5 pyx-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto' />
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]'>Get Started<Image src={assets.arrow} alt=''></Image></button>

      </div>
      <div className='text-center my-8'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-10 max-width-[740] m-auto text-xs sm:text-base'>
          This space is a blank canvas, a place where I'll be sharing my thoughts, ideas, and projects. I've always wanted a simple and clean way to document things, and this app seems like the perfect tool for the job.
        </p>
        <form
          className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000]'
          action=""
        >
          <input
            type='email' // Corrected from 'Email'
            placeholder='Enter Your Email'
            className='pl-4 outline-none w-full' // Added w-full to fill space
          />
          <button
            type="submit"
            className='border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white'
          >
            Subscribe
          </button>
        </form>

      </div>
    </div>
  )
}

export default Header