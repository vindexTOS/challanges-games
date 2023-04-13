import React, { FC, useState } from 'react'
import { FolderDataType, useContextMain } from '../context'
const Entery: FC<FolderDataType> = ({
  title,
  folder,
  index,
  counter,
  id,
  showFolder,
  setShowFolder,
}) => {
  const { Addfolder, addanotherFolder, OpenForEdit } = useContextMain()
  const [text, setText] = useState<string>('')
  let indexCheck = index ? index : 0
  let counterCheck = counter ? counter : 0
  let idCheck = id ? id : ''
  return (
    <div
      key={id}
      className="flex flex-col "
      style={{ marginLeft: `${indexCheck * 10}px` }}
    >
      {(showFolder || (folder && folder.length > 0)) && (
        <p onClick={() => setShowFolder && setShowFolder(!showFolder)}>+</p>
      )}
      <h1 onClick={() => OpenForEdit(indexCheck)}>ADD</h1>
      {addanotherFolder[indexCheck] && (
        <div>
          <input onChange={(e) => setText(e.target.value)} type="text" />{' '}
          <button onClick={() => Addfolder(text, indexCheck, idCheck)}>
            ADD NW FOLDER
          </button>
        </div>
      )}
      {title}
      {showFolder && (
        <>
          {folder?.map((val: FolderDataType) => (
            <Entery
              key={val.id}
              title={val.title}
              folder={val.folder}
              index={indexCheck + 1}
              showFolder={showFolder}
            />
          ))}
        </>
      )}
    </div>
  )
}

export default Entery
