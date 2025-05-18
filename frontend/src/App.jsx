import React from 'react'
import { Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Score from './pages/Score';
import ConfirmationPage from './pages/ConfirmationPage';
const App = () => {
  return (
    <>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assessment" element={<Assessment />} />
        <Route path="/score" element={<Score />} />
        <Route path='/confirmation' element={<ConfirmationPage></ConfirmationPage>}></Route>
      </Routes>
    </>
  )
}

export default App
