import React, { FC } from 'react'
import { useContextMain } from '../context'

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
  } = useContextMain()
  return (
    <div key={id}>
      {toDoEdit[index] ? (
        <input onChange={(e) => setEditedText(e.target.value)} type="text" />
      ) : (
        <span>{text}</span>
      )}
      <button onClick={() => RemoveFromList(id)}>Remove</button>

      {!toDoEdit[index] ? (
        <button onClick={() => OpenEdit(index)}> Edit</button>
      ) : (
        <button onClick={() => EditListItem(index)}>Add Change</button>
      )}
    </div>
  )
}

export default List
