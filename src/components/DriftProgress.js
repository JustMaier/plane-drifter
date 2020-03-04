import React from 'react'

const DriftProgress = ({ currentPosition, totalStops }) => {
  const progress = ((totalStops <= 0 ? 0 : currentPosition / totalStops) * 100).toFixed(2)
  return (
    <div className='drift-progress'>
      <div className='fill' style={{ width: `${progress}%` }} />
    </div>
  )
}

export default DriftProgress
