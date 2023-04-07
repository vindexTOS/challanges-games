import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from 'react'
export interface toDoListType {
  text: string
  id: string
}
{
}

type Cell = {
  setToDoInput: React.Dispatch<React.SetStateAction<string>>
  AddNewToList: () => void
  toDoList: toDoListType[]
  toDoInput: string
  RemoveFromList: (id: string) => void
  EditListItem: (index: number, id: string) => void
  OpenEdit: (index: number) => void
  toDoEdit: boolean[]
  setEditedText: React.Dispatch<React.SetStateAction<string>>
  toDoError: string
}

const Context = createContext<Cell | null>(null)

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // TO DO APP LOGIC ////////
  // getting data from local stoarage
  const toDoListDataLocalStorage: string | null = localStorage.getItem(
    'to-do' || '[]',
  )
  const [toDoInput, setToDoInput] = useState<string>('')
  const [toDoList, setToDoList] = useState<toDoListType[]>(
    toDoListDataLocalStorage !== null && JSON.parse(toDoListDataLocalStorage),
  )
  const [toDoError, setToDoError] = useState<string>('')
  // number array for random array
  const numberForRandom: number[] = Array.from(
    { length: 10 },
    (_: any, i: number) => i,
  )
  // setting data to localstorage
  useEffect(() => {
    localStorage.setItem('to-do', JSON.stringify(toDoList))
  }, [toDoList])
  const AddNewToList = () => {
    // creating uniuqe ID for each element
    let randomID = ''
    for (let i = 0; i < 6; i++) {
      let Randomizer = Math.floor(Math.random() * numberForRandom.length)
      randomID += numberForRandom[Randomizer]
    }
    if (toDoInput !== '') {
      setToDoList([...toDoList, { text: toDoInput, id: randomID }])
      setToDoInput('')
    } else {
      setToDoError('Please Enter The Text')

      setTimeout(() => {
        setToDoError('')
      }, 3000)
    }
  }
  // remove item from list
  const RemoveFromList = (id: string) => {
    let filteredList = toDoList.filter((val: toDoListType) => val.id !== id)
    setToDoList(filteredList)
  }
  // edit item
  const [toDoEdit, setToDoEdit] = useState<boolean[]>(
    new Array(toDoList.length).fill(false),
  )
  const [editedText, setEditedText] = useState<string>('')
  const OpenEdit = (index: number) => {
    let newListEdit = [...toDoEdit]
    newListEdit[index] = !newListEdit[index]
    setToDoEdit(newListEdit)
  }
  const EditListItem = (index: number, id: string) => {
    let newListEdit = [...toDoEdit]
    newListEdit[index] = !newListEdit[index]
    setToDoEdit(newListEdit)
    let findEdited = toDoList.map((val: any, i: number) => {
      if (i === index) {
        val.text = editedText
      }
      return val
    })
    setToDoList(findEdited)
  }

  return (
    <Context.Provider
      value={{
        toDoList,
        AddNewToList,
        setToDoInput,
        toDoInput,
        RemoveFromList,
        EditListItem,
        toDoEdit,
        setEditedText,
        OpenEdit,
        toDoError,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useContextMain = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('Not Wrapped')
  }
  return context
}
