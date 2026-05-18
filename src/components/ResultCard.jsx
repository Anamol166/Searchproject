import React, { useEffect } from 'react'
import { Bookmark } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setCollection, removeCollection } from '../redux/features/collectionslide';
import { setSelectedItem } from '../redux/features/detailslide';
import toast from "react-hot-toast";

const ResultCard = ({ item }) => {
    const dispatch = useDispatch()
    const collection = useSelector((state) => state.collection.items)
    const isSaved = collection.some((i) => i.id === item.id)

    const AddingFav = () => {
        if (isSaved) {
            dispatch(removeCollection(item.id))
            toast.error("Removed from collection")
        } else {
            dispatch(setCollection(item))
            toast.success("Added to collection")
        }
    }

    const handleImageClick = () => {
        dispatch(setSelectedItem(item))
    }

    return (
        <div className="w-72">
            <div className="flex flex-col gap-3 transition-all duration-200">
                <img
                    src={item.thumbnail}
                    onClick={handleImageClick}
                    className="w-full h-64 object-cover rounded-2xl hover:scale-105 cursor-pointer"
                />
                <div className="flex flex-row gap-5 justify-between">
                    <h1 className="text-lg text-white font-medium truncate text-center ">
                        {item.title}
                    </h1>
                    <p className='text-white hover:scale-120 cursor-pointer' title='Add To Collection'>
                        <Bookmark
                            fill={isSaved ? 'white' : 'none'}
                            onClick={AddingFav} /></p>
                </div>
            </div>
        </div>
    )
}

export default ResultCard