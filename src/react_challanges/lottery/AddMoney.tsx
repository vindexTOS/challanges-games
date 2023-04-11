import React from 'react'
import { useContextMain } from '../context'

const AddMoney = () => {
  const { addMoneyToAccount, setAddMoneyToAccount } = useContextMain()
  const style = {
    mainDiv: `w-[100%] flex flex-col gap-10 px-10`,
    headerWrapper: `flex gap-2 items-center justify-start `,
    header: `text-[1.5rem] font-normal text-gray-500`,
    numHeader: `bg-blue-500 text-[1.2rem] font-bold text-white w-[2.5rem] h-[2.5rem] text-center flex items-center justify-center rounded-[50%] `,
    numberDiv: `flex items-center  justify-center gap-10 `,
    moneyHeader: `w-[8rem] h-[2.8rem] text-purple-900 text-[1.2rem] font-medium p-5 border-[2px] rounded-[7px] flex items-center justify-center cursor-pointer`,
  }
  const moneyArray = [
    { title: '100', num: 100 },
    { title: '1K', num: 1000 },
    { title: '10K', num: 10000 },
    { title: '100K', num: 100000 },
  ]
  return (
    <div className={style.mainDiv}>
      <div className={style.headerWrapper}>
        <h1 className={style.numHeader}>4</h1>
        <h1 className={style.header}>Prcie</h1>
      </div>
      <div className={style.numberDiv}>
        {moneyArray.map((val: any) => (
          <h1
            onClick={() => setAddMoneyToAccount(Number(val.num))}
            className={style.moneyHeader}
          >
            ${val.title}
          </h1>
        ))}
      </div>
    </div>
  )
}

export default AddMoney
