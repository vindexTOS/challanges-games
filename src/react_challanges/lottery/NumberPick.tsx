import React from 'react'
import { useContextMain } from '../context'

const NumberPick = () => {
  const {
    lottoNumbers,
    megaBall,
    MainNumberCollector,
    PowerballCollector,
    numberBooleanCheck,
    lottoRandomNumbers,
    powerBallBooleanCheck,
  } = useContextMain()

  const style = {
    mainSection: `w-[100%] flex flex-col gap-2 items-center justify-center`,
    mainNumbersDiv: `flex flex-wrap px-10 w-[100%]`,
    mainNum: ` cursor-pointer w-[2rem] h-[2rem] outline outline-[1px] p-[1.7rem] outline-gray-300 flex items-center justify-center text-[1.3rem] `,
    header: `text-[1.5rem] font-normal text-gray-500`,
  }
  return (
    <section className={style.mainSection}>
      <div className={style.mainNumbersDiv}>
        {lottoRandomNumbers.length < 5 && (
          <>
            {' '}
            {lottoNumbers.map((val: number, i: number) => (
              <button
                disabled={lottoRandomNumbers.length === 5}
                onClick={() => MainNumberCollector(Number(val), i)}
                className={`${style.mainNum} ${
                  numberBooleanCheck[i] && 'bg-gray-800 text-white'
                }`}
              >
                {val}
              </button>
            ))}{' '}
          </>
        )}
      </div>
      {lottoRandomNumbers.length !== 6 && (
        <>
          <h1 className={style.header}>Select Your Powerball</h1>
          <div className={style.mainNumbersDiv}>
            {megaBall.map((val: number, i: number) => (
              <button
                disabled={lottoRandomNumbers.length < 5}
                onClick={() => PowerballCollector(Number(val), i)}
                className={`${style.mainNum} ${
                  powerBallBooleanCheck[i] && 'bg-gray-800 text-white'
                }`}
              >
                {val}
              </button>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default NumberPick
