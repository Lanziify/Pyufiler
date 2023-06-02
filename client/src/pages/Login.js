import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { onboardingURL } from '../utils/constants'
import { FaCarrot } from 'react-icons/fa'

const Login = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await axios.post(`${onboardingURL}/login`, {
        email,
        password,
      })
      const { accessToken } = response.data

      // Save the token in localStorage or as needed for authentication
      localStorage.setItem('accessToken', accessToken)

      // Redirect to the desired page after successful login
      navigate('/dashboard')
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <div className='font-poppins flex p-5 justify-center items-center h-screen'>
      <div className='flex md:flex-row sm:flex-col w-auto shadow-md rounded-md overflow-hidden'>
        <div className='flex flex-col justify-center items-center md:w-48 sm:w-auto gap-5 p-5 font-bold bg-rose-400 text-white'>
          <FaCarrot size={84} />
          <span>Pyufiler</span>
        </div>
        <form className=' bg-white px-8 pt-6 pb-8' onSubmit={handleSubmit}>
          <h2 className='text-2xl text-center text-gray-400 font-bold mb-6'>
            Log in to your account
          </h2>
          {error && <div className='text-red-500 mb-4'>{error}</div>}
          <div className='mb-4'>
            <label className='block text-gray-500 text-sm mb-2' htmlFor='email'>
              Email
            </label>
            <input
              className='shadow appearance-none border rounded-md text-sm w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              id='email'
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-6'>
            <label
              className='block text-gray-500 text-sm mb-2'
              htmlFor='password'
            >
              Password
            </label>
            <input
              className='shadow appearance-none border border-red rounded-md text-sm w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
              id='password'
              type='password'
              placeholder='Password'
              value={password}
              autoComplete='true'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='flex items-center justify-between'>
            <button
              className='bg-rose-300 hover:bg-rose-400 text-white py-2 px-4 rounded-md w-full focus:outline-none focus:shadow-outline ease-in-out duration-300'
              type='submit'
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
