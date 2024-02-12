import Link from 'next/link'

export default async function SuccessPage() {
  return (
      <div className="pt-8 sm:pt-16 pb-4 sm:pb-16 dark:bg-gray-800 flex flex-col items-center text-center container">
          <h1 className="text-3xl font-bold tracking-tight text-accent-700 sm:text-5xl dark:text-white">
              Thanks for booking! 🎉🥳👏
          </h1>
          <p className="mt-2 sm:mt-6 sm:text-xl text-gray-800 font-medium dark:text-gray-200">
              <br />
              The appointment has been added to my calendar! 📅👍 If there are any problems, the team will contact you as soon as possible. 🚀
              <br />
              <br />
              For any other questions or concerns, feel free to contact the team at <Link href={`mailto:${process.env.CONTACT_EMAIL}`} className="text-accent-700 underline">{process.env.CONTACT_EMAIL}</Link> 📧 or at <Link href={`tel:${process.env.CONTACT_NUMBER}`} className="text-accent-700 underline">{process.env.CONTACT_NUMBER}</Link> 📞
          </p>
          <div className="mt-10">
            <br /> <br />
                <span className="text-6xl">🎉 ✅ 🎉</span>
            </div>
            <div className='mt-10'>
                <br /> <br />
                <Link href="/" className="px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-indigo-700">
                    Go Back Home <span className='text-xl'>🏠 </span>
                </Link>
            </div>
      </div>
  )
}