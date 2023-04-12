import React from 'react'
import { useContextMain } from '../context'
import { VscDebugStart } from 'react-icons/vsc'
import { motion as m } from 'framer-motion'
const Start = () => {
  const { RandomizeLottoNumbers, lottoButtonPressed } = useContextMain()
  const style = {
    mainDiv: `w-[100%] flex items-center justify-between px-10`,
    headerWrapper: `flex gap-2 items-center justify-start `,
    header: `text-[1.5rem] font-normal text-gray-500 max_sm:text-[1rem]`,
    numHeader: `bg-blue-500 text-[1.2rem] font-bold text-white w-[2.5rem] h-[2.5rem] text-center flex items-center justify-center rounded-[50%] `,
    btn: `flex items-center justify-center text-[1.4rem] gap-4 text-gray-500 outline outline-[2px] outline-gray-300 rounded-[10px] px-5 py-2  max_sm:text-[1rem]  hover:outline-none`,
  }
  return (
    <div className={style.mainDiv}>
      {' '}
      <div className={style.headerWrapper}>
        <h1 className={style.numHeader}>5</h1>
        <h1 className={style.header}>Lets Kick This Off!</h1>
      </div>
      <m.button
        whileHover={{
          scale: 1.1,
          boxShadow: `-1px 7px 18px 1px rgba(0,0,0,0.66)`,
          backgroundColor: 'white',
          color: 'black',
        }}
        className={style.btn}
        disabled={lottoButtonPressed}
        onClick={() => RandomizeLottoNumbers()}
      >
        <VscDebugStart className=" text-[2rem] text-gray-300 hover:text-white" />{' '}
        START SIMULATOR
      </m.button>
    </div>
  )
}

export default Start
