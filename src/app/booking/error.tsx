"use client" ;
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ErrorPage() {

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center text-center text-white">
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-bold mb-4">Oops!</h1>
        <p className="text-2xl mb-8">
            We can't seem to find the page you're looking for.
            <br />
            <br />
            For any issues, please contact the team at <Link href={`mailto:${process.env.CONTACT_EMAIL}`} className="text-accent-700 underline">{process.env.CONTACT_EMAIL}</Link> 📧 or at <Link href={`tel:${process.env.CONTACT_NUMBER}`} className="text-accent-700 underline">{process.env.CONTACT_NUMBER}</Link> 📞
        </p>
        
        <Link 
          className="bg-white text-purple-500 px-6 py-2 rounded font-bold text-xl hover:bg-gray-100 transition-colors duration-200"
          href="/"
        >
          Go Home
        </Link>

        <div className='mt-10'>
              <br /> <br />
              <Link href="/booking" className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-indigo-700">
                  Try Again <span className='text-xl'>🔄 </span>
              </Link>
              <br /> <br />
              <Link href={`tel:${process.env.CONTACT_NUMBER}`} className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-indigo-700">
                  Call the Clinic <span className='text-xl'>📞 </span>
              </Link>
          </div>
      </motion.div>
    </div>
  );
}