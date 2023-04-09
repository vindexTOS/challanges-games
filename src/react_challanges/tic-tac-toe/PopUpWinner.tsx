import React from 'react'
import terminator from '../../assets/tictac/terminator.jpg'
import humans from '../../assets/tictac/humanswon.jpg'
import { useContextMain } from '../context'
const PopUpWinner = () => {
  const { winner, ResetTicTac } = useContextMain()
  const check =
    winner === 'Humanity Won'
      ? humans
      : winner === 'Skyenet Won'
      ? terminator
      : humans
  return (
    <div className="absolute">
      <h1 className="text-[3rem] text-red-600 absolute left-[15%] ">
        {winner}
      </h1>
      <img className="rounded-[30px] w-[700px]" src={check} />
      <button
        onClick={ResetTicTac}
        className="text-[2rem] text-white absolute bottom-2 left-[35%] hover:text-red-600"
      >
        Restart
      </button>
    </div>
  )
}

export default PopUpWinner
