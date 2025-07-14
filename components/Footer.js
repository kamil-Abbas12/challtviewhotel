import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-white px-4 md:px-20 py-10 mt-10">
      {/* Join Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <h1 className="text-3xl md:text-5xl font-semibold">Join Our Hotel</h1>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-[#ab8a62] px-4 py-2 rounded-md w-full md:w-auto"
          />
          <button className="bg-[#ab8a62] text-white px-6 py-2 rounded-md">
            Join
          </button>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-14">
        {/* About */}
        <div>
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" width={60} />
            <h1 className="text-2xl font-semibold">Chalt View Hotel</h1>
          </div>
          <p className="text-gray-600 mt-4">
            Each room features plush bedding, high-quality linens, and a
            selection of amenities to ensure a restful night's sleep.
          </p>
        </div>

        {/* Guest Services */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Guest Service</h2>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>24/7 Front Desk</li>
            <li>Restaurant</li>
            <li>Parking</li>
            <li>Room Service</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="mr-5 ">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div className="flex items-center gap-2 mt-3">
            <img src="/call2.svg" alt="Phone" width={24} />
            <span className="text-gray-600">03110866930</span>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <img src="/email.svg" alt="Email" width={24} />
            <span className="text-gray-600">Chaltviewhotel@gmail.com</span>
          </div>
          <div className="flex items-start gap-2 mt-3">
            <img src="/location.svg" alt="Location" width={24} />
            <span className="text-gray-600">
              Chalt View Hotel near Karakorum Cooperative Bank, Chalt Nagar, Gilgit
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-300 mt-10" />

      {/* Bottom Note */}
      <div className="text-center mt-6 text-gray-600 text-sm">
        © 2025 Chalt View Hotel. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
