"use client";
import { useState } from 'react';
import { motion } from "framer-motion";
import Image from "next/image";
import { Gilda_Display } from "next/font/google";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay } from 'swiper/modules';

const gilda = Gilda_Display({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-gilda',
  display: 'swap',
});

const places = [
  { src: '/rakaposhi.jpg', title: 'Rakaposhi' },
  { src: '/gappa.jpg', title: 'Gappa Valley' },
  { src: '/hispar.jpg', title: 'Hispar Glacier' },
  { src: '/diran.jpg', title: 'Diran Base Camp' },
  { src: '/chaprote.jpg', title: 'Chaprote Valley' },
  { src: '/gulmit.jpg', title: 'Gulmit Valley' },
  { src: '/pissan.jpg', title: 'Pissan Cricket Stadium' },
];

export default function Home() {
  const rooms = [
    { img: '/familyroom2.jpeg', title: 'Chalt View Room' },
    { img: '/familyroom.jpeg', title: 'Family Room' },
    { img: '/room8.jpeg', title: 'Double Room' },
    { img: '/rooma.jpg', title: 'Single Room' },
  ];
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <main className={`w-full mx-auto px-4 flex flex-col ${gilda.variable}`}>
      <div className="relative w-full h-[500px] md:h-[700px] lg:h-[800px] overflow-hidden mt-5">
        <div className="absolute inset-0 animate-kenburns">
<Image
  src="/viewhotel.jpeg"
  alt="Hotel View"
  layout="fill"
  objectFit="cover"
  objectPosition="top" // show top of image where hotel is visible
  quality={100}
  priority
/>          <motion.div className="absolute inset-0 flex flex-col items-center justify-center md:mx-0 mx-4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <motion.h2 className="text-white text-sm md:text-4xl drop-shadow-md text-center px-2 md:px-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>Welcome to Our Hotel</motion.h2>
            <motion.h1 className="text-white text-lg md:text-6xl lg:text-7xl drop-shadow-md text-center px-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>Experience Luxury and Comfort</motion.h1>
            <motion.h1 className="text-white text-sm md:text-7xl drop-shadow-md" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.8 }}>Retreat and Unwind</motion.h1>
            <motion.div className="flex flex-col items-center justify-center md:mt-4 mt-0" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}>
              <h5 className="text-white text-sm md:text-2xl drop-shadow-md md:px-10 px-5 text-center">Indulge in the tranquility of our hotel</h5>
              <h5 className="text-white text-sm md:text-2xl drop-shadow-md text-center">Comfort & Elegance</h5>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="facilities    px-3 md:px-2 mx-auto w-full bg-[#f1f1f1] py-10 md:mb-0 md:h-[700px]">
        <h3 className="text-black text-2xl md:text-5xl text-center pt-5 md:pt-20">Hotel Facilities</h3>
        <div className="row mt-5 md:mt-20 flex flex-col md:flex-row justify-between gap-4">
          {["bed", "security", "mountain"].map((icon, i) => (
            <div key={i} className="box bg-white w-full md:w-[300px] h-[200px] md:h-[300px] rounded-lg shadow-lg flex flex-col items-center pt-10 md:pt-5 gap-2 md:gap-8 mx-0 md:mx-5">
              <img width={icon === "mountain" ? 70 : 50} src={icon === "mountain" ? "/mountain.png" : `https://moonlit-nextjs.netlify.app/assets/images/icon/${icon}.svg`} alt="icon" />
              <h6 className="md:text-2xl text-lg text-center">{icon === "bed" ? "Rooms and Suites" : icon === "security" ? "24-Hour Security" : "Chalt View Hotel"}</h6>
              <p className="text-center md:text-lg text-sm text-gray-600">{icon === "bed" ? "Varied types of rooms, from standard to luxury suites." : icon === "security" ? "On-site security personnel. Secure storage for valuables with CCTV Cameras." : "Our hotel offers breathtaking mountain views and serene comfort."}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="rooms  bg-white flex flex-col md:flex-row justify-between items-start md:items-center pt-10 md:pt-30 w-full  gap-8 md:ml-10">
        <div className="item text-4xl md:text-5xl text-[#bca282] md:ml-20">Our Rooms</div>
        <div className="item text-lg md:text-lg text-gray-600 text-center md:max-w-[500px] md:text-right md:mr-20">
          Our rooms offer a harmonious blend of comfort and elegance, designed to provide a serene retreat for our guests. Enjoy breathtaking views and unwind in style.
        </div>
      </div>

      <div className="block md:hidden w-full relative my-10">
        <div className="relative h-[400px]">
          <Image src={rooms[activeIndex].img} alt={rooms[activeIndex].title} fill sizes="100vw" className="object-cover rounded-lg" />
          <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 text-white p-4">
            <h3 className="text-xl font-semibold">{rooms[activeIndex].title}</h3>
          </div>
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
          {rooms.map((_, index) => (
            <button key={index} className={`w-3 h-3 rounded-full transition-all ${index === activeIndex ? 'bg-[#bca282] opacity-100' : 'bg-white opacity-50'}`} onClick={() => setActiveIndex(index)} />
          ))}
        </div>
      </div>

      <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10 w-full px-4">
        {rooms.map((room, index) => (
          <div key={index} className="room relative h-[400px]">
            <Image src={room.img} alt={room.title} fill sizes="(max-width: 1024px) 50vw, 25vw" className="object-fit rounded-lg" />
            <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 text-white p-4">
              <h3 className="text-xl font-semibold">{room.title}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="restaurant flex flex-col md:flex-row items-center bg-[#f1f1f1] my-10 md:my-30 mx-auto w-full py-10 px-3 gap-8">
        <div className="flex flex-col space-y-4 md:w-1/2">
          <h1 className="md:text-5xl text-3xl text-[#bca282]">Restaurant & Dining</h1>
          <h4 className="text-gray-600 text-lg md:text-xl text-center md:text-left">Chalt View Hotel in Nagar, Gilgit, offers a cozy and welcoming dining experience with stunning views of the surrounding mountains and valleys...</h4>
          <button className="bg-[#bca282] text-white px-4 py-2 rounded-md self-center md:self-start">Discover</button>
        </div>
        <div className="md:w-1/2 w-full">
          <img src="/resturant.jpeg" alt="Restaurant" className="w-full h-[300px] object-cover rounded-lg" />
        </div>
      </div>

      <div className="facilities mx-auto w-full bg-white h-auto mb-20 px-2 md:px-3">
        <h3 className="text-5xl text-center text-[#bca282] pt-20">Tourist Places Nearby</h3>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          dir="rtl"
          autoplay={{ delay: 3000, reverseDirection: true, disableOnInteraction: false }}
          loop={true}
          breakpoints={{ 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 }, 1280: { slidesPerView: 4 } }}
          className="w-full mt-10"
        >
          {places.map((place, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-[400px]">
                <Image src={place.src} alt={place.title} fill className="object-cover rounded-lg" />
                <div className="absolute bottom-0 left-0 right-0 bg-opacity-50 text-white p-4 rounded-b-lg">
                  <h3 className="text-xl font-semibold">{place.title}</h3>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
}
