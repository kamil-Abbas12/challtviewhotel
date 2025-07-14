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

const Restaurant = () => {
  return (
    <>
    <main className={`w-full mx-auto flex  flex-col ${gilda.variable}`}>
      {/* Hero Section */}
      <div className="relative w-full h-[500px] overflow-hidden mt-5">
        <Image
          src="/rest2.jpeg" // ✅ Make sure it's renamed and placed in /public folder
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
The Restaurant
          </motion.h1>

          <motion.h4
            className="text-white text-md md:text-2xl mt-6 text-center drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
Whether you are in the mood for a leisurely breakfast, a business lunch, or a nice dinner.

          </motion.h4>
        </motion.div>
      </div>
    <div className="restaurant bg-white container w-[90%] md:w-full" >
<div className="items md:justify-between justify-center  flex md:flex-row flex-col  mt-20">
 <img  src="/resturant.jpeg" alt="Restaurant" className="w-full h-[500px] md:ml-5  md:mx-0 ml-2 object-cover rounded-lg" />
  <div className="items gap-4 ml-8 md:mx-0 md:ml-20 space-y-1 md:space-y-4">

<h1 className="text-2xl  text-[#bca282] mt-2 md:mt-0">Hotel Experience</h1>
<h1 className="text-black text-2xl md:text-5xl ">From Farm to Fork Enjoy </h1>
<h1 className="text-black  text-2xl md:text-5xl "> Fresh Seasonal Dishes at</h1>
<h1 className="text-black  text-2xl md:text-5xl "> Bokinn</h1>

<p className='text-gray-600 '>Welcome to Chalt View Hotel nestled in the scenic valley of Nagar Gilgit. We offer a perfect blend of local warmth and modern comfort with cozy rooms and stunning mountain views. Whether you're here to explore or unwind enjoy a peaceful and memorable stay with us.</p>
<div className="box flex  flex-col md:flex-row mt-10 gap-4  ">
  <div className="container  w-[200px] bg-[#f1f1f1] h-[100px] text-center flex-col  ">
    <h4 className='text-gray-500  mt-3 text-center'>Reservation By Phone</h4>
    <div className="flex space-x-1 justify-center gap-2 items-center">
    <Image className='mt-2 text-item-center' src="https://moonlit-nextjs.netlify.app/assets/images/icon/phone.svg" alt="Phone Icon" width={16} height={16} />
    <h4 className='text-black  mt-2 text-center'>+923357666772</h4>
</div>
  </div>
  <div className="container  w-[200px] bg-[#f1f1f1] h-[100px] text-center flex-col ">
    <h4 className='text-gray-500  mt-3 text-center'>Opening Hours</h4>
    <div className="flex space-x-1 justify-center gap-2 items-center">
    <Image className='mt-2 text-item-center' src="https://moonlit-nextjs.netlify.app/assets/images/icon/clock.svg" alt="Phone Icon" width={16} height={16} />
    <h4 className='text-black  mt-2 text-center'>8 Am - 12Pm
</h4>
</div>
</div>
</div>
  </div>
</div>
        </div>
     <div className="gallery md:grid-rows-5 grid-col  bg-white mx-auto justify-center items-center mt-20 w-full">
      <div className="row1 flex items-center justify-center  gap-4">
    <Image className='mt-2 item-center' src="https://moonlit-nextjs.netlify.app/assets/images/shape/section__style__three-1.svg" alt="Gallery Icon" width={52} height={13} />
    <h1 className='md:text-2xl text-xl text-[#bca282]'>Gallery</h1>
    <Image className='mt-2 item-center' src="https://moonlit-nextjs.netlify.app/assets/images/shape/section__style__three-2.svg" alt="Gallery Icon" width={52} height={13} />
      </div>
      <div className="row2 flex flex-col items-center justify-center mt-5">
        <h1 className='md:text-6xl text-4xl text-black'>Our Restaurant Gallery</h1>
       
      </div>
      <div className="text text-center gap-2 md:gap-4 mt-5"> <p className='text-gray-600 '>Our rooms offer a harmonious blend of comfort and elegance, designed to provide an exceptional stay for </p>
         <p className='text-gray-600 '>  every guest Each room features plush bedding.</p></div>
      </div> 

<div className="rooms-grid grid grid-cols-1 mx-5 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 w-full">
  {/* Room 1 */}
  <div className="room relative h-[500px]">
    <Image src="/dawdo.jpg" alt="Dawdo" fill className="object-cover rounded-lg" />
  </div>

  {/* Room 2 */}
  <div className="room relative h-[500px]">
    <Image src="/Chicken-Biryani.jpg" alt="Chicken Biryani" fill className="object-cover rounded-lg" />
  </div>

  {/* Room 3 */}
  <div className="room relative h-[500px]">
    <Image src="/karahi.jpg" alt="Karahi" fill className="object-cover rounded-lg" />
  </div>

  {/* Room 4 */}
  <div className="room relative h-[500px]">
    <Image src="/mutton.jpg" alt="Gooli" fill className="object-cover rounded-lg" />
  </div>
</div>
      </main>
      </>
  );
}
      export default Restaurant;