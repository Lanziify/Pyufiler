import React from 'react'
import { Link } from 'react-router-dom'
import { FaCarrot } from 'react-icons/fa'

const Navbar = () => {
  return (
    <>
      <nav className='navbar flex h-16 px-10 justify-between  fixed w-screen shadow-sm text-gray-500 font-poppins z-30'>
        <div className='flex gap-2 md:ml-16 sm:ml-0 self-center text-gray-400 font-bold'>
          <FaCarrot size={24} />
          <h1>Pyufiler</h1>
        </div>
        <div className='self-center'>
          <ul className='flex gap-5'>
            <li>
              <Link>Dashboard</Link>
            </li>
            <li>
              <Link>Profiles</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
