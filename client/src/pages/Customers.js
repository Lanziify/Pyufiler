import React, { Fragment, useEffect, useState } from 'react'
import CustomerProfiles from '../components/CustomerProfiles'
import axios from 'axios'
import { baseURL } from '../utils/constants'
import Profiler from '../components/Profiler'

function Customers() {
  const [profiles, setProfiles] = useState([])
  const [error, setError] = useState('')
  const [editProfile, setEditProfile] = useState([])
  const [showEditModal, setShowEditModal] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Fetch all profiles from database
  useEffect(() => {
    axios
      .get(baseURL)
      .then((res) => {
        setProfiles(res.data)
      })
      .catch((err) => setError('Error fetching profiles'))
  }, [])

  async function hanleOnRemoveProfile(profileId) {
    try {
      await axios.delete(`${baseURL}/${profileId}`)
      setProfiles(profiles.filter((p) => p._id !== profileId))
    } catch (err) {
      setError('Error deleting profile')
    }
  }
  
  return (
    <>
      <Fragment>
        <div className='content overflow-auto py-5 lg:px-16 md:px-12 sm:px-5 ease-in-out duration-300'>
          {error && (
            <h1 className='text-lg font-bold text-center text-gray-500'>
              {error}
            </h1>
          )}
          <div className='flex justify-between lg:flex-row md:flex-row sm:flex-col items-center mb-5 ease-in-out duration-300'>
            <h1 className='text-lg font-bold text-center text-gray-500'>
              Customer Profiles
            </h1>
            <button
              className='py-2 px-4 text-xs rounded-lg bg-rose-400 hover:bg-rose-500 md:mt-0 sm:mt-3 sm:self-end text-white shadow-md ease-in-out duration-300'
              onClick={() => setShowModal(true)}
            >
              Add Profile
            </button>
          </div>

          <CustomerProfiles
            data={profiles}
            onEdit={setShowEditModal}
            selectedProfile={setEditProfile}
            onDelete={hanleOnRemoveProfile}
          />
        </div>

        {showModal && <Profiler isVisible={setShowModal} />}

        {showEditModal && (
          <Profiler
            data={editProfile}
            isVisible={setShowEditModal}
            onEditState={setShowEditModal}
          />
        )}
      </Fragment>
    </>
  )
}

export default Customers
