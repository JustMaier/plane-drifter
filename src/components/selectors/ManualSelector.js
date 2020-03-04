import React, { useState, useEffect } from 'react'

const readFile = (file) => new Promise((resolve, reject) => {
  const reader = new window.FileReader()
  reader.addEventListener('load', () => {
    resolve(reader.result)
  })
  reader.readAsText(file)
})

const ManualSelector = ({ onSelect }) => {
  const [content, setContent] = useState(null)
  const [source, setSource] = useState(window.localStorage.planeSource || null)
  const setContentFromString = (string) => setContent(string.split('\n').filter(x => !!x).map(x => x.trim()))

  useEffect(() => {
    if (source) setContentFromString(source)
  }, [source])
  const onFileChange = async ({ target: { files: [file] } }) => {
    const contentString = await readFile(file)
    setContentFromString(contentString)
  }

  const onTextChange = (e) => {
    setSource(e.target.value)
    window.localStorage.planeSource = e.target.value
  }

  return (
    <>
      <div className='form-group'>
        <label>Select your Plane file</label>
        <input type='file' accept='.txt' onChange={onFileChange} />
      </div>
      <div className='form-group mt'>
        <label><em>Or</em> paste the Plane source here:</label>
        <textarea rows='3' onChange={onTextChange} value={source} />
      </div>
      { !content ? null : (
        <div className='mt mb'>
            You've selected a Plane with {content.length} stops
        </div>
      )}
      <button type='button' className='btn btn-block mt' onClick={() => onSelect(content)} disabled={!content || content.length === 0}>Start Drifting</button>
    </>
  )
}

export default ManualSelector
