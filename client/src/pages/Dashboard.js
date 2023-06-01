import React, { useEffect, useState } from 'react'
import { useInterval } from 'react-use'
import axios from 'axios'
import { baseURL } from '../utils/constants'
import { MdPerson, MdPeople, MdAccessTime, MdLocationOn } from 'react-icons/md'

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
  }, [])

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
          <div className='added-components no-scrollbar w-auto p-2 my-5 rounded-md text-sm justify-center overflow-auto'>
            {recentProfiles.map((profile, index) => (
              <div
                className='profiles-dashboard h-fit px-2 py-1 items-center text-gray-500 rounded-lg'
                key={index}
              >
                <div className='flex gap-1 text-xs items-center'>
                  <MdPerson className='text-rose-300' size={24}/>
                    <span>ID: {profile._id}</span> 
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='flex-1'>
          <span className='text-sm text-gray-400'>Added this week</span>
          <div className='added-components no-scrollbar w-auto p-2 my-5 rounded-md text-sm justify-center overflow-auto'>
            {weeklyProfiles.map((profile, index) => (
              <div
                className='profiles-dashboard h-fit px-2 py-1 items-center text-gray-500 rounded-lg'
                key={index}
              >
                <div className='flex gap-1 text-xs items-center'>
                  <MdPerson className='text-rose-300' size={24}/>
                    <span>ID: {profile._id}</span> 
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
