import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToAlbum, createAlbum } from '../redux/features/albumslice'
import { X, Plus, Folder } from 'lucide-react'
import toast from 'react-hot-toast'

const AlbumModal = ({ item, isOpen, onClose }) => {
    const dispatch = useDispatch()
    const albums = useSelector(state => state.albums.albums || [])

    const [newAlbumName, setNewAlbumName] = useState('')
    const [showCreateForm, setShowCreateForm] = useState(false)

    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = 'auto'

        return () => (document.body.style.overflow = 'auto')
    }, [isOpen])

    if (!isOpen || !item) return null

    const createAlbumHandler = () => {
        if (!newAlbumName.trim()) return
        dispatch(createAlbum(newAlbumName))
        toast.success('Album created')
        setNewAlbumName('')
        setShowCreateForm(false)
    }

    const addToAlbum = (albumId) => {
        dispatch(addItemToAlbum({ albumId, item }))
        toast.success('Added to album')
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-6">

            <div className="bg-[#121826] w-full max-w-md rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">

                <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
                    <h2 className="text-white font-semibold flex items-center gap-2">
                        <Folder size={20} />
                        Add to Album
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4">

                    {!showCreateForm ? (
                        <button
                            onClick={() => setShowCreateForm(true)}
                            className="w-full mb-4 border border-dashed border-slate-700 text-slate-300 hover:text-white hover:border-blue-500 rounded-xl py-3 flex items-center justify-center gap-2 transition"
                        >
                            <Plus size={18} />
                            Create new album
                        </button>
                    ) : (
                        <div className="mb-4 bg-[#0f1524] border border-slate-800 rounded-xl p-3">
                            <input
                                value={newAlbumName}
                                onChange={(e) => setNewAlbumName(e.target.value)}
                                placeholder="Album name..."
                                className="w-full bg-slate-900 text-white px-3 py-2 rounded-lg outline-none border border-slate-700 focus:border-blue-500"
                            />

                            <div className="flex gap-2 mt-3">
                                <button
                                    onClick={createAlbumHandler}
                                    className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-lg text-sm"
                                >
                                    Create
                                </button>

                                <button
                                    onClick={() => {
                                        setShowCreateForm(false)
                                        setNewAlbumName('')
                                    }}
                                    className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-2 rounded-lg text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2 max-h-80 overflow-y-auto pr-1">

                        {albums.length === 0 ? (
                            <p className="text-slate-500 text-center text-sm py-6">
                                No albums yet. Create one to start organizing.
                            </p>
                        ) : (
                            albums.map(album => (
                                <button
                                    key={album.id}
                                    onClick={() => addToAlbum(album.id)}
                                    className="w-full bg-[#0f1524] hover:bg-[#161f30] border border-slate-800 rounded-xl px-4 py-3 flex items-center justify-between transition"
                                >
                                    <div className="text-left">
                                        <p className="text-white font-medium">
                                            {album.name}
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            {album.items.length} items
                                        </p>
                                    </div>

                                    <Plus size={16} className="text-slate-400" />
                                </button>
                            ))
                        )}

                    </div>

                </div>

            </div>
        </div>
    )
}

export default AlbumModal