import React from 'react'
import { Link } from 'react-router-dom'
const HomePage = () => {
  return (
    <div>
      <Link to="/to-do-list">TODO</Link>
      <Link to="/tic-tac-toe">tic tac toe</Link>
      <Link to="/pokemon">pokemon</Link>
      <Link to="/lottory">LOTO</Link>
    </div>
  )
}

export default HomePage
