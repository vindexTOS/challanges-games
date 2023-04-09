import React, { FC, useState, useEffect } from 'react'
import { useContextMain } from '../context'
type GridProps = {
  val: string[]
  gridIndex: number
}
const Grid: FC<GridProps> = ({ val, gridIndex }) => {
  const { BoxClick, ticTacToeGrid, playerTool } = useContextMain()
  const [stopBtn, setStopBtn] = useState<boolean>(true)
  useEffect(() => {
    setTimeout(() => {
      setStopBtn(false)
    }, 100)
    setStopBtn(true)
  }, [ticTacToeGrid])
  return (
    <div key={gridIndex} className=" gap-2 flex  flex-col ">
      {val.map((item: any, rowIndex: number) => {
        return (
          <button
            disabled={
              ticTacToeGrid[gridIndex][rowIndex] !== '' ||
              playerTool === '' ||
              stopBtn
            }
            key={rowIndex}
            onClick={() => BoxClick(gridIndex, rowIndex)}
            className={` w-[150px] h-[150px] border-red-600 text-red-600 border-2 cursor-pointer flex items-center justify-center text-[6rem]   ${
              ticTacToeGrid[gridIndex][rowIndex] === 'O'
                ? 'text-blue-600'
                : 'text-red-600'
            } `}
          >
            {item}
          </button>
        )
      })}
    </div>
  )
}

export default Grid
