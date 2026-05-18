import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setQuery } from '../redux/features/searchslice'

const SearchCollection = () => {
    const [search, setsearch] = useState("")
    const dispatch = useDispatch()

    return (
        <div className="w-full flex justify-center px-2 sm:px-4 mt-3">
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    dispatch(setQuery(search))
                }}
                className="w-full max-w-md flex flex-row gap-2 sm:gap-3"
            >

                <input
                    type="text"
                    placeholder="Search your saved..."
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                    className="flex-1 min-w-0 text-sm sm:text-base border border-gray-400 bg-transparent text-white px-3 py-2 rounded-xl outline-none focus:border-blue-500"
                />

                <button
                    type="submit"
                    className={`shrink-0 cursor-pointer text-xs sm:text-sm px-3 py-2 rounded-xl transition active:scale-95 hover:-translate-y-0.5 ${
                        search.trim().length > 0
                            ? 'bg-blue-500 text-white'
                            : 'bg-[#596064] text-white'
                    }`}
                >
                    Search
                </button>
            </form>
        </div>
    )
}

export default SearchCollection