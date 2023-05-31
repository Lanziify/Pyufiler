import React, { useState } from 'react'
import axios from 'axios'
import { baseURL } from '../utils/constants'
import SelectAddress from '../components/SelectAddress'
import { IoCloseCircleSharp } from 'react-icons/io5'

const Profiler = ({ data, isVisible, onEditState }) => {
  const [age, setAge] = useState('')
  const [gender, setGender] = useState('')
  const [address, setAddress] = useState('')
  const [clearAddress, setClearAddress] = useState(false)
  const [employment, setEmployment] = useState('')
  const [profiles, setProfiles] = useState([])
  const [error, setError] = useState('')

  const handleGenderSelect = (event) => {
    setGender(event.target.value)
  }
  const handleEmploymentSelect = (event) => {
    setEmployment(event.target.value)
  }

  function handleSaveProfile() {
    const regex = /^(1[8-9]|[2-9][0-9])$/
    if (!age) {
      setError('Age required')
    } else if (!regex.test(age)) {
      setError('Age should range between 18 to 99')
    } else if (!gender) {
      setError('Please select a gender')
    } else if (!address) {
      setError('Please enter address')
    } else if (!employment) {
      setError('Please specify employment status')
    } else {
      postProfile()
    }
  }

  function handleUpdateProfile() {
    const regex = /^(1[8-9]|[2-9][0-9])$/
    if (!age) {
      setError('Age required')
    } else if (!regex.test(age)) {
      setError('Age should range between 18 to 99')
    } else if (!gender) {
      setError('Please select a gender')
    } else if (!address) {
      setError('Please enter address')
    } else if (!employment) {
      setError('Please specify employment status')
    } else {
      updateProfile()
    }
  }

  async function postProfile() {
    try {
      const res = await axios.post(baseURL, {
        age,
        gender,
        address,
        employment,
      })
      setProfiles([...profiles, res.data])
      setAge('')
      setGender('')
      setClearAddress(true)
      setEmployment('')
      setError('')
      isVisible(false)
    } catch (err) {
      setError('Error adding profile')
    }
  }

  async function updateProfile() {
    try {
      const res = await axios.put(`${baseURL}/${data._id}`, {
        age,
        gender,
        address,
        employment,
      })
      setProfiles([...profiles, res.data])
      setAge('')
      setGender('')
      setClearAddress(true)
      setEmployment('')
      setError('')
      isVisible(false)
    } catch (err) {
      setError('Error updating profile')
    }
  }

  return (
    <div
      className={
        'fixed inset-0 z-50 flex flex-col gap-5 justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm'
      }
    >
      {error && (
        <div className='w-fit p-2 bg-red-500 bg-opacity-70 text-white rounded-md ease-in-out duration-300 text-sm'>
          {error}
        </div>
      )}

      <div className='w-fit p-5  bg-gray-100 flex flex-col gap-5 rounded-lg  text-gray-500'>
        <div className='flex justify-between'>
          {!onEditState ? (
            <h1 className='font-bold'>Add New Profile</h1>
          ) : (
            <h1 className='font-bold'>Update Profile</h1>
          )}
          {!onEditState ? (
            <span className='cursor-pointer' onClick={() => isVisible(false)}>
              <IoCloseCircleSharp size={24} className='text-gray-500' />
            </span>
          ) : (
            <span className='cursor-pointer' onClick={() => onEditState(false)}>
              Cancel
            </span>
          )}
        </div>

        {onEditState && (
          <h1 className='bg-gray-200 p-2 rounded-md'>ID: {data._id}</h1>
        )}
        <h1 className='text-lg text-gray-400'>Age</h1>
        {/* Age */}
        <input
          className='p-2 rounded-md bg-gray-200 hover:bg-gray-300 outline-none ease-in-out duration-300 placeholder-gray-500'
          type='number'
          placeholder='Age'
          value={age}
          onChange={(e) => {
            setAge(e.target.value)
          }}
        />

        <h1 className='text-lg text-gray-400'>Gender</h1>
        {/* Gender Selection */}
        <select
          value={gender}
          onChange={handleGenderSelect}
          className='p-2 rounded-md bg-gray-200 hover:bg-gray-300 outline-none ease-in-out duration-300'
        >
          <option value=''>Select a gender</option>
          <option value='Male'>Male</option>
          <option value='Female'>Female</option>
          <option value='Nonbinary'>Non-binary</option>
          <option value='Other'>Other</option>
        </select>
        {/* Location Selection */}
        <h1 className='text-lg text-gray-400'>Address</h1>

        <SelectAddress
          onSelectedAddress={setAddress}
          onClearSelection={clearAddress}
        />

        <h1 className='text-lg text-gray-400'>Employment</h1>

        <select
          value={employment}
          onChange={handleEmploymentSelect}
          className='p-2 rounded-md bg-gray-200 hover:bg-gray-300 outline-none ease-in-out duration-300'
        >
          <option value=''>Select Employment</option>
          <option value='Employed'>Employed</option>
          <option value='Self-employed/Freelance'>
            Self-employed/Freelance
          </option>
          <option value='Unemployed - Not looking for work'>
            Unemployed - Not looking for work
          </option>
          <option value='Unemployed - Looking for work'>
            Unemployed - Looking for work
          </option>
          <option value='Interning'>Interning</option>
          <option value='Homemaker'>Homemaker</option>
          <option value='Studying'>Studying</option>
          <option value='Military/Forces'>Military/Forces</option>
          <option value='Retired'>Retired</option>
          <option value='Not able to work'>Not able to work</option>
          <option value='Other'>Other</option>
        </select>
        <div className='flex flex-row gap-5'>
          {!onEditState ? (
            <button
              className='flex-1 text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5'
              onClick={handleSaveProfile}
            >
              Save details
            </button>
          ) : (
            <button
              className='flex-1 text-white bg-rose-400 hover:bg-rose-500 focus:ring-4 focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5'
              onClick={handleUpdateProfile}
            >
              Update details
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profiler
