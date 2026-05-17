import React from 'react'
import { Bookmark } from 'lucide-react';

const ResultCard = ({ item }) => {
    return (
        <div className="w-72">
            <div className="flex flex-col gap-3 transition-all duration-200">
                <img
                    src={item.thumbnail}
                    className="w-full h-64 object-cover rounded-2xl hover:scale-105 cursor-pointer"
                />
                <div className="flex flex-row gap-5 justify-between">
                    <h1 className="text-lg text-white font-medium truncate text-center ">
                        {item.title}
                    </h1>
                    <p className='text-white hover:scale-110'><Bookmark onClick={()=>{
                        console.log(item.id)
                    }}/></p>
                </div>
            </div>
        </div>
    )
}

export default ResultCard
