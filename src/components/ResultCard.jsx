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
        <div className="w-full max-w-70 sm:w-72 mx-auto">
            <div className="flex flex-col gap-3 transition-all duration-200">
                <img
                    src={item.thumbnail}
                    onClick={handleImageClick}
                    className="w-full h-52 sm:h-64 object-cover rounded-2xl hover:scale-105 cursor-pointer transition-transform"
                />
                <div className="flex flex-row items-center justify-between gap-3">
                    <h1 className="text-sm sm:text-lg text-white font-medium truncate flex-1">
                        {item.title}
                    </h1>

                    <button
                        onClick={AddingFav}
                        className="text-white hover:scale-110 cursor-pointer active:scale-90 transition-transform shrink-0"
                        title="Add To Collection"
                    >
                        <Bookmark fill={isSaved ? 'white' : 'none'} />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ResultCard