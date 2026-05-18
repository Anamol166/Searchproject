import Searchbar from '../components/Searchbar'
import Tabs from '../components/Tabs'
import ResultGrid from '../components/ResultGrid'
import PageButton from '../components/PageButton'

const Mainpage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-[#0b0f19]">
            <Searchbar />
            <Tabs />
            <div className="flex-1">
                <ResultGrid />
            </div>
            <PageButton />

        </div>
    )
}

export default Mainpage