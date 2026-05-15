import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setQuery } from '../redux/features/searchslice'
import { GIF_sender, Photo_sender, Video_sender } from '../api/media'

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
            console.log(query)
            setsearch('')
          }}
        >

          <input
            type="text"
            placeholder="Search anything..."
            value={search}
            className='text-3xl border border-gray-400 p-3 rounded-2xl'
            onChange={(e) => {
              setsearch(e.target.value)
            }}
          />

          <button className='text-3xl bg-gray-400 hover:bg-gray-300 p-3 rounded-2xl active:scale-90'>
            Search
          </button>

        </form>

      </div>
    </>
  )
}

export default Searchbar;
