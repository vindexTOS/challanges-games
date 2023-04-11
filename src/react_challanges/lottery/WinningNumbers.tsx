import React, { FC } from 'react'
import { useContextMain } from '../context'
type WinningNumberProps = {
  data: number[]
}
const WinningNumbers: FC<WinningNumberProps> = ({ data }) => {
  const { RemoveNumberFromBall, lottoRandomNumbers } = useContextMain()
  const style = {
    mainDiv: `w-[100%] flex items-center justify-center`,
    subDiv: `flex gap-1`,
    ballDiv: ` flex font-medium text-[1.2rem]  items-center justify-center text-center w-[2.8rem] h-[2.8rem] rounded-[50%] outline-[1px] outline outline-gray-300 `,
  }
  const fakeArr = Array(6).fill('')
  return (
    <div className={style.mainDiv}>
      <div className={style.subDiv}>
        {data.length > 0 ? (
          data.map((val: number, index: number) => (
            <button
              onClick={() => RemoveNumberFromBall(val, index)}
              className={`${style.ballDiv} ${
                data.length - 1 === index && 'bg-purple-100'
              }  ${lottoRandomNumbers.includes(val) && 'bg-green-300'} `}
            >
              {val}
            </button>
          ))
        ) : (
          <>
            {fakeArr.map((val: string, index: number) => (
              <div
                className={`${style.ballDiv}  ${
                  fakeArr.length - 1 === index && 'bg-purple-100'
                } `}
              >
                {val}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default WinningNumbers
