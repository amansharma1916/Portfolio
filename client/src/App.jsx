import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx'
import LandingPage from './components/landing/LandingPage.jsx'
function App() {

  return (
    <>
     <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
            <LandingPage />
          </>
        } />
      </Routes>
      
     </div>
    </>
  )
}

export default App
