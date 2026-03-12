import React from 'react'
import { Route, Routes } from 'react-router'

import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NodeDetailPage from './pages/NodeDetailPage'


const App = () => {
  return (
    <div data-theme="forest">
      <button className='btn btn-primary'> click me</button>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/node/:id" element={<NodeDetailPage />} />
      </Routes>
    </div>
  )
}

export default App