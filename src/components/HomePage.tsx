import React from 'react'
import { Link } from 'react-router-dom'
import { useContextMain, ProjectsData } from '../react_challanges/context'
const HomePage = () => {
  const { ProjectDataState } = useContextMain()

  const style = {
    mainDiv: ` bg-green-200 w-[100%] h-[100vh] flex flex-wrap items-center gap-2 justify-center`,
    img: `w-[400px] h-[200px] rounded-[8px]`,
    mapDiv: `flex flex-col items-center justify-center bg-gray-700 rounded-[8px] `,
    header: `text-[2rem] font-medium text-gray-300 hover:text-blue-300 w-[100%] flex items-center justify-center`,
  }
  return (
    <div className={style.mainDiv}>
      {ProjectDataState.map((val: ProjectsData) => (
        <div className={style.mapDiv} key={String(val.link)}>
          <Link className={style.header} to={val.link}>
            {val.title}
          </Link>
          <img className={style.img} src={val.img} />
        </div>
      ))}
    </div>
  )
}

export default HomePage
