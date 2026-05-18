import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../redux/features/searchslice'

const SearchCollection = () => {

    const [search, setsearch] = useState("")
    const dispatch = useDispatch()

    return (
        <div className='h-full flex justify-center items-center mt-3'>

            <form
                className='flex flex-row gap-3'
                onSubmit={(e) => {
                    e.preventDefault()
                    dispatch(setQuery(search))
                }}
            >

                <input
                    type="text"
                    placeholder="Search your saved..."
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                    className='text-lg border border-gray-400 p-2 rounded-2xl text-white outline-none w-100'
                />

                <button
                    type="submit"
                    className={`${search.trim().length > 0 ? 'bg-blue-500' : 'bg-[#596064]'} text-lg bg-[#596064] p-2 hover:-translate-y-0.5 rounded-2xl active:scale-90 transition-all cursor-pointer`}>
                    Search
                </button>

            </form>

        </div>
    )
}

export default SearchCollection