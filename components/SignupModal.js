'use client'
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { signIn } from "next-auth/react" // 🔥 this is what was missing

const SignupModal = ({ onClose, onSwitchToLogin }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSignup = async () => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      // Automatically log them in or redirect
      alert('Account created! Now you can log in.')
      onSwitchToLogin() // optional
    } else {
      alert(data.message)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name || !email || !password) {
      setError('Please fill out all fields.')
      return
    }

    setError('')
    alert('Registering...')
    onClose()
  }

  const isFormValid = name.trim() && email.trim() && password.trim()

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.4)] flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-9 px-10 w-full max-w-md shadow-lg relative space-y-6">

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 text-xl hover:text-black">
          &times;
        </button>

        {/* Heading */}
        <h2 className="text-black text-2xl font-serif text-center mt-2">
          Create A Free Account
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 mt-4">

          {/* Name */}
          <div>
            <h3 className="text-black mb-1">Your Name</h3>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Candidate"
              className="px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-[#ab8a62] focus:ring-2"
            />
          </div>

          {/* Email */}
          <div>
            <h3 className="text-black mb-1">Your Email</h3>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              className="px-4 py-2 w-full rounded-md border border-gray-300 focus:outline-none focus:border-[#ab8a62] focus:ring-2"
            />
          </div>

          {/* Password */}
          <div>
            <h3 className="text-black mb-1">Password</h3>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-2 rounded-md border border-gray-300 mt-3 w-full focus:outline-none focus:border-[#ab8a62] focus:ring-2"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-600 hover:text-black"
              >
                {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-500">{error}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`px-4 py-2 w-full mt-4 rounded-md transition font-medium ${
              isFormValid
                ? 'bg-[#ab8a62] text-white hover:bg-[#96764f]'
                : 'bg-white text-gray-500 border border-gray-300 cursor-not-allowed'
            }`}
            disabled={!isFormValid}
          >
            Register
          </button>

        </form>

        <div className="flex items-center my-4">
          <hr className='border-gray-400 flex-grow' />
          <span className='text-gray-600 px-3'>Or</span>
          <hr className='border-gray-400 flex-grow' />
        </div>

        {/* Social Login Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => signIn('google')}
            className="flex items-center justify-center w-full py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            <img src="/google.svg" alt="Google" className="w-5 h-5 mr-2" />
            Continue with Google
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <span
              className="text-blue-600 hover:underline cursor-pointer"
              onClick={onSwitchToLogin}
            >
              Login
            </span>
          </p>
        </div>

      </div>
    </div>
  )
}

export default SignupModal
