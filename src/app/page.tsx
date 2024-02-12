import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 container">
      <div className="flex flex-col justify-center items-center">
          <h1 className="mb-4 text-6xl md:text-8xl font-bold text-center">
              Welcome to Our <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Service</span>
          </h1>
          <p className="mb-8 text-xl text-center">We provide the best service for you.</p>
          <Link className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-indigo-700" href="/booking">
            Book Now 
          </Link>
      </div>
    </div>
  )
}