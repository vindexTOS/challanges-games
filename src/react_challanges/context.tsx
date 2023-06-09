import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
  Reducer,
  useRef,
} from 'react'
import { useLocation } from 'react-router-dom'
import { imgData } from '../assets/tictac/mainPage/photoData'
import { db } from '../firebase/firebase'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
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

export type FolderDataType = {
  title: string
  index?: number
  folder?: FolderDataType[]
  counter?: number
  id?: string
  showFolder?: boolean
  setShowFolder?: React.Dispatch<React.SetStateAction<boolean>>
}
export type ProjectsData = {
  title: string
  link: string
  img?: string
  id?: string
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
  setDrawPerSec: React.Dispatch<React.SetStateAction<number>>
  drawPerSec: number
  setLottoRandomNumbers: React.Dispatch<React.SetStateAction<number[]>>
  lottoRandomNumbers: number[]

  lottoWinningNumbers: number[]
  setLottoWinningNumbers: React.Dispatch<React.SetStateAction<number[]>>

  lottoNumbers: number[]
  megaBall: number[]
  MainNumberCollector: (num: number, index: number) => void
  PowerballCollector: (num: number, index: number) => void
  numberBooleanCheck: boolean[]

  RemoveNumberFromBall: (num: number, index: number) => void
  powerBallBooleanCheck: boolean[]

  addMoneyToAccount: number
  setAddMoneyToAccount: React.Dispatch<React.SetStateAction<number>>
  RandomizeLottoNumbers: () => void

  lostMoneyCounter: number

  wonMoneyCounter: number
  lottoRef: React.MutableRefObject<null>
  lottoButtonPressed: boolean
  NumberRandomizerForLotto: () => void
  ReStartLottoSimulator: () => void

  folderData: FolderDataType[]
  setFolderData: React.Dispatch<React.SetStateAction<FolderDataType[]>>
  AddNewFolder: () => void
  setFolderName: React.Dispatch<React.SetStateAction<string>>
  Addfolder: (title: string, index: number, id: string) => void
  addanotherFolder: boolean[]
  OpenForEdit: (index: number) => void
  ProjectDataState: ProjectsData[]
  navBarShow: boolean
  setNavBarShow: React.Dispatch<React.SetStateAction<boolean>>
}

