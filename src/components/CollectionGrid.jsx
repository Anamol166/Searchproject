import { useSelector } from 'react-redux'
import ResultCard from './ResultCard'

const CollectionGrid = ({ items }) => {
    const storeItems = useSelector((state) => state.collection.items)
    const displayItems = items !== undefined && Array.isArray(items) ? items : (storeItems || [])
    
    const validItems = displayItems.filter(item => item && item.id && item.thumbnail && item.title)
    
    if (validItems.length === 0) {
        return (
            <div className='flex flex-row gap-4 flex-wrap justify-center items-center overflow-auto p-5'>
                <p className="text-white text-center w-full">No items to display</p>
            </div>
        )
    }
    
    return (
        <div className='flex flex-row gap-4 flex-wrap justify-center items-center overflow-auto p-5'>
            {validItems.map((item, index) => {
                return (
                    <div key={`${item.id}-${index}`}>
                        <ResultCard item={item} />
                    </div>
                )
            })}
        </div>
    )
}

export default CollectionGrid