import React from 'react'

const YouTubeRegex = /(youtu\.be\/|youtube\.com\/(watch\?(.*&)?v=|(embed|v)\/))([^?&"'>]+)/

function YouTubeVision ({ content }) {
  const id = content.match(YouTubeRegex)[5]
  return (
    <div className='youtube-vision'>
      <iframe title='YouTube' width='560' height='315' src={`https://www.youtube.com/embed/${id}?&autoplay=1`} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen />
    </div>
  )
}

export const isYoutube = (url) => YouTubeRegex.test(url)

export default YouTubeVision
