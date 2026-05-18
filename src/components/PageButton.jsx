import { useState } from 'react'
import "./style/button.css"
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../redux/features/page'

const PageButton = () => {
    const dispatch = useDispatch()
    const page = useSelector((state) => state.page.page)
    const [pagenumber, setpagenumber] = useState(page)
    const nextPage = () => {
        dispatch(setPage(page + 1))
        console.log(page);
    }
    const prevpage = () => {
        if (page>1){
            dispatch(setPage(page - 1))
        }
    }
    const valuepage = () =>{
        dispatch(setPage(pagenumber))
    }
    return (
        <div className='flex flex-row gap-4 justify-center items-center m-4' >
            <button className='btn' disabled={page === 1} onClick={prevpage}>Prev</button>
            <input placeholder='Page...' className='text-white rounded-2xl p-3'
            value={pagenumber} onChange={(e) =>{
               setpagenumber(e.target.value)
            }}>
            </input><button className="btn" onClick={valuepage}>Jump</button>
            <button className='btn' onClick={nextPage}>Next</button>
        </div>
    )
}

export default PageButton
