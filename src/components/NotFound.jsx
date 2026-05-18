const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#181a1b] flex flex-col items-center justify-center px-4 text-center">

      <h1 className="text-7xl md:text-9xl font-bold text-white">
        404
      </h1>

      <p className="text-slate-400 text-lg md:text-xl mt-4">
        Page not found
      </p>

      <p className="text-slate-500 text-sm mt-2 max-w-md">
        The page you are looking for does not exist or may have been moved.
      </p>

      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-xl text-white font-medium"
      >
        Go Home
      </a>

    </div>
  )
}

export default NotFound