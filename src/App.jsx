import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Mainpage from './Pages/Mainpage'
import Header from './components/Header'
import Collection from './Pages/Collectionpage'
import DetailModal from './components/DetailModal'
import Footer from './components/Footer'
import NotFound from './components/NotFound'
const App = () => {
  return (
    <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-[#2c4559] text-white">
      <div className="sticky top-0 z-50 w-full bg-[#2c4559] border-b border-slate-800">
        <Header />
      </div>
      <DetailModal />
      <main className="flex-1 w-full overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App