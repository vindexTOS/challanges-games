import React, { Reducer, useReducer } from 'react'
import { useContextMain, PokemonSingleType, PokemonDataType } from '../context'
import { GoArrowDown, GoArrowUp } from 'react-icons/go'
const Pokemon = () => {
  const {
    pokemonDescription,

    singleUrl,
    pokemonState,
    pokemonData,
    dispatchPokemon,
  } = useContextMain()
  const [dropDown, setDropDown] = React.useState<boolean>(false)
  const style = {
    section: `bg-[#BBE6E4] w-[100vw] h-[100vh] flex items-center justify-center`,

    mainContent: `h-[800px] w-[300px] flex flex-col items-center  justify-between  py-20`,
    input: `w-[100%]`,
    mainDiv: `bg-white rounded-[12px] h-[400px] w-[300px] flex flex-col items-center justify-cneter  py-5  `,
    img: `w-[150px] border-2 rounded-[50%] bg-green-100`,
    header: ` text-[2rem] font-bold text-gray-700`,
    btnWrapper: ` w-[100%] flex  items-center justify-between  `,
    btn: `w-[49%] py-[8px] bg-[#7D70BA] text-[#fff] rounded-[5px]`,
    picNameWrapper: `flex flex-col items-center justify-center gap-2 relative`,
    selectorDiv: `w-[300px] h-[40px] bg-white rounded-[7px] flex  items-center justify-between px-2 px-4 font-bold text-gray-500 cursor-pointer`,
    mapSelectorDiv: `absolute flex flex-col bg-white text-[1.2rem] w-[300px] h-[300px] overflow-y-scroll top-10 scroll`,
    paragaraph: `text-[12px] p-10 text-center font-bold text-gray-600`,
  }
  const { species, sprites } = (singleUrl as PokemonSingleType) || {}
  const { results } = (pokemonData as PokemonDataType) || {}
  return (
    <section className={style.section}>
      <main className={style.mainContent}>
        <div className={style.picNameWrapper}>
          <div
            onClick={() => setDropDown(!dropDown)}
            className={style.selectorDiv}
          >
            <p>{results && results[pokemonState.selectorIndex]?.name} </p>
            {!dropDown ? <GoArrowDown /> : <GoArrowUp />}
          </div>
          {dropDown && (
            <div className={style.mapSelectorDiv}>
              {results?.map((val: any, index: number) => (
                <button
                  className="hover:bg-gray-300 hover:text-white"
                  onClick={() => {
                    dispatchPokemon({
                      type: 'selector',
                      payload: index,
                    }),
                      setDropDown(!dropDown)
                  }}
                >
                  {val.name}
                </button>
              ))}
            </div>
          )}
          <div className={style.mainDiv}>
            <div className="flex flex-col items-center justify-center">
              <img className={style.img} src={sprites && sprites.front_shiny} />
              <h1 className={style.header}> {species && species.name}</h1>
              <p className={style.paragaraph}>{pokemonDescription}</p>
            </div>
          </div>
        </div>
        <div className={style.btnWrapper}>
          <button
            className={style.btn}
            onClick={() =>
              dispatchPokemon({
                type: 'prev',
              })
            }
          >
            Prev
          </button>
          <button
            className={style.btn}
            onClick={() =>
              dispatchPokemon({
                type: 'next',
              })
            }
          >
            Next
          </button>
        </div>
      </main>
    </section>
  )
}

export default Pokemon
