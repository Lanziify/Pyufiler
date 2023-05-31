import React, { useEffect, useState } from 'react'
import { useInterval } from 'react-use'
import axios from 'axios'
import { baseURL } from '../utils/constants'
import { MdPeople, MdAccessTime, MdLocationOn } from 'react-icons/md'

function Dashboard() {
  const [profiles, setProfiles] = useState([])
  const [recentProfiles, setRecentProfiles] = useState([])
  const [weeklyProfiles, setWeeklyProfiles] = useState([])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [error, setError] = useState('')

  useEffect(() => {
    axios
      .get(baseURL)
      .then((res) => {
        setProfiles(res.data)
      })
      .catch((err) => setError('Error fetching profiles'))
  }, [])

  const dashboardItems = [
    {
      title: 'Profiles',
      icon: <MdPeople />,
      value: profiles.length,
    },
    {
      title: 'Average Age',
      icon: <MdAccessTime />,
      value: getAverageAge(profiles),
    },
    {
      title: 'Unique Address',
      icon: <MdLocationOn />,
      value: getUniqueAddresses(profiles),
    },
    {
      title: 'Employment status',
      icon: <MdLocationOn />,
      value: getUniqueEmployment(profiles),
    },
  ]

  function getAverageAge(profiles) {
    const totalAge = profiles.reduce((sum, profile) => sum + profile.age, 0)
    const averageAge = totalAge / profiles.length
    return averageAge.toFixed(0) // Return the average age with no decimal places
  }

  function getUniqueAddresses(profiles) {
    const addresses = profiles.map((profile) => profile.address)
    const uniqueAddresses = addresses.filter(
      (address, index) => addresses.indexOf(address) === index
    )
    return uniqueAddresses.length
  }

  function getUniqueEmployment(profiles) {
    const employments = profiles.map((profile) => profile.employment)
    const uniqueEmployment = employments.filter(
      (employment, index) => employments.indexOf(employment) === index
    )
    return uniqueEmployment.length
  }

  useEffect(() => {
    axios
      .get(baseURL)
      .then((res) => {
        const currentDate = new Date()
        const profilesToday = res.data.filter((profile) => {
          const profileDate = new Date(profile.createdAt)
          return (
            profileDate.getFullYear() === currentDate.getFullYear() &&
            profileDate.getMonth() === currentDate.getMonth() &&
            profileDate.getDate() === currentDate.getDate()
          )
        })
        setRecentProfiles(profilesToday)
      })
      .catch((err) => setError('Error fetching profiles'))
  }, [])

  useEffect(() => {
    axios
      .get(baseURL)
      .then((res) => {
        const profilesPastWeek = res.data.filter((profile) => {
          const profileDate = new Date(profile.createdAt)
          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7) // Set the date to 7 days ago
          return profileDate >= weekAgo && profileDate <= currentDate
        })
        setWeeklyProfiles(profilesPastWeek)
      })
      .catch((err) => setError('Error fetching profiles'))
  }, [currentDate])

  useInterval(() => {
    setCurrentDate(new Date())
  }, 1000)

  return (
    <div className='content overflow-auto py-5 lg:px-16 md:px-12 sm:px-5 ease-in-out duration-300'>
      {error && (
        <h1 className='text-lg font-bold text-center text-gray-500'>{error}</h1>
      )}
      <h1 className='text-2xl font-bold text-gray-400 mb-5'>Dashboard</h1>
      <div className='flex gap-5 px-5 mb-10 justify-center flex-wrap'>
        {dashboardItems.map((item, index) => (
          <div
            className='dash-components flex gap-3 py-3 px-6 flex-1 items-center rounded-lg ease-in-out duration-300'
            key={index}
          >
            <div className='bg-rose-300 p-3 rounded-full text-white text-4xl'>
              {item.icon}
            </div>
            <div className='w-42 flex gap-1 flex-col grow'>
              <span className='text-sm text-gray-400  truncate'>
                {item.title}
              </span>
              <span className='text-2xl text-gray-500 '>{item.value}</span>
            </div>
          </div>
        ))}
      </div>
      <div className='flex lg:flex-row md:flex-col sm:flex-col h-auto gap-5'>
        <div className='flex-1'>
          <span className='text-sm text-gray-400'>Recently Added</span>
          <div className='no-scrollbar w-auto md:h-80 sm:h-40 grid grid-cols-1 gap-5 p-2 my-5 rounded-md text-sm justify-center overflow-auto'>
            {recentProfiles.map((profile, index) => (
              <div
                className='profiles-dashboard flex p-3 gap-3 items-center text-gray-500 rounded-lg shadow-md'
                key={index}
              >
                <div className='flex w-20 h-20 rounded-full border-2 text-gray-50'>
                  <span className='m-auto font-bold text-2xl'>{index + 1}</span>
                </div>
                <div className='text-xs'>
                  <p>
                    <span className='font-bold'>ID:</span> {profile._id}
                  </p>
                  <p>
                    <span className='font-bold'>Age:</span> {profile.age}
                  </p>
                  <p>
                    <span className='font-bold'>Gender:</span> {profile.gender}
                  </p>
                  <p>
                    <span className='font-bold'>Address:</span>{' '}
                    {profile.address}
                  </p>
                  <p>
                    <span className='font-bold'>Employment:</span>{' '}
                    {profile.employment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex-1'>
          <span className='text-sm text-gray-400'>Profiles this week</span>
          <div className='no-scrollbar w-auto md:h-80 sm:h-40 grid grid-cols-1 gap-5 p-2 my-5 rounded-md text-sm justify-center overflow-auto'>
            {weeklyProfiles.map((profile, index) => (
              <div
                className='profiles-dashboard flex p-3 gap-3 items-center text-gray-500 rounded-lg shadow-md'
                key={index}
              >
                <div className='flex w-20 h-20 rounded-full border-2 text-gray-50'>
                  <span className='m-auto font-bold text-2xl'>{index + 1}</span>
                </div>
                <div className='text-xs'>
                  <p>
                    <span className='font-bold'>ID:</span> {profile._id}
                  </p>
                  <p>
                    <span className='font-bold'>Age:</span> {profile.age}
                  </p>
                  <p>
                    <span className='font-bold'>Gender:</span> {profile.gender}
                  </p>
                  <p>
                    <span className='font-bold'>Address:</span>{' '}
                    {profile.address}
                  </p>
                  <p>
                    <span className='font-bold'>Employment:</span>{' '}
                    {profile.employment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
