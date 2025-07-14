'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import LoginModal from './LoginModal'
import SignupModal from './SignupModal'
import { usePathname, useRouter } from 'next/navigation'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showSignupModal, setShowSignupModal] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { data: session } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const switchToSignup = () => {
    setShowLoginModal(false)
    setShowSignupModal(true)
  }

  const switchToLogin = () => {
    setShowSignupModal(false)
    setShowLoginModal(true)
  }

  const handleBookNowClick = () => {
    if (pathname === '/bookings') {
      alert('You’re already on the booking page.')
      return
    }
    router.push('/bookings')
  }

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Restaurant', href: '/restaurant' },
        { label: 'Rooms', href: '/rooms' },

    { label: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          {/* Left: Logo */}
          <div className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo" width={80} />
            <span className="text-md font-semibold text-gray-700">Chalt View Hotel</span>
          </div>

          {/* Mobile: Book + Menu */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={handleBookNowClick}
              className="text-white bg-[#ab8a62] px-4 py-1 rounded-md text-sm cursor-pointer"
            >
              Book Now
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-[#ab8a62]" />
              ) : (
                <Menu className="w-6 h-6 text-[#ab8a62]" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center justify-between w-full ml-10">
            <ul className="flex space-x-6 text-gray-600 text-lg font-medium">
              {navItems.map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="hover:text-[#ab8a62]">{label}</Link>
                </li>
              ))}
            </ul>

            <div className="flex space-x-3 ml-10">
              <button onClick={() => setShowLoginModal(true)} className="btn-outline cursor-pointer">Sign In</button>
              <button onClick={() => setShowSignupModal(true)} className="btn-outline cursor-pointer">Sign Up</button>
              <button onClick={handleBookNowClick} className="btn-filled cursor-pointer">Book Now</button>
            </div>
          </nav>
        </div>

        {/* Mobile Fullscreen Sidebar */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed top-0 left-0 w-full h-full bg-black text-white z-40 overflow-y-auto">
            <div className="py-12 px-2">
              {/* Close Button */}
              <div className="flex justify-between items-center mb-6">

                <span className="text-xl font-semibold"> Chalt View Hotel</span>
           <span className='bg-white px-2'><img src="/logo.png" alt="Logo" width={40} /></span> 

                <button onClick={() => setMobileMenuOpen(false)}>
                  <X className="w-6 h-6 mr-2 text-white" />
                </button>
              </div>

              {/* Welcome Text */}
              <p className="text-sm mb-6 px-4 text-center">
                Welcome to Chalt View Hotel, where luxury meets comfort in the heart.
              
              </p>

              {/* Navigation Links */}
              <ul className="space-y-8 text-xl">
                {navItems.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-[#ab8a62]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
                <li className="mt-20 border-t my-4 space-y-4 border-white ">
                  <p className="text-xl mt-8 ">📞 03110866930</p>
                  <p className="text-xl">📧 Chaltviewhotel@gmail.com</p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </header>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} onSwitchToSignup={switchToSignup} />
      )}
      {showSignupModal && (
        <SignupModal onClose={() => setShowSignupModal(false)} onSwitchToLogin={switchToLogin} />
      )}
    </>
  )
}

export default Navbar
