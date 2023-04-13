import React, { useState } from 'react'
import { useContextMain, FolderDataType } from '../context'
import Entery from './Entery'
const Recursion = () => {
  const {
    folderData,
    setFolderData,
    AddNewFolder,
    setFolderName,
  } = useContextMain()
  const style = {
    mainDiv: `w-[100%] h-[100vh] bg-yellow-100 gap-2 flex flex-col items-center justify-center `,
  }
  const [showFolder, setShowFolder] = useState<boolean>(false)
  return (
    <div className={style.mainDiv}>
      <button onClick={AddNewFolder}>CLICK</button>
      <input type="text" onChange={(e) => setFolderName(e.target.value)} />
      <div className="flex flex-col gap-10">
        {' '}
        {folderData?.map((val: FolderDataType, index: number) => (
          <Entery
            key={val.id}
            folder={val.folder}
            title={val.title}
            index={index}
            counter={2}
            id={val.id}
            showFolder={showFolder}
            setShowFolder={setShowFolder}
          />
        ))}
      </div>
    </div>
  )
}

export default Recursion
