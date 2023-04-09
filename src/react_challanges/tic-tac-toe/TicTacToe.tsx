import React from 'react'
import { useContextMain } from '../context'
import Grid from './Grid'
const TicTacToe = () => {
  const { setPlayerTool } = useContextMain()
  const style = {
    section: `w-[100vw] h-[100vh] bg-blue-500 items-center justify-center flex flex-col`,
    btnWrapper: `text-[5rem] gap-6 flex`,
  }

  const { ticTacToeGrid } = useContextMain()
  return (
    <section className={style.section}>
      <div className={style.btnWrapper}>
        <span onClick={() => setPlayerTool('X')}>X</span>
        <span onClick={() => setPlayerTool('O')}>O</span>
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
