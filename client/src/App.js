import React from 'react'
import { Route, Routes } from 'react-router-dom'

// import Navbar from './components/Navbar'

// IMPORT PAGES
import Login from './pages/Login'
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
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/' element={<RootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
