import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { BiEdit, BiEraser } from 'react-icons/bi'

const CustomerProfiles = ({ data, selectedProfile, onEdit, onDelete }) => {
  const [searchProfiles, setSearchProfiles] = useState('')

  const searchedItems = data.filter((item) => {
    return item.address.toLowerCase().includes(searchProfiles.toLowerCase())
  })

  const columns = [
    {
      name: 'Customer ID',
      selector: (data) => data._id,
      sortable: true,
      // width: '24rem'
    },
    {
      name: 'Age',
      selector: (data) => data.age,
      sortable: true,
      // width: '8rem'
    },
    {
      name: 'Gender',
      selector: (data) => data.gender,
      sortable: true,
    },
    {
      name: 'Address',
      selector: (data) => data.address,
      sortable: true,
      width: '20rem'
    },
    {
      name: 'Employment',
      selector: (data) => data.employment,
      sortable: true,
    },
    {
      name: 'Actions',
      button: true,
      cell: (p) => (
        <div className='flex gap-2'>
          <button
            onClick={() => {
              onEdit(true)
              selectedProfile(p)
            }}
            className='p-2 rounded-lg text-gray-400 hover:bg-gray-50 hover:text-white ease-in-out duration-500'
          >
            <BiEdit size={20} />
          </button>
          <button
            onClick={() => onDelete(p._id)}
            className='p-2 rounded-lg text-red-400 hover:bg-red-400 hover:text-white ease-in-out duration-500'
          >
            <BiEraser size={20} />
          </button>
        </div>
      ),
      width: '8rem'
    },
  ]

  const tableStyle = {
    headRow: {
      style: {
        backgroundColor: '#ecf0f3',
      },
    },
    noData: {
      style: {
        backgroundColor: '#ecf0f3',
        padding: 20,
      },
    },
    rows: {
      style: {
        backgroundColor: '#ecf0f3',
      },
    },
    pagination: {
      style: {
        backgroundColor: '#ecf0f3',
      },
    },
  }

  return (
    <div className='customer-table flex flex-col text-center overflow-auto rounded-2xl'>
      <div className='flex p-5'>
        <input
          className='grow p-2 rounded-md text-sm bg-gray-300 hover:bg-gray-200 outline-none ease-in-out duration-300 placeholder-gray-500'
          value={searchProfiles}
          type='text'
          placeholder='Search'
          onChange={e => setSearchProfiles(e.target.value)}
        />
      </div>
      <div className='data-table lg:text-md md:text-xs sm:text-xs'>
        <DataTable
          columns={columns}
          data={searchedItems}
          pagination
          customStyles={tableStyle}
        />
      </div>
    </div>
  )
}

export default CustomerProfiles
