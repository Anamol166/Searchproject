import { useSelector } from 'react-redux'
import ResultCard from './ResultCard'

const CollectionGrid = ({ items }) => {
    const storeItems = useSelector((state) => state.collection.items)
    const displayItems = items !== undefined ? items : storeItems
    
    return (
        <div className='flex flex-row gap-4 flex-wrap justify-center items-center overflow-auto p-5'>
            {displayItems.map((item, index) => {
                return (
                    <div key={index}>
                        <ResultCard item={item} />
                    </div>
                )
            })}
        </div>
    )
}

export default CollectionGrid
