export default function Template() {
  return (
    <div className="pt-8 sm:pt-16 pb-4 sm:pb-16 dark:bg-gray-800 flex flex-col items-center justify-start text-center">
      <h1 className="text-3xl font-bold tracking-tight text-accent-700 sm:text-5xl dark:text-white">
        Let's find some time!
      </h1>
      <p className="mt-2 sm:mt-6 sm:text-xl text-gray-800 font-medium dark:text-gray-200">
        My latest availability is below. Choose a date and time that works for
        you and we'll get something on the books.
      </p>
    </div>
  )
}