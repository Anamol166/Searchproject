import React from 'react'
import Searchbar from './components/Searchbar'
import Tabs from './components/Tabs'
import ResultGrid from './components/ResultGrid'
import PageButton from './components/PageButton'

const App = () => {
  return (
    <div>
      <Searchbar/>
      <Tabs/>
      <ResultGrid/>
      <PageButton/>
    </div>
  )
}

export default App
