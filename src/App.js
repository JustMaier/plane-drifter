import React from 'react'
import './App.scss'
import Plane from './components/Plane'
import { IconContext } from 'react-icons'

function App () {
  return (
    <IconContext.Provider value={{ className: 'react-icons' }}>
      <div className='App'>
        <Plane />
      </div>
    </IconContext.Provider>
  )
}

export default App
