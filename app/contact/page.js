'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Gilda_Display } from 'next/font/google'
import Image from 'next/image'

const gilda = Gilda_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-gilda',
})

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' })
  const [status, setStatus] = useState(null)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', phone: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }

  return (
    <main className={`w-full mx-auto flex flex-col overflow-x-hidden ${gilda.variable}`}>
      {/* Hero Section */}
      <div className="relative w-full max-w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden mt-5">
        <Image
          src="/resturant.jpeg"
          alt="Cover"
          fill
          sizes="100vw"
          quality={100}
          className="object-cover w-full h-full"
        />
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-center px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1
            className="text-white text-2xl sm:text-4xl md:text-6xl font-semibold drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Contact Us
          </motion.h1>
          <motion.h4
            className="text-white text-sm sm:text-lg md:text-2xl mt-2 sm:mt-4 drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Whether you have questions, need assistance, or simply want to share.
          </motion.h4>
        </motion.div>
      </div>

      {/* Contact Section */}
      <div className="bg-white py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center md:items-start">
          <div className="w-full md:w-1/2">
            <h3 className="text-black mb-6 text-center text-xl sm:text-2xl md:text-4xl font-medium">
              Love to hear from you! Get in touch.
            </h3>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full max-w-full"
                placeholder="Your Name"
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full max-w-full"
                placeholder="Your Phone"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border border-gray-300 rounded-md p-3 w-full max-w-full"
                placeholder="Your Email"
                required
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                className="border border-gray-300 rounded-md p-3 resize-none w-full max-w-full"
                placeholder="Message"
                required
              />
              <button
                type="submit"
                className="bg-[#bca282] text-white font-medium p-3 rounded-md hover:bg-[#a68f6e] transition w-full max-w-full"
              >
                {status === 'loading' ? 'Sending...' : 'Send'}
              </button>
              {status === 'success' && <p className="text-green-600">Message sent successfully!</p>}
              {status === 'error' && <p className="text-red-600">Failed to send. Try again.</p>}
            </form>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img
              src="/room2.jpeg"
              alt="Room"
              className="w-full h-[250px] sm:h-[350px] md:h-[450px] object-cover rounded-lg max-w-full"
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Contact
