import React from 'react'
import { MdNavigateNext, MdEject, MdNavigateBefore } from 'react-icons/md'

const DriftButton = ({ variant, ...props }) => (
  <button {...props}>{props.children}</button>
)

const DriftControls = ({ actions }) => {
  return (
    <div className='drift-controls'>
      <DriftButton onClick={() => actions.prev()}><MdNavigateBefore /></DriftButton>
      <DriftButton onClick={() => actions.eject()}><MdEject /></DriftButton>
      <DriftButton onClick={() => actions.next()}><MdNavigateNext /></DriftButton>
    </div>
  )
}

export default DriftControls
