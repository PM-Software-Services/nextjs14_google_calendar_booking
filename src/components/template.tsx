"use client" ;
import { motion } from "framer-motion";

export default function Template() {
  return (
    <motion.div 
      className="pt-8 sm:pt-16 pb-4 sm:pb-16 dark:bg-gray-800 flex flex-col items-center justify-start text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-3xl font-bold tracking-tight text-accent-700 sm:text-5xl dark:text-white"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Book a time
      </motion.h1>
      <motion.p 
        className="mt-2 sm:mt-6 sm:text-xl text-gray-800 font-medium dark:text-gray-200"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Below is a calendar to display availabilities. <br />Bookings will only be confirmed following deposit payment.
        <br /> <br />
        Please note: Deposit is <span className="text-red-600 font-bold">NON-REFUNDABLE</span>
      </motion.p>
    </motion.div>
  )
}