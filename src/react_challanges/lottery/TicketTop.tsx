import React from 'react'
import { useContextMain } from '../context'

const TicketTop = () => {
  const { drawPerSec, setDrawPerSec } = useContextMain()
  const style = {
    mainDiv: `w-[100%] flex items-center justify-center`,
    drawAndPrie: `w-[90%] text-[1.34rem] py-10 flex  flex-col gap-5`,
    subDiv: `flex justify-between  `,
    headerWrapper: `flex gap-2 items-center justify-center `,
    numHeader: `bg-blue-500 text-[1.2rem] font-bold text-white w-[2.5rem] h-[2.5rem] text-center flex items-center justify-center rounded-[50%] `,
    header: `font-medium text-gray-500`,
    numberDiv: `  flex  `,
  }

  const numForDraw = [
    { title: '1', value: 1000 },
    { title: '3', value: 300 },
    { title: '10', value: 100 },
    { title: '100', value: 10 },
  ]
  return (
    <section className={style.mainDiv}>
      <div className={style.drawAndPrie}>
        <div className={style.subDiv}>
          <div className={style.headerWrapper}>
            <h1 className={style.numHeader}>1</h1>{' '}
            <h1 className={style.header}>Prcie</h1>{' '}
          </div>
          <div>Standart - $2.00</div>
        </div>
        <div className={style.subDiv}>
          <div className={style.headerWrapper}>
            <h1 className={style.numHeader}>2</h1>
            <h1 className={style.header}>Draw Per Second</h1>{' '}
          </div>
          <div className={style.numberDiv}>
            {numForDraw.map((val: { title: string; value: number }) => (
              <button
                className={`w-[4rem] outline outline-[1px] outline-gray-300  ${
                  drawPerSec === val.value && 'bg-blue-500 text-white'
                }`}
                onClick={() => setDrawPerSec(Number(val.value))}
              >
                {val.title}
              </button>
            ))}
          </div>
        </div>
        <div className={style.subDiv}>
          <div className={style.headerWrapper}>
            <h1 className={style.numHeader}>3</h1>
            <h1 className={style.header}>Pick a number</h1>
          </div>
          <div>random, delete </div>
        </div>
      </div>
    </section>
  )
}

export default TicketTop
