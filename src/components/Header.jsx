import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { setQuery } from '../redux/features/searchslice'

const Header = () => {
  const dispatch = useDispatch()
  return (
    <div className="bg-[#121828] w-full h-16 flex items-center justify-between px-6 border-2 border-[#090c12]">

      <Link
        to="/"
        className="text-white text-2xl font-semibold cursor-pointer"
        onClick={()=> dispatch(setQuery(''))}
      >
        MediaVault
      </Link>

      <Link
        to="/collection"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg transition"
      >
        Collection
      </Link>

    </div>
  )
}

export default Header