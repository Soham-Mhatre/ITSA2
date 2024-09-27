import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import OnePieceMap from './OnePieceMap'
import Route1 from './routes/Route1'
import Route2 from './routes/Route2'
import Route3 from './routes/Route3'
import Route4 from './routes/Route4'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content-wrapper">
          <header>
            <h1 className="text-4xl font-bold text-yellow-400 text-center font-pirate">One Piece Grand Line Map</h1>
          </header>
          <main className="container mx-auto px-4">
            <Routes>
              <Route path="/" element={<OnePieceMap />} />
              <Route path="/route1" element={<Route1 />} />
              <Route path="/route2" element={<Route2 />} />
              <Route path="/route3" element={<Route3 />} />
              <Route path="/route4" element={<Route4 />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  )
}

export default App