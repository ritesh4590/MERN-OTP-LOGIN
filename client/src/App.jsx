import React from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Protected from './Pages/Protected'
import Home from './Pages/Home'
import Authentication from './Pages/Authentication'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Protected Component={Home} />} />
        <Route path='/login' element={<Authentication />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
