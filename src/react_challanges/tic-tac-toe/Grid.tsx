import React, { FC } from 'react'
import { useContextMain } from '../context'
type GridProps = {
  val: string[]
  gridIndex: number
}
const Grid: FC<GridProps> = ({ val, gridIndex }) => {
  const { BoxClick } = useContextMain()

  return (
    <div key={gridIndex} className=" gap-2 flex flex-col ">
      {val.map((item: any, rowIndex: number) => {
        return (
          <div
            key={rowIndex}
            onClick={() => BoxClick(gridIndex, rowIndex)}
            className="w-[200px] h-[200px] border-2 cursor-pointer flex items-center justify-center text-[6rem] text-white"
          >
            {item}
          </div>
        )
      })}
    </div>
  )
}

export default Grid
