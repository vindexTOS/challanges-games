import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import ToDo from './react_challanges/todo/ToDo'
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/to-do-list" element={<ToDo />} />
    </Routes>
  )
}

export default App
