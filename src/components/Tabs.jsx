import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveTabs } from '../redux/features/searchslice'

const Tabs = () => {
    const dispatch = useDispatch()
    const selectedtab = useSelector((state) => state.search.actionTab)

    const tabs = ['Photos', 'Videos', 'GIF']
    return (
        <div className='flex my-4 items-center justify-center flex-row gap-4 w-full'>
            {tabs.map(function (elem, index) {
                <div className=""></div>
                return <button
                    className={`${elem == selectedtab ? 'bg-blue-500' : 'bg-[#596064]'} transition-all active:scale-90 cursor-pointer rounded-2xl p-3 text-3xl`}
                    onClick={() => {
                        dispatch(setActiveTabs(elem))
                    }}
                    key={index}
                >{elem}
                </button>
            })}
        </div>
    )
}

export default Tabs
