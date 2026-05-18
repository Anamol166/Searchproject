import React from 'react'
import { useSelector } from 'react-redux'
import CollectionGrid from '../components/CollectionGrid'
import SearchCollection from '../components/SearchCollection'

const Collectionpage = () => {
    const collection = useSelector(state => state.collection.items)
    const query = useSelector(state => state.search.query)

    const filtered = collection.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
    )

    return (
        <div>
            <SearchCollection />
            <CollectionGrid items={filtered} />
        </div>
    )
}

export default Collectionpage