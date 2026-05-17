import React from 'react'

const ResultCard = (props) => {
    console.log(props);

    return (
        <div className=' h-110 w-110'>
            <div className="flex flex-col justify-center items-center gap-2 hover:scale-105 transition-all">
                <img
                    src={props.item.thumbnail}
                    className='w-110 h-90 object-cover flex  justify-center rounded-2xl cursor-pointer '
                />
                <h1
                    className="text-3xl text-white font-medium truncate w-full text-center"
                >
                    {props.item.title}
                </h1>
            </div>
        </div>
    )
}

export default ResultCard
