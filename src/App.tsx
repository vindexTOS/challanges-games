import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/HomePage'
import ToDo from './react_challanges/todo/ToDo'
import TicTacToe from './react_challanges/tic-tac-toe/TicTacToe'
import Pokemon from './react_challanges/pokemon/Pokemon'
import Loto from './react_challanges/lottery/Loto'
import Recursion from './react_challanges/recursion/Recursion'
import Navbar from './components/Navbar'
import { useContextMain } from './react_challanges/context'
import NavShower from './components/NavShower'
function App() {
  const { navBarShow, setNavBarShow } = useContextMain()
  return (
    <>
      {/* {navBarShow ? :} */}
      <NavShower />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/to-do-list" element={<ToDo />} />
        <Route path="/tic-tac-toe" element={<TicTacToe />} />
        <Route path="/pokemon" element={<Pokemon />} />
        <Route path="/lottory" element={<Loto />} />
        <Route path="/recursion" element={<Recursion />} />
      </Routes>
    </>
  )
}

export default App
