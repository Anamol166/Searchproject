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

    return (
        <div className="w-full min-h-screen flex flex-col bg-[#2c4559] px-3 sm:px-6 lg:px-10 py-4 gap-4">
            <SearchCollection />
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button
                    onClick={() => setView('collection')}
                    className={`w-full sm:w-auto px-5 py-2 rounded-lg font-semibold transition ${view === 'collection'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                >
                    Collection ({collection.length})
                </button>
                <button
                    onClick={() => setView('albums')}
                    className={`w-full sm:w-auto px-5 py-2 rounded-lg font-semibold transition ${view === 'albums'
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                >
                    Albums
                </button>
            </div>
            <div className="flex-1 w-full">
                {view === 'collection' ? (
                    <CollectionGrid items={filtered} />
                ) : (
                    <AlbumsView />
                )}
            </div>
        </div>
    )
}

export default Collectionpage