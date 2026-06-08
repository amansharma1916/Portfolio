import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/navbar/Navbar.jsx'
function App() {

  return (
    <>
     <div className="app">
      <Routes>
        <Route path="/" element={
          <>
            <Navbar />
          </>
        } />
      </Routes>
      
     </div>
    </>
  )
}

export default App
