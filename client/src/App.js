import React from 'react'
import { Route, Routes } from 'react-router-dom'

// import Navbar from './components/Navbar'

// IMPORT PAGES
import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import Settings from './pages/Settings'
import About from './pages/About'
import NotFound from './pages/NotFound'
import RootLayout from './layouts/RootLayout'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/Customers' element={<Customers />} />
          <Route path='/Settings' element={<Settings />} />
          <Route path='/About' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
