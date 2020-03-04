import React, { useState, useEffect } from 'react'

const LinkRegex = /\[(.*)\]\((.*)\)/
const CodeRegex = / {4}/g
const processStop = string => {
  if (LinkRegex.test(string)) return string.match(LinkRegex)[2]
  else if (CodeRegex.test(string)) return string.replace(CodeRegex, '')
  return string
}

const ContentRegex = /(.*)\n\n#\s*Stops\n*(.*)/is
const fetchPosts = async () => {
  const { data: { children: posts } } = await (await fetch(`https://www.reddit.com/r/HigherPlane/hot/.json`)).json()
  return posts.map(x => x.data).filter(x => ContentRegex.test(x.selftext)).map(x => {
    const [full, description, contentString] = x.selftext.match(ContentRegex)
    const content = contentString.split('\n\n').map(processStop)
    console.log(content)
    return {
      id: x.id,
      title: x.title,
      url: x.url,
      description,
      content
    }
  })
}

const RedditSelector = ({ onSelect }) => {
  const [posts, setPosts] = useState(null)
  useEffect(() => {
    fetchPosts().then(setPosts)
  }, [])

  if (!posts) return <p>Fetching the hottest Higher Planes</p>

  return (
    <div className='reddit-selector'>
      {posts.map(post => (
        <div key={post.id} className='reddit-selector-item' onClick={() => onSelect(post.content)}>
          <p className='title'>{post.title}</p>
          <p className='description'>{post.description}</p>
          <p className='stops'>{post.content.length} stops</p>
        </div>
      ))}
    </div>
  )
}

export default RedditSelector
