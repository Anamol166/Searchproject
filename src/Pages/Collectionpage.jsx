import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CollectionGrid from '../components/CollectionGrid'
import AlbumsView from '../components/AlbumsView'
import SearchCollection from '../components/SearchCollection'

const Collectionpage = () => {
    const collection = useSelector(state => state.collection.items)
    const query = useSelector(state => state.search.query)
    const [view, setView] = useState('collection')

    const filtered = collection.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    )

    const isEmpty = filtered.length === 0

    return (
        <div className="min-h-screen flex flex-col bg-[#0b0f19]">

            <SearchCollection />

            <div className="flex gap-4 justify-center p-4">
                <button
                    onClick={() => setView('collection')}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                        view === 'collection'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                >
                    Collection ({collection.length})
                </button>

                <button
                    onClick={() => setView('albums')}
                    className={`px-6 py-2 rounded-lg font-semibold transition ${
                        view === 'albums'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                >
                    Albums
                </button>
            </div>

            <div className="flex-1">
                {view === 'collection' ? (
                    isEmpty ? (
                        <div className="flex items-center justify-center min-h-[50vh]">
                            <p className="text-slate-500 text-sm text-center">
                                No collection yet. Add images to build your collection.
                            </p>
                        </div>
                    ) : (
                        <CollectionGrid items={filtered} />
                    )
                ) : (
                    <AlbumsView />
                )}
            </div>

        </div>
    )
}

export default Collectionpage