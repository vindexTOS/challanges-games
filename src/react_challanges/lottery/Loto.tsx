import React from 'react'
import TicketTop from './TicketTop'
import WinningNumbers from './WinningNumbers'
import NumberPick from './NumberPick'
import Balance from './Balance'
import AddMoney from './AddMoney'
import Start from './Start'
import { useContextMain } from '../context'
const Loto = () => {
  const {
    lottoWinningNumbers,

    lottoRandomNumbers,
  } = useContextMain()
  const style = {
    mainDiv: `w-[100vw] h-[100%] py-10 max_lg:h-[100%]  bg-gray-100 flex items-center justify-center max_sm:flex-col `,
    cardMainDiv: `w-[80%] h-[96%] gap-5  max_XL3:w-[100%] max_XL3:gap-10 flex max_lg:flex-col max_lg:justify-center max_lg:items-center max_lg:py-5  max_lg:h-[2200px] max_lg:gap-5 justify-between   max_XL3:px-10   px-40`,
    ticketSection: `w-[55%] py-10 max_XL3:w-[50%] max_lg:h-[100%] max_lg:w-[90%]  border-2  h-[100%] flex flex-col gap-5`,
    drawSection: `w-[45%]  max_XL3:w-[50%] max_lg:h-[1000px]  max_lg:w-[90%] h-[90%] border-2 `,
  }
  return (
    <section className={style.mainDiv}>
      <main className={style.cardMainDiv}>
        <section className={style.ticketSection}>
          <TicketTop />
          <WinningNumbers data={lottoRandomNumbers} />
          <NumberPick />
          <WinningNumbers data={lottoWinningNumbers} />
          <Balance />
          <AddMoney />
          <Start />
        </section>
        <section className={style.drawSection}></section>
      </main>
    </section>
  )
}

export default Loto
