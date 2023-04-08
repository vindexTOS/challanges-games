import React from 'react'
import { useContextMain } from '../context'
import Grid from './Grid'
const TicTacToe = () => {
  const style = {
    section: `w-[100vw] h-[100vh] bg-blue-500 items-center justify-center flex `,
  }

  const { ticTacToeGrid } = useContextMain()
  return (
    <section className={style.section}>
      <div className="flex gap-2">
        {ticTacToeGrid.map((val: any, gridIndex: number) => (
          <Grid val={val} gridIndex={gridIndex} />
        ))}
      </div>
    </section>
  )
}

export default TicTacToe
