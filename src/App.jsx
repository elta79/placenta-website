import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import ThankYou from './pages/ThankYou'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
 
  return (
      <div className="App">
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/gallery' element={<Gallery />} />
            <Route path='/thankyou' element={<ThankYou />} />
          </Routes>
          <Footer />
        </Router>
      </div>
  )
}

export default App
