import React from 'react'
import List from './List'
import { useContextMain, toDoListType } from '../context'
import { motion as m } from 'framer-motion'
import { SiAddthis } from 'react-icons/si'
const ToDo = () => {
  const {
    toDoList,
    AddNewToList,
    setToDoInput,
    toDoInput,
    toDoError,
  } = useContextMain()
  const style = {
    section: `w-[100wh] h-[100vh] bg-yellow-300 flex  items-center justify-center `,
    todoDivWrapper: `  bg-red-500   rounded-[20px] boxShaddow flex flex-col items-center justify-center w-[30%] max_XL3:w-[50%] max_x:w-[70%] max_md:w-[100%]  h-[740px]`,
    todoDiv: `w-[95%] flex flex-col items-center justify-start  h-[650px]   toDoPaper toDoPaperShaddow relative`,
    header: `text-[2rem] text-[#ebebd3]   toDoListHeader py-2`,
    input: `w-[80%] h-[4rem]  toDoListInputShaddow mt-3 rounded-[10px] mt-1 flex items-center justify-between px-3  `,
    btnWrapper: `flex  w-[100%] flex-col items-center justify-center  `,
    btnIcoN: `text-[#f95738] text-[2rem] hover:text-orange-400`,
    innerInput: `w-[85%] h-[3rem]  bg-[#eff1f3] ${
      toDoError !== ''
        ? 'outline outline-red-400 outline-2 rounded-[10px]'
        : 'border-b-[2px] border-l-[2px]  rounded-l-[10px]   border-gray-300 outline-none '
    } `,
    mapDiv: `w-[100%] h-[500px] flex items-center justify-center flex-col   `,
  }

  return (
    <section className={style.section}>
      <div className={style.todoDivWrapper}>
        <h1 className={style.header}>To Do List</h1>
        <div className={style.todoDiv}>
          <div className={style.btnWrapper}>
            <div className={style.input}>
              <m.input
                max={202}
                disabled={toDoInput.length > 202}
                animate={{
                  x: toDoError !== '' ? [-6, 0, 6, 0, -6, 6, 0, -6] : 0,
                  transition: {
                    ease: 'easeInOut',
                    duration: 0.2,
                  },
                }}
                className={style.innerInput}
                value={toDoInput}
                onChange={(e) => setToDoInput(e.target.value)}
                type="text"
              />
              <button onClick={AddNewToList}>
                <SiAddthis title="Add to the list" className={style.btnIcoN} />
              </button>
            </div>
          </div>
          <div className={style.mapDiv}>
            <div className="text-red-500 font-bold text-[1.3rem] h-[3rem] mt-2 ">
              {toDoError !== '' && <p>{toDoError}</p>}
            </div>
            <div className="w-[100%] h-[500px] flex flex-col items-center justify-start overflow-y-scroll scroll   ">
              {toDoList.map((val: toDoListType, index: number) => (
                <List key={val.id} index={index} text={val.text} id={val.id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ToDo
