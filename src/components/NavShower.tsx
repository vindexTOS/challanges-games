import React from 'react'
import { useContextMain } from '../react_challanges/context'
import { GoThreeBars } from 'react-icons/go'
const NavShower = () => {
  const { navBarShow, setNavBarShow } = useContextMain()
  return (
    <div
      className={`text-white text-[3rem] absolute cursor-pointer textShaddow z-40  ${
        navBarShow && 'hidden'
      }`}
      onMouseOver={() => setNavBarShow(!navBarShow)}
      onClick={() => {
        !navBarShow && setNavBarShow(!navBarShow)
      }}
    >
      <GoThreeBars className="textShaddow text-gray-500 z-40 " />
    </div>
  )
}

export default NavShower
