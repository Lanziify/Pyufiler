import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  MdSpaceDashboard,
  MdPeople,
  MdSettings,
  MdOutlineInfo,
  MdChevronLeft,
} from 'react-icons/md'

import { FaCarrot } from 'react-icons/fa'

const Sidebar = () => {
  const [openSideBar, setOpenSideBar] = useState(false)

  const menuItems = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      icon: <MdSpaceDashboard />,
    },
    {
      path: '/customers',
      name: 'Customers',
      icon: <MdPeople />,
    },
    {
      path: '/settings',
      name: 'Settings',
      icon: <MdSettings />,
    },
    {
      path: '/about',
      name: 'About',
      icon: <MdOutlineInfo />,
    },
  ]

  return (
    <>
      <div
        className={`${
          openSideBar &&
          'absolute inset-0 z-40 bg-black bg-opacity-30 backdrop-blur-sm ease-in-out duration-700'
        }`}
      >
        <div
          className={`bg-rose-400  left-0 fixed ${
            openSideBar
              ? 'w-72 opacity-80'
              : 'md:w-16 md:p-3 sm:w-16 md:left-0 sm:-left-16 opacity-100 '
          } h-screen p-3 font-poppins text-gray-50 text-md z-50 ease-in-out duration-700`}
        >
          {/* Side Menu Icon */}
          <MdChevronLeft
            className={`menu absolute w-fit p-1 md:-right-5 sm:-right-8 sm:top-3.5 text-4xl rounded-md bg-rose-400 text-gray-50  ${
              !openSideBar && 'rotate-180'
            } ${
              openSideBar ? 'md:-right-5 sm:right-3' : ''
            } ease-in-out duration-500`}
            onClick={() => setOpenSideBar(!openSideBar)}
          />
          <div className='flex flex-col justify-center items-center my-16  '>
            <div
              className={`text-2xl ${
                openSideBar && 'text-6xl'
              }  ease-in-out duration-700`}
            >
              <FaCarrot />
            </div>
            <h1
              className={`self-stretch   mt-2 font-bold text-2xl text-center ${
                !openSideBar && 'opacity-0 blur-xl'
              } ease-in-out duration-500`}
            >
              Pyufiler
            </h1>
          </div>

          {menuItems.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className={({ isActive }) => {
                return (
                  'flex  gap-5 p-2 items-center rounded-md ' +
                  (isActive
                    ? 'bg-gray-50 text-rose-400'
                    : 'text-sm hover:bg-rose-500 hover:text-rose-300 text-gray-50')
                )
              }}
              onClick={() => setOpenSideBar(false)}
            >
              <div
                className={`text-2xl ${
                  !openSideBar && 'm-auto '
                } ease-in-out duration-500`}
              >
                {item.icon}
              </div>
              <div
                className={`grow ${
                  !openSideBar && 'scale-0 blur-xl'
                } ease-in-out duration-300`}
              >
                {item.name}
              </div>
            </NavLink>
          ))}
          
        </div>
      </div>
    </>
  )
}

export default Sidebar
