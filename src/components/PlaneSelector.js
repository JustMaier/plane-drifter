import React, { useState } from 'react'
import { MdCloudUpload } from 'react-icons/md'
import ManualSelector from './selectors/ManualSelector'
import RedditSelector from './selectors/RedditSelector'

const PlaneSelector = ({ onSelect }) => {
  const [manualSource, setManualSource] = useState(false)

  return (
    <div className='plane-selector'>
      <div className='plane-selector-content'>
        <div className='d-flex'>
          <h2>Drift on a Higher Plane</h2>
          <button className={`btn-icon ml-auto ${manualSource ? 'active' : ''}`} onClick={() => { setManualSource(x => !x) }}><MdCloudUpload /></button>
        </div>
        { manualSource ? <ManualSelector onSelect={onSelect} /> : <RedditSelector onSelect={onSelect} />}
      </div>
    </div>
  )
}

export default PlaneSelector
