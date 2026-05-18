import Searchbar from '../components/Searchbar'
import Tabs from '../components/Tabs'
import ResultGrid from '../components/ResultGrid'
import PageButton from '../components/PageButton'

const Mainpage = () => {
    return (
        <div className="w-full flex flex-col bg-[#2c4559] px-2 sm:px-6 lg:px-10 py-3 gap-3 overflow-x-hidden">
            <Searchbar />
            <Tabs />
            <div className="flex-1 w-full">
                <ResultGrid />
            </div>
            <div className="pb-3">
                <PageButton />
            </div>
        </div>
    )
}

export default Mainpage