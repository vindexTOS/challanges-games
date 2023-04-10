import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
  Reducer,
} from 'react'
export interface toDoListType {
  text: string
  id: string
}
{
}
type Action = {
  type: string
  payload?: number
}
type State = {
  selectorIndex: number
}
export type PokemonDataArrayType = {
  name: string
  url: string
}

export type PokemonDataType = {
  count: number
  next: string
  previous: null
  results: PokemonDataArrayType[]
}

export type PokemonSingleType = {
  abilities: []
  base_experience: number
  forms: []
  game_indices: []
  height: number
  held_items: []
  id: number
  is_default: boolean
  location_area_encounters: string
  movies: [
    {
      movie: { name: string; url: string }
      version_group_details: [
        {
          level_learned_at: number
          move_learn_method: { name: string; url: string }
        },
      ]
    },
  ]
  name: string
  order: number
  past_types: []
  species: { name: string; url: string }
  sprites: {
    back_default: string
    back_female: null
    back_shiny: string
    back_shiny_female: null
    front_default: string
    front_female: null
    front_shiny: string
    front_shiny_female: null
  }
  state: []
  type: []
  weight: number
}

type Cell = {
  setToDoInput: React.Dispatch<React.SetStateAction<string>>
  AddNewToList: () => void
  toDoList: toDoListType[]
  toDoInput: string
  RemoveFromList: (id: string, index: number) => void
  EditListItem: (index: number, id: string) => void
  OpenEdit: (index: number) => void
  toDoEdit: boolean[]
  setEditedText: React.Dispatch<React.SetStateAction<string>>
  toDoError: string
  editedText: string

  toDoCheck: boolean[]
  CheckToDO: (index: number) => void
  ticTacToeGrid: string[][]
  BoxClick: (gridIndex: number, rowIndex: number) => void
  setPlayerTool: React.Dispatch<React.SetStateAction<string>>
  playerTool: string
  counter: number
  setCounter: React.Dispatch<React.SetStateAction<number>>
  ResetTicTac: () => void
  winner: string
  pokemonData: PokemonDataType | {}
  singleUrl: any | unknown

  pokemonState: State
  dispatchPokemon: React.Dispatch<Action>
  pokemonDescription: string
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
    toDoListDataLocalStorage !== null
      ? JSON.parse(toDoListDataLocalStorage)
      : [],
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
    if (editedText !== '') {
      let findEdited = toDoList.map((val: any, i: number) => {
        if (i === index) {
          val.text = editedText
        }
        return val
      })
      setToDoList(findEdited)
    }
  }

  // letter check
  useEffect(() => {
    if (toDoInput.length > 201) {
      setToDoError('Characters Must Be Under 200 Letters')

      setTimeout(() => {
        setToDoError('')
      }, 3000)
    }
  }, [toDoInput, editedText])
  // check box
  const [toDoCheck, setToDoCheck] = useState<boolean[]>(
    new Array(toDoList.length).fill(false),
  )
  const CheckToDO = (index: number) => {
    let newCheck = [...toDoCheck]
    newCheck[index] = !newCheck[index]
    setToDoCheck(newCheck)
  }

  // remove item from list
  const RemoveFromList = (id: string, index: number) => {
    let filteredList = toDoList.filter((val: toDoListType) => val.id !== id)
    setToDoList(filteredList)
    let newCheck = [...toDoCheck]
    newCheck[index] = false
    setToDoCheck(newCheck)
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //tic tac toe

  const [ticTacToeGrid, setTicTacToeGrid] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ])
  const [playerTool, setPlayerTool] = useState<string>('')
  const [playerAi, setAiTool] = useState<string>('')
  const [counter, setCounter] = useState<number>(-1)
  const [winner, setWinner] = useState<string>('')
  useEffect(() => {
    if (playerTool === 'O') {
      setAiTool('X')
    } else if (playerTool == 'X') {
      setAiTool('O')
    }
  }, [playerTool])
  const winConditions = [
    [ticTacToeGrid[0][0], ticTacToeGrid[0][1], ticTacToeGrid[0][2]],
    [ticTacToeGrid[1][0], ticTacToeGrid[1][1], ticTacToeGrid[1][2]],
    [ticTacToeGrid[2][0], ticTacToeGrid[2][1], ticTacToeGrid[2][2]],
    // Columns
    [ticTacToeGrid[0][0], ticTacToeGrid[1][0], ticTacToeGrid[2][0]],
    [ticTacToeGrid[0][1], ticTacToeGrid[1][1], ticTacToeGrid[2][1]],
    [ticTacToeGrid[0][2], ticTacToeGrid[1][2], ticTacToeGrid[2][2]],
    // Diagonals
    [ticTacToeGrid[0][0], ticTacToeGrid[1][1], ticTacToeGrid[2][2]],
    [ticTacToeGrid[0][2], ticTacToeGrid[1][1], ticTacToeGrid[2][0]],
  ]
  const BoxClick = (gridIndex: number, rowIndex: number) => {
    setCounter(counter + 1)
    let newVal = [...ticTacToeGrid]

    if (newVal[gridIndex][rowIndex] === '') {
      newVal[gridIndex][rowIndex] = playerTool

      setTicTacToeGrid(newVal)
    }
  }
  useEffect(() => {
    if (counter >= 0) {
      for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i]
        if (a === playerTool && b === playerTool && c === playerTool) {
          if (winner === '') {
            setWinner('Humanity Won')
          }
        } else if (a === playerAi && b === playerAi && c === playerAi) {
          if (winner === '') {
            setWinner('Skyenet Won')
          }
        }
      }
    }
  }, [ticTacToeGrid])
  useEffect(() => {
    let newVal = [...ticTacToeGrid]
    let AIGridindex = 0
    let AIRowindex = 0

    let check = true

    while (check) {
      AIGridindex = Math.floor(Math.random() * newVal.length)
      AIRowindex = Math.floor(Math.random() * newVal[AIGridindex].length)
      if (newVal[AIGridindex][AIRowindex] === '') {
        newVal[AIGridindex][AIRowindex] = playerAi
        check = false

        break
      } else if (counter === 5) {
        break
      }
    }

    setTicTacToeGrid(newVal)
  }, [counter])

  const ResetTicTac = () => {
    setTicTacToeGrid([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ])

    setPlayerTool('')
    setAiTool('')
    setCounter(-1)
    setWinner('')
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //pokemon
  const reducer = (state: State, action: Action) => {
    switch (action.type) {
      case 'next':
        return {
          ...state,
          selectorIndex: action.payload
            ? action.payload
            : 0 <= 150
            ? state.selectorIndex + 1
            : (state.selectorIndex = 0),
        }
      case 'prev':
        return {
          ...state,
          selectorIndex:
            state.selectorIndex > 0
              ? state.selectorIndex - 1
              : (state.selectorIndex = 0),
        }
      case 'selector':
        return {
          ...state,
          selectorIndex: action.payload
            ? (state.selectorIndex = action.payload)
            : (state.selectorIndex = 0),
        }
      default:
        return state
    }
  }

  const [pokemonState, dispatchPokemon] = useReducer<Reducer<State, Action>>(
    reducer,
    {
      selectorIndex: 0,
    },
  )

  const pokemonurl = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=150`
  const singlePkUrl = `https://pokeapi.co/api/v2/pokemon/${
    pokemonState.selectorIndex + 1
  }/`
  const pokemonDescriptionUrl = `https://pokeapi.co/api/v2/pokemon-species/${
    pokemonState.selectorIndex + 1
  }`
  const [pokemonData, setPokemonData] = useState<PokemonDataType | {}>({})
  const [singleUrl, setSingleUrl] = useState<PokemonSingleType | {}>({})
  const [pokemonDescription, setPokemonDescription] = useState<string>('')
  useEffect(() => {
    const fetchPokemon = async () => {
      const description = await fetch(pokemonDescriptionUrl)
      const decDataJson = await description.json()
      setPokemonDescription(
        decDataJson.flavor_text_entries[
          pokemonState.selectorIndex + 1
        ].flavor_text.replace(/[\n\f]/g, ' '),
      )

      const res = await fetch(pokemonurl)
      const jsonD = await res.json()
      setPokemonData(jsonD)
    }
    const fetchPoke = async () => {
      const res = await fetch(singlePkUrl)
      const jsonD = await res.json()
      setSingleUrl(jsonD)
    }

    fetchPokemon()
    fetchPoke()
    // console.log(pokemonState.index)
  }, [pokemonState.selectorIndex])
  useEffect(() => {
    // console.log(pokemonData)
    console.log(singleUrl)
    // console.log(pokemonDescription)
  }, [pokemonData])

  return (
    <Context.Provider
      value={{
        // to do list start
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
        editedText,
        toDoCheck,
        CheckToDO,
        // tic tac to start
        ticTacToeGrid,
        BoxClick,
        setPlayerTool,
        playerTool,
        counter,
        setCounter,
        ResetTicTac,
        winner,
        /// pokemon
        pokemonData,
        singleUrl,
        pokemonState,
        dispatchPokemon,
        pokemonDescription,
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
