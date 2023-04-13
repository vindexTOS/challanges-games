import React from 'react'
import { Link } from 'react-router-dom'
import { useContextMain, ProjectsData } from '../react_challanges/context'
import { useLocation } from 'react-router-dom'
import { motion as m } from 'framer-motion'
const Navbar = () => {
  const location = useLocation()
  const { ProjectDataState, setNavBarShow, navBarShow } = useContextMain()
  const style = {
    nav: `w-[300px] h-[400px] z-40 flex  flex-col text-[1.5rem] font-medium  py-10  gap-1 text-gray-100 textShaddow bg-blue-600 absolute bg-opacity-30`,
  }
  return (
    <m.nav
      initial={{ x: -5000 }}
      animate={{ x: navBarShow ? 0 : -1000 }}
      className={style.nav}
      onMouseLeave={() => setNavBarShow(!navBarShow)}
    >
      <Link
        className={`hover:bg-blue-300 outline-[1px] w-[300px] flex py-2 items-center pl-20`}
        to="/"
      >
        Home
      </Link>
      {ProjectDataState.map((val: ProjectsData) => (
        <Link
          className={`hover:bg-blue-300 outline-[1px] w-[300px] flex py-2 items-center pl-20 ${
            location.pathname === val.link && 'bg-blue-400'
          }`}
          key={String(val.link)}
          to={val.link}
        >
          {val.title}
        </Link>
      ))}
    </m.nav>
  )
}

export default Navbar