const Context = createContext<Cell | null>(null)

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  // home page object
  const location = useLocation()
  const ProjectsData: ProjectsData[] = [
    { title: 'Lottory', link: '/lottory', img: imgData.lotto },
    { title: 'To Do List', link: '/to-do-list', img: imgData.todolist },
    { title: 'Tic Tac Toe', link: '/tic-tac-toe', img: imgData.tictac },
    { title: 'Pokemon API', link: '/pokemon', img: imgData.pokimon },
  ]
  const [ProjectDataState, setProjectDataState] = useState<ProjectsData[]>(
    ProjectsData,
  )

  useEffect(() => {
    const q = query(collection(db, 'challanges'))
    const unsub = onSnapshot(q, (querrySnapShot) => {
      let data: any = []
      querrySnapShot.forEach((doc: any) => {
        data.push({ ...doc.data(), id: doc.id })
      })
      setProjectDataState([...ProjectDataState, ...data])
    })

    return () => unsub()
  }, [db])

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
  // lottory//////////////////////////////////////////////////////////////////////////////////////////////

  const [lottoNumbers, setLottoNumbers] = useState<number[]>(
    Array.from({ length: 70 }, (_, i) => i + 1),
  )
  const [megaBall, setMegaBall] = useState<number[]>(
    Array.from({ length: 25 }, (_, i) => i + 1),
  )
  const [drawPerSec, setDrawPerSec] = useState<number>(1000)
  const [lottoRandomNumbers, setLottoRandomNumbers] = useState<number[]>([])
  const [lottoWinningNumbers, setLottoWinningNumbers] = useState<number[]>([])
  const [numberBooleanCheck, setNumberBooleanCheck] = useState<boolean[]>(
    new Array(lottoRandomNumbers.length).fill(false),
  )
  const [powerBallBooleanCheck, setPowerBallBooleanCheck] = useState<boolean[]>(
    new Array(megaBall.length).fill(false),
  )

  const [addMoneyToAccount, setAddMoneyToAccount] = useState<number>(100)
  const [lostMoneyCounter, setLostMoneyCounter] = useState<number>(0)
  const [wonMoneyCounter, setWonMoneyCounter] = useState<number>(0)

  const lottoRef = useRef(null)
  const MainNumberCollector = (num: number, index: number) => {
    let newBoolean = [...numberBooleanCheck]
    newBoolean[index] = !newBoolean[index]
    setNumberBooleanCheck(newBoolean)
    if (lottoRandomNumbers.length < 5) {
      setLottoRandomNumbers([...lottoRandomNumbers, num])
    }
    if (lottoRandomNumbers.includes(num)) {
      const newNumbers = lottoRandomNumbers.filter((val) => val !== num)
      setLottoRandomNumbers(newNumbers)
    }
  }

  const RemoveNumberFromBall = (num: number, index: number) => {
    let newBoolean = [...numberBooleanCheck]
    newBoolean[num - 1] = !newBoolean[num - 1]
    setNumberBooleanCheck(newBoolean)
    const newNumbers = lottoRandomNumbers.filter(
      (val, i: number) => index !== i,
    )
    setLottoRandomNumbers(newNumbers)
  }

  const PowerballCollector = (num: number, index: number) => {
    let newVal = [...powerBallBooleanCheck]
    newVal[index] = !newVal[index]
    setPowerBallBooleanCheck(newVal)
    if (lottoRandomNumbers.length >= 5 && lottoRandomNumbers.length < 6) {
      setLottoRandomNumbers([...lottoRandomNumbers, num])
    }
    if (lottoRandomNumbers.includes(num)) {
      const newFilteredValue = lottoRandomNumbers.filter(
        (val: number) => val !== num,
      )
      setLottoRandomNumbers(newFilteredValue)
    }
  }

  const [lottoButtonPressed, setLottoButtonPressed] = useState<boolean>(false)
  const [intervalID, setIntervalID] = useState<number | null | NodeJS.Timer>(
    null,
  )
  const RandomizeLottoNumbers = () => {
    let RandomLottoryArray: any[] = []
    let RandomPowerBallNums: any[] = []
    let ticketQuantatiy = addMoneyToAccount / 2
    if (lottoRandomNumbers.length === 6) {
      setLottoButtonPressed(true)
      for (let i = 0; i < ticketQuantatiy; i++) {
        // main numbers loop
        let lottoArr = []
        let powerBallArr = []
        for (let x = 0; x < 5; x++) {
          let randomIndex = Math.floor(Math.random() * lottoNumbers.length)
          let randomizedNumber = +lottoNumbers[randomIndex]
          lottoArr.push(randomizedNumber)
        }
        RandomLottoryArray.push(lottoArr)

        // powerball  loop

        for (let j = 0; j < 1; j++) {
          let randomIndex = Math.floor(Math.random() * megaBall.length)
          let randomizedNumber = +megaBall[randomIndex]
          powerBallArr.push(randomizedNumber)
        }
        RandomPowerBallNums.push(powerBallArr)
      }

      // set time interval for how fast we want to open up tickets
      let j = 0
      const intervalLotto = setInterval(() => {
        if (j >= RandomLottoryArray.length) {
          clearInterval(intervalLotto)
          return
        }
        setLottoWinningNumbers([
          ...RandomLottoryArray[j],
          ...RandomPowerBallNums[j],
        ])

        j++
      }, drawPerSec)
      setIntervalID(intervalLotto)
    } else {
      // if numbers has not been picked we scroll back up to numbers array
      const elemnet = (lottoRef.current as unknown) as HTMLTableSectionElement
      if (elemnet) {
        elemnet.scrollIntoView({
          behavior: 'smooth',
        })
      }
    }
  }
  const StopInterval = () => {
    if (intervalID) {
      clearInterval(intervalID)
      setIntervalID(null)
    }
  }

  useEffect(() => {
    let arrForValCheck: number[] = []
    if (lottoButtonPressed) {
      lottoRandomNumbers.filter((val: number) => {
        if (lottoWinningNumbers.includes(val)) {
          arrForValCheck.push(val)
        }
      })
      setAddMoneyToAccount(addMoneyToAccount - 2)
      setLostMoneyCounter(lostMoneyCounter + 2)
      if (arrForValCheck.length === 1) {
        setWonMoneyCounter(wonMoneyCounter + 4)
      } else if (arrForValCheck.length === 2 || arrForValCheck.length === 3) {
        setWonMoneyCounter(wonMoneyCounter + 7)
      } else if (arrForValCheck.length === 4) {
        setWonMoneyCounter(wonMoneyCounter + 50000)
      } else if (arrForValCheck.length === 5) {
        setWonMoneyCounter(wonMoneyCounter + 400000)
      } else if (arrForValCheck.length === 6) {
        setWonMoneyCounter(wonMoneyCounter + 1000000)
        // } else if (arrForValCheck.length === 0) {
        //   setAddMoneyToAccount(addMoneyToAccount - 2)
        //   setLostMoneyCounter(lostMoneyCounter + 2)
      }
    }
    console.log(arrForValCheck)
  }, [lottoWinningNumbers])

  // radnomize numbers for player

  const NumberRandomizerForLotto = () => {
    let lottoArr = []
    for (let x = 0; x < 6; x++) {
      let randomIndex = Math.floor(Math.random() * lottoNumbers.length)
      let randomizedNumber = +lottoNumbers[randomIndex]
      lottoArr.push(randomizedNumber)
    }
    setLottoRandomNumbers(lottoArr)
    console.log(lottoRandomNumbers)
  }
  // restart / delete the simulator
  const ReStartLottoSimulator = () => {
    setDrawPerSec(1000)
    setLottoRandomNumbers([])
    setLottoWinningNumbers([])
    setNumberBooleanCheck(new Array(lottoRandomNumbers.length).fill(false))
    setPowerBallBooleanCheck(new Array(megaBall.length).fill(false))
    setAddMoneyToAccount(100)
    setLostMoneyCounter(0)
    setWonMoneyCounter(0)
    setLottoButtonPressed(false)
    StopInterval()
  }

  /// RECURSION /////////////////////////////////////////////////////////////////////////////

  const [folderData, setFolderData] = useState<
    FolderDataType[] | unknown | any
  >([])
  const [folderName, setFolderName] = useState<string>('')
  const [addanotherFolder, setAddAnotherFolder] = useState<boolean[]>(
    new Array(folderData.length).fill(false),
  )

  const RandomIdMaker = () => {
    const nums = Array.from({ length: 10 }, (_: any, i: number) => i)

    let randomID = ''
    for (let i = 0; i < 6; i++) {
      let randomIndex = Math.floor(Math.random() * nums.length)
      randomID += nums[randomIndex]
    }
    return randomID
  }

  const AddNewFolder = () => {
    let newObj = { title: folderName, folder: [], id: RandomIdMaker() }
    setFolderData([...folderData, newObj])
  }
  const Addfolder = (title: string, index: number, id: string) => {
    let newList = [...folderData]
    let newBool = [...addanotherFolder]
    newBool[index] = !newBool[index]
    setAddAnotherFolder(newBool)

    const parentFolder = newList.find((val: any) => val.id === id)

    if (parentFolder && Array.isArray(parentFolder.folder)) {
      const newFolder = {
        title,
        folder: [],
        id: RandomIdMaker(),
      }

      parentFolder.folder.unshift(newFolder)

      setFolderData([...newList])
    }
    console.log(folderData)
  }

  const OpenForEdit = (index: number) => {
    let newBool = [...addanotherFolder]
    newBool[index] = !newBool[index]
    setAddAnotherFolder(newBool)
  }

  /// nav bar
  const [navBarShow, setNavBarShow] = useState<boolean>(false)
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
        //lottory
        drawPerSec,
        setDrawPerSec,
        lottoRandomNumbers,
        setLottoRandomNumbers,
        lottoWinningNumbers,
        setLottoWinningNumbers,
        lottoNumbers,
        megaBall,
        MainNumberCollector,
        PowerballCollector,
        numberBooleanCheck,
        RemoveNumberFromBall,
        powerBallBooleanCheck,
        addMoneyToAccount,
        setAddMoneyToAccount,
        RandomizeLottoNumbers,
        lostMoneyCounter,

        wonMoneyCounter,
        lottoRef,
        lottoButtonPressed,
        NumberRandomizerForLotto,
        ReStartLottoSimulator,
        //recursion
        folderData,
        setFolderData,
        AddNewFolder,
        setFolderName,
        Addfolder,
        addanotherFolder,
        // main page components
        OpenForEdit,
        ProjectDataState,

        navBarShow,
        setNavBarShow,
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
