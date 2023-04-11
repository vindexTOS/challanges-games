import React from 'react'

const Start = () => {
  const style = {
    mainDiv: `w-[100%] flex items-center justify-between px-10`,
    headerWrapper: `flex gap-2 items-center justify-start `,
    header: `text-[1.5rem] font-normal text-gray-500`,
    numHeader: `bg-blue-500 text-[1.2rem] font-bold text-white w-[2.5rem] h-[2.5rem] text-center flex items-center justify-center rounded-[50%] `,
  }
  return (
    <div className={style.mainDiv}>
      {' '}
      <div className={style.headerWrapper}>
        <h1 className={style.numHeader}>5</h1>
        <h1 className={style.header}>Lets Kick This Off!</h1>
      </div>
      <button>START SIMULATOR</button>
    </div>
  )
}

export default Start
