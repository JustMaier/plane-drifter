import React, { useState, useEffect } from 'react'
import YouTubeVision from './YouTubeVision'

const fetchRedditMedia = async (url) => {
  const id = url.match(RedditRegex)[1]
  let { data: { children: [{ data: post }] } } = await (await fetch(`https://api.reddit.com/api/info/?id=t3_${id}`)).json()
  if (post.crosspost_parent) post = post.crosspost_parent_list[0]
  const type = post.is_video ? 'video' : post.selftext ? 'text' : 'url'
  const content = type === 'video' ? post.media.reddit_video.fallback_url : type === 'text' ? post.selftext : post.url
  return { type, content }
}

const RedditRegex = /.*reddit\.com.+\/comments\/(\w{6})\//
const RedditVision = ({ content }) => {
  const [media, setMedia] = useState({ type: null, content: null })
  useEffect(() => { fetchRedditMedia(content).then(setMedia) }, [content])

  let vision = <p>Loading from Reddit...</p>
  if (media.type === 'video') vision = <video src={media.content} controls autoPlay loop />
  else if (media.type === 'text') vision = <div>{media.content}</div>
  else if (media.type === 'url') {
    if (media.content.endsWith('gifv')) vision = <video src={media.content.replace('.gifv', '.mp4')} controls autoPlay loop />
    else if (media.content.includes('gfycat.com')) vision = <iframe src={media.content.replace('.com/', '.com/ifr/')} />
    else if (media.content.includes('youtu')) vision = <YouTubeVision content={media.content} />
    else vision = <img src={media.content} />
  }

  return (
    <div className='reddit-vision'>{vision}</div>
  )
}

export const isReddit = (url) => RedditRegex.test(url)

export default RedditVision
