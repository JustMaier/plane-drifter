import React from 'react'
import YouTubeVision, { isYoutube } from './visions/YouTubeVision'
import RedditVision, { isReddit } from './visions/RedditVision'
import TextVision, { isText } from './visions/TextVision'

// Get Reddit JSON and then parse content out...

const DriftVision = ({ content }) => {
  let vision = <iframe src={content} />
  if (isText(content)) vision = <TextVision content={content} />
  else if (isYoutube(content)) vision = <YouTubeVision content={content} />
  else if (isReddit(content)) vision = <RedditVision content={content} />

  return (
    <div className='drift-vision'>
      {vision}
    </div>
  )
}

export default DriftVision
