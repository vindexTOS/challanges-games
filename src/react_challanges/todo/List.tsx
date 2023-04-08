import React, { FC } from 'react'
import { useContextMain } from '../context'
import { BiEditAlt } from 'react-icons/bi'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { MdAssignmentAdd, MdFreeCancellation } from 'react-icons/md'
import { AiOutlineCheck } from 'react-icons/ai'
import { motion as m } from 'framer-motion'
type ListType = {
  text: string
  id: string
  index: number
}

const List: FC<ListType> = ({ text, id, index }) => {
  const {
    RemoveFromList,
    EditListItem,
    toDoEdit,

    setEditedText,
    OpenEdit,
    toDoList,
    toDoCheck,
    editedText,
    CheckToDO,
  } = useContextMain()

  const style = {
    mainDiv: `w-[80%] max_smm:w-[75%] border-yellow-500  border-b-2   max-h-[400px]     flex items-start py-5 justify-between px-5  `,
    span: `outline font-bold text-gray-500 max-h-[400px]   w-[80%] cursor-pointer flex items-center px-2 w-[80%] outline-none  ${
      toDoCheck[index] &&
      'line-through decoration-solid decoration-[10px] toDoListOverLineColor  '
    }`,
    input: ` h-[3rem]  w-[80%] outline-none border-green-300 px-2  bg-green-300 text-white font-bold  border-b-2   bg-[#eff1f3]`,
    btnWrapper: `flex items-end  justify-start gap-2 w-[10%]  `,
    trashIcon: `text-yellow-500 hover:text-red-500 text-[1.6rem] `,
    editIcon: `text-yellow-500 hover:text-green-400 text-[1.6rem]`,
    canelEdit: `text-yellow-500 hover:text-red-600 text-[1.6rem]`,
    saveIcon: `text-yellow-500 hover:text-green-400 text-[1.6rem]`,

    checkBox: `w-[2rem] h-[2rem] border-2 border-gray-300  hover:border-green-400 cursor-pointer rounded-[4px] flex items-center justify-center ${
      toDoCheck[index] && 'border-green-300'
    }`,
    checkIcon: `text-[2rem] text-green-400 `,
  }

  return (
    <m.div
      initial={{ y: -400 }}
      animate={{ y: 0 }}
      className={style.mainDiv}
      key={id}
    >
      <div onClick={() => CheckToDO(index)} className={style.checkBox}>
        {toDoCheck[index] && <AiOutlineCheck className={style.checkIcon} />}
      </div>
      {toDoEdit[index] ? (
        <input
          max={202}
          disabled={editedText.length > 202}
          onDoubleClick={() => OpenEdit(index)}
          placeholder={toDoList[index].text}
          className={style.input}
          onChange={(e) => setEditedText(e.target.value)}
          type="text"
        />
      ) : (
        <span className={style.span} onDoubleClick={() => OpenEdit(index)}>
          {text}
        </span>
      )}
      <div className={style.btnWrapper}>
        <button className={style.trashIcon} onClick={() => RemoveFromList(id)}>
          <RiDeleteBin6Line />
        </button>

        {!toDoEdit[index] ? (
          <button className={style.editIcon} onClick={() => OpenEdit(index)}>
            <BiEditAlt />
          </button>
        ) : (
          <>
            {' '}
            <button className={style.canelEdit} onClick={() => OpenEdit(index)}>
              <MdFreeCancellation />
            </button>{' '}
            <button
              className={style.saveIcon}
              onClick={() => EditListItem(index, id)}
            >
              <MdAssignmentAdd />
            </button>
          </>
        )}
      </div>
    </m.div>
  )
}

export default List
