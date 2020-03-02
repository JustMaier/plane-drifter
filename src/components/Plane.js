import React, { useState } from 'react'
import DriftVision from './DriftVision'
import DriftControls from './DriftControls'
import PlaneSelector from './PlaneSelector'

const Plane = ({ children }) => {
  const [planeContent, setPlaneContent] = useState(window.localStorage.plane ? JSON.parse(window.localStorage.plane) : null)
  const [contentIndex, setContentIndex] = useState(window.localStorage.contentIndex ? JSON.parse(window.localStorage.contentIndex) : 0)
  const permaSetContentIndex = (fn) => setContentIndex(i => {
    const val = fn(i)
    window.localStorage.contentIndex = val
    return val
  })
  const permaSetPlaneContent = (plane) => {
    if (plane) window.localStorage.plane = JSON.stringify(plane)
    else delete window.localStorage.plane
    setPlaneContent(plane)
  }
  const actions = {
    next: () => permaSetContentIndex(i => i < (planeContent.length - 1) ? i + 1 : 0),
    prev: () => permaSetContentIndex(i => i === 0 ? planeContent.length - 1 : i - 1),
    eject: () => permaSetPlaneContent(null)
  }

  if (!planeContent) {
    const selectPlane = (arr) => {
      permaSetPlaneContent(arr)
      permaSetContentIndex(i => 0)
    }
    return <PlaneSelector onSelect={(arr) => selectPlane(arr)} />
  }

  return (
    <div className='plane'>
      <DriftVision content={planeContent[contentIndex]} />
      <DriftControls actions={actions} />
    </div>
  )
}

export default Plane
