import React, { useState } from 'react'
import DataTable from 'react-data-table-component'
import { TbFileExport } from 'react-icons/tb'
import { BiEdit, BiEraser } from 'react-icons/bi'
import { CSVLink } from 'react-csv'

const CustomerProfiles = ({ data, selectedProfile, onEdit, onDelete }) => {
  const [searchProfiles, setSearchProfiles] = useState('')

  const searchedItems = data.filter((item) => {
    return (
      item._id.toLowerCase().includes(searchProfiles.toLowerCase()) ||
      item.address.toLowerCase().includes(searchProfiles.toLowerCase())
    )
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
      width: '30rem',
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
            className='p-2 rounded-lg text-gray-400 hover:bg-gray-400 hover:text-white ease-in-out duration-500'
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

  const csvHeaders = [
    { label: 'Customer ID', key: '_id' },
    { label: 'Age', key: 'age' },
    { label: 'Gender', key: 'gender' },
    { label: 'Address', key: 'address' },
    { label: 'Employment', key: 'employment' },
  ]

  const csvData = searchedItems.map((item) => ({
    _id: item._id,
    age: item.age,
    gender: item.gender,
    address: item.address,
    employment: item.employment,
  }))

  return (
    <div className='customer-table flex flex-col text-center overflow-auto rounded-2xl'>
      <div className='flex p-5 justify-between'>
        <input
          className='flex-0 p-2 rounded-md text-sm bg-gray-300 hover:bg-gray-200 outline-none ease-in-out duration-300 placeholder-gray-500'
          value={searchProfiles}
          type='text'
          placeholder='Search'
          onChange={(e) => setSearchProfiles(e.target.value)}
        />
        <CSVLink
          data={csvData}
          headers={csvHeaders}
          filename='customer_profiles.csv'
          className='flex px-4 py-1 text-xs justify-end items-center gap-1 rounded-lg text-white bg-gray-400 hover:bg-gray-500 hover:text-white ease-in-out duration-500'
        >
          Export CSV
          <TbFileExport size={16} />
        </CSVLink>
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
