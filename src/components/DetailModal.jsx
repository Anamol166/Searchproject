import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { closeDetail, setSelectedItem } from '../redux/features/detailslide'
import { setCollection, removeCollection } from '../redux/features/collectionslide'
import { getRecommendations } from '../utils/recommendationEngine'
import { X, Bookmark, Download, Maximize2, Minimize2 } from 'lucide-react'
import AlbumModal from './AlbumModal'
import toast from 'react-hot-toast'

const DetailModal = () => {
    const dispatch = useDispatch()
    const [showAlbumModal, setShowAlbumModal] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)

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
    const isVideo = selectedItem.type === 'video'

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

    const handleDownload = async () => {
        try {
            const response = await fetch(selectedItem.src || selectedItem.thumbnail)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `${selectedItem.title || 'media'}.${isVideo ? 'mp4' : 'jpg'}`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
            toast.success('Download started!')
        } catch (error) {
            console.error('Download error:', error)
            toast.error('Download failed!')
        }
    }

    const handleClickRec = (item) => {
        dispatch(setSelectedItem(item))
    }

    const mediaContent = (
        <>
            {isVideo && selectedItem.src ? (
                <video
                    src={selectedItem.src}
                    controls
                    className="w-full max-h-[60vh] object-contain rounded-xl"
                />
            ) : (
                <img
                    src={selectedItem.thumbnail || selectedItem.src}
                    alt={selectedItem.title}
                    className="w-full max-h-[60vh] object-contain rounded-xl"
                />
            )}
        </>
    )

    return (
        <>
            {isFullscreen && (
                <div className="fixed inset-0 bg-black z-9999 flex items-center justify-center">

                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/20 z-10000"
                    >
                        <Minimize2 size={24} />
                    </button>

                    <div className="w-screen h-screen flex items-center justify-center">
                        {isVideo && selectedItem.src ? (
                            <video
                                src={selectedItem.src}
                                controls
                                className="w-screen h-screen object-contain"
                            />
                        ) : (
                            <img
                                src={selectedItem.thumbnail || selectedItem.src}
                                alt={selectedItem.title}
                                className="w-screen h-screen object-contain"
                            />
                        )}
                    </div>
                </div>
            )}
            <div className="fixed inset-0 bg-[#0b0f19]/90 overflow-y-auto z-50">

                <button
                    onClick={() => dispatch(closeDetail())}
                    className="fixed top-4 right-4 z-60 text-gray-300 p-2 rounded-full bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800 hover:text-white transition-colors"
                >
                    <X size={24} />
                </button>

                <div className="min-h-screen flex items-center justify-center p-4">

                    <div className="bg-[#121826] w-full max-w-6xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">

                        <div className="bg-[#161f30] p-4 sm:p-6">

                            <div className="relative group">
                                {mediaContent}
                                <button
                                    onClick={() => setIsFullscreen(true)}
                                    className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition"
                                >
                                    <Maximize2 size={20} />
                                </button>
                            </div>

                            <h1 className="text-white text-xl sm:text-2xl font-bold mt-4">
                                {selectedItem.title}
                            </h1>

                            <div className="flex gap-3 mt-4 flex-wrap">
                                <button
                                    onClick={handleSave}
                                    className={`px-5 py-2 rounded-xl flex items-center gap-2 text-white ${isSaved ? 'bg-rose-600  hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-500'
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

                                <button
                                    onClick={handleDownload}
                                    className="px-5 py-2 rounded-xl bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 transition"
                                >
                                    <Download size={18} />
                                    Download
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
                                                alt={item.title}
                                                className="w-full h-28 object-cover rounded-lg group-hover:scale-105 transition"
                                            />
                                            <p className="text-xs text-slate-300 mt-2 group-hover:text-blue-400 truncate">
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
        </>
    )
}

export default DetailModal
