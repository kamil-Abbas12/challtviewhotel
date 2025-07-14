'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Gilda_Display } from 'next/font/google'
import Image from 'next/image'

const gilda = Gilda_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gilda',
})

const About = () => {
  return (
    <main className={`w-full mx-auto flex flex-col ${gilda.variable}`}>
      {/* Hero Section */}
      <div className="relative w-full h-[500px] overflow-hidden mt-5">
        <Image
          src="/resturant.jpeg" // ✅ Make sure it's renamed and placed in /public folder
          alt="Cover"
          fill
          sizes="100vw"
          quality={100}
          className="object-cover"
        />

        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center "
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-white text-3xl md:text-7xl  drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            About Us
          </motion.h1>

          <motion.h4
            className="text-white text-md md:text-2xl mt-6 text-center drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Welcome to Chalt View Hotel, where mountains meet hospitality.
          </motion.h4>
        </motion.div>
      </div>
 <div className="bg-white flex flex-col md:flex-row justify-end items-stretch gap-1 md:gap-8 py-4 md:py-6 w-full md:w-4/5 lg:w-2/3  md:ml-20 md:mr-20 mx-1 pt-5 md:pt-20">
  {/* Image Container - with controlled width and full height */}
  <div className="pic md:w-[45%]   h-auto min-h-[200px] md:min-h-[300px]">

 <img  src="/rest2.jpeg" alt="Restaurant" className="" />

  </div>
  
  {/* Text Container - with justified text and matching height */}
  <div className="text md:w-[50%] flex flex-col justify-center mx-4 md:ml-30">
    <h1 className='md:text-4xl text-md font-bold text-[#ab8a62] mb-4'>Chalt View Hotel</h1>
    <div className="md:space-y-4  space-y-2 text-justify">
      <p className='text-gray-600 md:text-lg text-md'>
        Nestled in the heart of the breathtaking Gilgit-Baltistan region, Chalt View Hotel offers a unique blend of luxury and natural beauty. Our hotel is designed to provide you with an unforgettable experience, surrounded by stunning mountain vistas and serene landscapes.
      </p>
      <p className='text-gray-600 md:text-lg text-md'>
        At Chalt View Hotel, we pride ourselves on our commitment to exceptional service and hospitality. Our dedicated staff is here to ensure that your stay is comfortable and enjoyable, catering to your every need.
      </p>
    </div>
  </div>
</div>

      
      </main>
  )
}
      export default About;