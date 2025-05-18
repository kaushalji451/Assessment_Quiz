import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Score from './pages/Score';
const App = () => {
  return (
    <>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/score" element={<Score />} />
      </Routes>
    </>
  )
}

export default App
