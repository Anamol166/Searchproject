import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeDetail, setSelectedItem } from '../redux/features/detailslide'
import { setCollection, removeCollection } from '../redux/features/collectionslide'
import { getRecommendations } from '../utils/recommendationEngine'
import { X, Bookmark } from 'lucide-react'
import AlbumModal from './AlbumModal'
import toast from 'react-hot-toast'

const DetailModal = () => {
    const dispatch = useDispatch()
    const [showAlbumModal, setShowAlbumModal] = useState(false)

    const selectedItem = useSelector(state => state.details.selectedItem)
    const isOpen = useSelector(state => state.details.isOpen)
    const collection = useSelector(state => state.collection.items)
    const allItems = useSelector(state => state.search.results) || []

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : 'auto'
        return () => (document.body.style.overflow = 'auto')
    }, [isOpen])

    if (!isOpen || !selectedItem) return null

    const isSaved = collection.some(i => i.id === selectedItem.id)

    const recommendations = getRecommendations(
        selectedItem,
        allItems.length > 0 ? allItems : collection,
        8
    )

    const handleSave = () => {
        if (isSaved) {
            dispatch(removeCollection(selectedItem.id))
            toast.error("Removed from collection")
        } else {
            dispatch(setCollection(selectedItem))
            toast.success("Added to collection")
        }
    }

    const handleClickRec = (item) => {
        dispatch(setSelectedItem(item))
    }

    return (
        <div className="fixed inset-0 bg-[#0b0f19]/90 overflow-y-auto z-50">

            <button
                onClick={() => dispatch(closeDetail())}
                className="fixed top-4 right-4 text-gray-300 p-2 rounded-full hover:bg-slate-800 hover:text-white z-50"
            >
                <X size={24} />
            </button>

            <div className="min-h-screen flex items-center justify-center p-4">

                <div className="bg-[#121826] w-full max-w-6xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">

                    <div className="bg-[#161f30] p-4 sm:p-6">

                        <img
                            src={selectedItem.thumbnail}
                            className="w-full max-h-[60vh] object-contain rounded-xl"
                        />

                        <h1 className="text-white text-xl sm:text-2xl font-bold mt-4">
                            {selectedItem.title}
                        </h1>

                        <div className="flex gap-3 mt-4">
                            <button
                                onClick={handleSave}
                                className={`px-5 py-2 rounded-xl flex items-center gap-2 text-white ${
                                    isSaved ? 'bg-rose-600' : 'bg-blue-600'
                                }`}
                            >
                                <Bookmark size={18} fill={isSaved ? "white" : "none"} />
                                {isSaved ? "Saved" : "Save"}
                            </button>

                            <button 
                                onClick={() => setShowAlbumModal(true)}
                                className="px-5 py-2 rounded-xl bg-[#1e293b] text-slate-200 hover:bg-[#334155] transition"
                            >
                                Add to Album
                            </button>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-white text-lg font-semibold mb-4">
                                Similar Images
                            </h2>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {recommendations.map(item => (
                                    <div
                                        key={item.id}
                                        onClick={() => handleClickRec(item)}
                                        className="cursor-pointer group"
                                    >
                                        <img
                                            src={item.thumbnail}
                                            className="w-full h-28 object-cover rounded-lg group-hover:scale-105 transition"
                                        />
                                        <p className="text-xs text-slate-300 mt-2 group-hover:text-blue-400">
                                            {item.title}
                                        </p>
                                    </div>
                                ))}
                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <AlbumModal 
                item={selectedItem}
                isOpen={showAlbumModal}
                onClose={() => setShowAlbumModal(false)}
            />
        </div>
    )
}

export default DetailModal