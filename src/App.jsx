import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Mainpage from './Pages/Mainpage'
import Header from './components/Header'
import Collection from './Pages/Collectionpage'
import DetailModal from './components/DetailModal'

const App = () => {
  return (
    <div>
      <Header />
      <DetailModal />
      <Routes>
        <Route path='/' element={<Mainpage />} />
        <Route path='/collection' element={<Collection/>} />
      </Routes>

    </div>
  )
}

export default App