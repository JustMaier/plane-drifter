import React from 'react'
import Markdown from 'react-markdown'

const TextRegex = /^(\\?\[?(.*?)\\?\])?\s*(.+)/s

const parseStyles = styles => styles
  .split(';')
  .filter(style => style.split(':')[0] && style.split(':')[1])
  .map(style => [
    style.split(':')[0].trim().replace(/-./g, c => c.substr(1).toUpperCase()),
    style.split(':').slice(1).join(':').trim()
  ])
  .reduce((styleObj, style) => ({
    ...styleObj,
    [style[0]]: style[1]
  }), {})

const TextVision = ({ content }) => {
  const textParts = content.replace('\\[', '[').replace('\\]', ']').match(TextRegex)
  const style = textParts[2] ? parseStyles(textParts[2]) : null
  const text = textParts[3].replace(/\\\*/g, '*')
  return (
    <div className={`text-vision ${text.length > 200 ? 'long' : ''}`} style={style}>
      <div className='text-vision-content'>
        <Markdown source={text} />
      </div>
    </div>
  )
}

const UrlRegex = /^https?:\/\//
export const isText = (content) => !UrlRegex.test(content)

export default TextVision
