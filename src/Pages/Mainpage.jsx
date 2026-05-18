import Searchbar from '../components/Searchbar'
import Tabs from '../components/Tabs'
import ResultGrid from '../components/ResultGrid'
import PageButton from '../components/PageButton'

const mainpage = () => {
    return (
        <div>
            <Searchbar />
            <Tabs />
            <ResultGrid />
            <PageButton />
        </div>
    )
}

export default mainpage