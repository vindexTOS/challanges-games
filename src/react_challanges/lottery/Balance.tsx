import React, { FC } from 'react'

type DivBalancProps = {
  title: string
  money: number
}

const Balance = () => {
  const style = {
    mainDiv: `w-[90%]   flex items-start justify-start flex-col px-10`,
    subDiv: `flex w-[400px]    gap-10 items-center justify-between px-5 w-[10rem] text-[1.4rem] border-b-[2px] border-gray-300 `,
  }
  const DivBalanc: FC<DivBalancProps> = ({ title, money }) => {
    return (
      <div className={style.subDiv}>
        <h1 className=" w-[100px]  text-[1.5rem] font-medium   text-gray-500">
          {title}
        </h1>
        <h1 className="text-[1.6rem] font-medium w-[5rem]   flex items-center justify-center text-gray-600">
          ${money}
        </h1>
      </div>
    )
  }
  return (
    <div className={style.mainDiv}>
      <DivBalanc title="Spent" money={0} />
      <DivBalanc title="Won" money={0} />
      <DivBalanc title="Win/Loss" money={0} />
      <DivBalanc title="Balance" money={0} />
    </div>
  )
}

export default Balance