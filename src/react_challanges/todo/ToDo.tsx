import React from 'react'
import List from './List'
import { useContextMain, toDoListType } from '../context'
const ToDo = () => {
  const { toDoList, AddNewToList, setToDoInput, toDoInput } = useContextMain()
  const style = {
    section: `w-[100wh] h-[100vh] bg-yellow-400 flex items-center justify-center `,
    todoDiv: ``,
    btnWrapper: `flex   `,
  }
  return (
    <section className={style.section}>
      <div className={style.todoDiv}>
        <h1>To Do List</h1>
        <div className={style.btnWrapper}>
          <input
            value={toDoInput}
            onChange={(e) => setToDoInput(e.target.value)}
            type="text"
          />
          <button onClick={AddNewToList}>ADD</button>
        </div>
        <div>
          {toDoList.map((val: toDoListType, index: number) => (
            <List key={val.id} index={index} text={val.text} id={val.id} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ToDo
