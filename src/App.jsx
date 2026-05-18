import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Mainpage from './Pages/Mainpage'
import Header from './components/Header'
import Collection from './Pages/Collectionpage'
const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Mainpage />} />
        <Route path='/collection' element={<Collection/>} />
      </Routes>

    </div>
  )
}

export default App