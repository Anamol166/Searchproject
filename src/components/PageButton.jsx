import { useState, useEffect } from 'react'
import "./style/button.css"
import { useDispatch, useSelector } from 'react-redux'
import { setPage } from '../redux/features/page'

const PageButton = () => {
    const dispatch = useDispatch()
    const page = useSelector((state) => state.page.page)
    const [pagenumber, setpagenumber] = useState(page)
    useEffect(() => {
        setpagenumber(page)
    }, [page])
    const nextPage = () => {
        dispatch(setPage(page + 1))
    }
    const prevpage = () => {
        if (page > 1) {
            dispatch(setPage(page - 1))
        }
    }
    const valuepage = () => {
        const num = Number(pagenumber)
        if (!isNaN(num) && num > 0) {
            dispatch(setPage(num))
        }
    }
    return (
        <div className="flex flex-wrap gap-2 justify-center items-center px-2 py-3 w-full">
            
            <button
                className="btn text-xs sm:text-sm"
                disabled={page === 1}
                onClick={prevpage}
            >
                Prev
            </button>
            <input
                placeholder="Page..."
                className="text-white rounded-2xl p-2 sm:p-3 w-16 sm:w-24 text-center outline-none"
                value={pagenumber}
                onChange={(e) => setpagenumber(e.target.value)}
            />
            <button
                className="btn text-xs sm:text-sm"
                onClick={valuepage}
            >
                Jump
            </button>

            <button
                className="btn text-xs sm:text-sm"
                onClick={nextPage}
            >
                Next
            </button>

        </div>
    )
}

export default PageButton