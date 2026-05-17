import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from '../redux/features/searchslice'

const Searchbar = () => {
  const [search, setsearch] = useState('')
  const usedispatch = useDispatch()
  const query = useSelector((state) => state.search.query)
  return (
    <>
      <div className='h-full flex justify-center items-center'>

        <form
          className='flex flex-row gap-3'
          onSubmit={(e) => {
            e.preventDefault()
            usedispatch(setQuery(search))
          }}
        >

          <input
            type="text"
            placeholder="Search anything..."
            value={search}
            className='text-3xl border border-gray-400 p-3 rounded-2xl text-white'
            onChange={(e) => {
              setsearch(e.target.value)
            }}
          />

          <button className='text-3xl bg-[#596064] active:bg-blue-500 p-3 rounded-2xl active:scale-90 transition-all cursor-pointer'>
            Search
          </button>

        </form>

      </div>
    </>
  )
}

export default Searchbar;
