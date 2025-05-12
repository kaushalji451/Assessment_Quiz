import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import Assessment from './Assessment';
const App = () => {
  return (
    <>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assessment" element={<Assessment />} />
      </Routes>
    </>
  )
}

export default App
