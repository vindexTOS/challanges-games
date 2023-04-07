import React from 'react'
import List from './List'
import { useContextMain, toDoListType } from '../context'
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
    section: `w-[100wh] h-[100vh] bg-[#edddd4] flex  items-center justify-center `,
    todoDivWrapper: `bg-[#f95738] rounded-[20px] boxShaddow flex flex-col items-center justify-center w-[30%] h-[740px]`,
    todoDiv: `w-[95%] flex flex-col items-center justify-start  h-[650px]   bg-[#eff1f3]  toDoPaperShaddow relative`,
    header: `text-[2rem] text-[#ebebd3]   toDoListHeader py-2`,
    input: `w-[80%] h-[4rem]  toDoListInputShaddow mt-3 rounded-[10px] mt-1 flex items-center justify-between px-3  `,
    btnWrapper: `flex  w-[100%] flex-col items-center justify-center  `,
    btnIcoN: `text-[#f95738] text-[2rem] hover:text-orange-400`,
  }
  return (
    <section className={style.section}>
      <div className={style.todoDivWrapper}>
        <h1 className={style.header}>To Do List</h1>
        <div className={style.todoDiv}>
          <div className={style.btnWrapper}>
            <div className={style.input}>
              <input
                className="w-[85%] h-[3rem]  bg-[#eff1f3] border-l-2 rounded-l-[10px] border-b-2  border-gray-300 outline-none "
                value={toDoInput}
                onChange={(e) => setToDoInput(e.target.value)}
                type="text"
              />
              <button onClick={AddNewToList}>
                <SiAddthis title="Add to the list" className={style.btnIcoN} />
              </button>
            </div>
          </div>
          <div>
            {toDoError !== '' && (
              <div className="text-red-600 font-bold text-[1.3rem] mt-2 ">
                {toDoError}
              </div>
            )}
            {toDoList.map((val: toDoListType, index: number) => (
              <List key={val.id} index={index} text={val.text} id={val.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ToDo
