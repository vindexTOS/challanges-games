import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import ToDo from './react_challanges/todo/ToDo'
import TicTacToe from './react_challanges/tic-tac-toe/TicTacToe'
import Pokemon from './react_challanges/pokemon/Pokemon'
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/to-do-list" element={<ToDo />} />
      <Route path="/tic-tac-toe" element={<TicTacToe />} />
      <Route path="/pokemon" element={<Pokemon />} />
    </Routes>
  )
}

export default App
