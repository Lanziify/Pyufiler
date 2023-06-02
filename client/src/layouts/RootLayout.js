import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

function RootLayout({ Children }) {
  const navigate = useNavigate()

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    if (!accessToken) {
      navigate('/login')
    }
  }, [])

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
