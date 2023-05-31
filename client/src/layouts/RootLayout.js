import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function RootLayout({ Children }) {
  return (
    <>
      <Navbar></Navbar>
      <Sidebar />
      <div className='root-content font-poppins md:ml-16 sm:ml-0 pt-16'>
        <div>{Children}</div>
        <Outlet />
      </div>
    </>
  )
}

export default RootLayout
