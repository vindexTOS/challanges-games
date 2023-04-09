import React from 'react'
import { useContextMain } from '../context'
import Grid from './Grid'
const TicTacToe = () => {
  const {
    ticTacToeGrid,
    counter,
    setCounter,
    ResetTicTac,
    playerTool,
    setPlayerTool,
  } = useContextMain()

  const style = {
    section: `w-[100vw] h-[100vh] ticTacBackground items-center justify-center flex flex-col gap-6`,
    btnWrapper: `text-[5rem] gap-6 flex`,
    startResetDiv: `flex gap-5 items-center  justify-center `,
    start: `    w-[14rem]  bg-black  text-[1.6rem] px-7 py-4  rounded-[15px] hover:bg-gray-900  ${
      playerTool === ''
        ? ' text-gray-600 hover:bg-black  outline   outline-gray-600'
        : 'text-red-600   outline   outline-red-600 '
    }`,
    reset: ` text-red-600 w-[14rem] text-center flex items-center justify-center   outline   outline-red-600  bg-black  text-[1.6rem] px-7 py-4 rounded-[15px]  hover:bg-gray-900   `,
    weapone: `bg-black   w-[14rem]  px-10 w-[10rem] rounded-[12px] hover:bg-gray-900`,
    headerDiV: `flex flex-col items-center justify-center gap-5`,
    header: `text-red-600 bg-black px-10 py-4 text-[1rem]   rounded-[20px]  w-[29rem] outline outline-blue-500 text-center`,
  }

  return (
    <section className={style.section}>
      <div className={style.headerDiV}>
        <h1 className={style.header}>
          PICK AS SIGN FOR A FIGHT AGAINTS SKYNET
        </h1>
        <div className={style.btnWrapper}>
          <button
            className={`${style.weapone} text-red-600 ${
              playerTool === 'X' &&
              'outline outline-4 outline-orange-600 bg-gray-900'
            } `}
            onClick={() => setPlayerTool('X')}
          >
            X
          </button>
          <button
            className={`${style.weapone}  text-blue-500 ${
              playerTool === 'O' &&
              'outline outline-4 outline-orange-600 bg-gray-900'
            } `}
            onClick={() => setPlayerTool('O')}
          >
            O
          </button>
        </div>
      </div>
      <div className={style.startResetDiv}>
        <button
          title="Pick side to start"
          disabled={counter >= 0}
          className={`${style.start}   text-red-600 `}
          onClick={() => setCounter(counter + 1)}
        >
          START
        </button>
        <button onClick={ResetTicTac} className={style.reset}>
          RESTART
        </button>
      </div>
      <div className="flex gap-2">
        {ticTacToeGrid.map((val: any, gridIndex: number) => (
          <Grid key={gridIndex} val={val} gridIndex={gridIndex} />
        ))}
      </div>
    </section>
  )
}

export default TicTacToe
