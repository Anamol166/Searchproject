import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAlbum, renameAlbum, removeItemFromAlbum } from '../redux/features/albumslice'
import { setSelectedItem } from '../redux/features/detailslide'
import { Trash2, Edit2, X } from 'lucide-react'
import toast from 'react-hot-toast'

const AlbumsView = () => {
    const dispatch = useDispatch()
    const albums = useSelector(state => state.albums.albums || [])

    const [expandedAlbum, setExpandedAlbum] = useState(null)
    const [renamingId, setRenamingId] = useState(null)
    const [newName, setNewName] = useState('')

    const handleRename = (id, name) => {
        setRenamingId(id)
        setNewName(name)
    }

    const saveRename = (id) => {
        if (!newName.trim()) return
        dispatch(renameAlbum({ albumId: id, name: newName }))
        toast.success('Updated')
        setRenamingId(null)
        setNewName('')
    }

    const handleDelete = (id) => {
        dispatch(deleteAlbum(id))
        toast.success('Deleted')
    }

    const removeItem = (albumId, itemId) => {
        dispatch(removeItemFromAlbum({ albumId, itemId }))
        toast.success('Removed')
    }

    const openItem = (item) => {
        dispatch(setSelectedItem(item))
    }

    if (!albums.length) {
        return (
            <div className='flex flex-row gap-4 flex-wrap justify-center items-center overflow-auto p-5'>
                <p className="text-white text-center w-full">
                    No albums yet. Start saving images to create albums.
                </p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#181a1b] px-4 py-6 md:px-10">

            <h1 className="text-white text-2xl md:text-3xl font-bold mb-6">
                Albums
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {albums.map(album => (
                    <div
                        key={album.id}
                        className="bg-[#1f1f1f] border border-[#2a2a2a] rounded-2xl overflow-hidden"
                    >

                        <div className="p-4 flex justify-between items-start">

                            {renamingId === album.id ? (
                                <div className="flex gap-2 w-full">
                                    <input
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        className="flex-1 bg-[#2a2a2a] text-white px-2 py-1 rounded text-sm outline-none"
                                        autoFocus
                                    />
                                    <button
                                        onClick={() => saveRename(album.id)}
                                        className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Save
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <h2 className="text-white font-semibold text-base md:text-lg">
                                            {album.name}
                                        </h2>
                                        <p className="text-xs text-gray-500">
                                            {album.items.length} items
                                        </p>
                                    </div>

                                    <div className="flex gap-2 text-gray-400">
                                        <button onClick={() => handleRename(album.id, album.name)}>
                                            <Edit2 size={16} />
                                        </button>
                                        <button onClick={() => handleDelete(album.id)}>
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </>
                            )}

                        </div>

                        {album.items.length > 0 ? (
                            <>
                                <div className="grid grid-cols-2 gap-2 p-3">

                                    {album.items.slice(0, 4).map((item, i) => (
                                        <div
                                            key={item.id}
                                            className="relative cursor-pointer"
                                            onClick={() => openItem(item)}
                                        >
                                            <img
                                                src={item.thumbnail}
                                                className="w-full h-24 object-cover rounded-lg"
                                            />

                                            {i === 3 && album.items.length > 4 && (
                                                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-sm rounded-lg">
                                                    +{album.items.length - 4}
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                </div>

                                {expandedAlbum === album.id && (
                                    <div className="p-3 border-t border-[#2a2a2a] grid grid-cols-2 gap-2">

                                        {album.items.map(item => (
                                            <div key={item.id} className="relative">

                                                <img
                                                    src={item.thumbnail}
                                                    onClick={() => openItem(item)}
                                                    className="w-full h-24 object-cover rounded-lg"
                                                />

                                                <button
                                                    onClick={() => removeItem(album.id, item.id)}
                                                    className="absolute top-1 right-1 bg-red-600 p-1 rounded"
                                                >
                                                    <X size={14} />
                                                </button>

                                                <p className="text-xs text-gray-500 mt-1 truncate">
                                                    {item.title}
                                                </p>

                                            </div>
                                        ))}

                                    </div>
                                )}

                                <button
                                    onClick={() =>
                                        setExpandedAlbum(expandedAlbum === album.id ? null : album.id)
                                    }
                                    className="w-full py-2 text-sm text-blue-400 border-t border-[#2a2a2a]"
                                >
                                    {expandedAlbum === album.id ? 'Collapse' : 'View All'}
                                </button>
                            </>
                        ) : (
                            <div className="p-6 text-center text-gray-500 text-sm">
                                Empty album
                            </div>
                        )}

                    </div>
                ))}

            </div>
        </div>
    )
}

export default AlbumsView