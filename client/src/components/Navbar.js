import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaCarrot, FaSignOutAlt } from 'react-icons/fa'
import axios from 'axios'
import { onboardingURL } from '../utils/constants'

const Navbar = () => {
  const navigate = useNavigate()
  const [admin, setAdmin] = useState([])
  const [error, setError] = useState('')

  const logout = () => {
    // Perform any necessary cleanup or API calls here

    // Clear the access token from localStorage or wherever it is stored
    localStorage.removeItem('accessToken')

    // Redirect to the login page
    navigate('/login')
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')

    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }

    axios
      .get(`${onboardingURL}/current`, config)
      .then((res) => {
        localStorage.getItem('accessToken')
        setAdmin(res.data)
      })
      .catch((err) => setError(err.response.data.message))
  }, [])

  return (
    <>
      <nav className='navbar flex h-16 px-10 justify-between text-sm fixed w-screen shadow-sm text-gray-500 font-poppins z-30'>
        <div className='flex gap-2 md:ml-16 sm:ml-0 self-center text-gray-400 font-bold'>
          <FaCarrot size={24} />
          <h1>Pyufiler</h1>
        </div>
        <div className='self-center'>
          <ul className='flex gap-3 items-center'>
            {error && (
              <li>
                <div className='text-red-500'>{error}</div>
              </li>
            )}
            <li>
              <div className='py-2 px-4 bg-gray-500 text-gray-50 rounded-md'>
                {admin.email}
              </div>
            </li>
            <li>
              <button
                className='flex gap-2 p-2 items-center rounded-md hover:bg-rose-300 hover:text-gray-50 text-gray-500 ease-in-out duration-300'
                onClick={logout}
              >
                <FaSignOutAlt className='text-xl' />
                <div>Logout</div>
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar
