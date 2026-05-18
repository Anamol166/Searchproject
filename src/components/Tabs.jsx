import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTabs } from '../redux/features/searchslice'

const Tabs = () => {
    const dispatch = useDispatch()
    const selectedtab = useSelector((state) => state.search.actionTab)

    const tabs = ['Photos', 'Videos', 'GIF']
    return (
        <div className='flex flex-wrap my-4 items-center justify-center gap-2 sm:gap-4 w-full px-2'>
            {tabs.map((elem, index) => {
                return (
                    <button
                        key={index}
                        className={`${elem === selectedtab ? 'bg-blue-500' : 'bg-[#596064]'} text-xs sm:text-lg px-3 py-2 rounded-2xl hover:-translate-y-0.5 transition-all active:scale-90 cursor-pointer`}
                        onClick={() => dispatch(setActiveTabs(elem))}
                    >
                        {elem}
                    </button>
                )
            })}
        </div>
    )
}

export default Tabs