import React from 'react'
import { useState } from 'react'
import { Story } from '../components/Story'

export const About = () => {
  const [story,setStory]=useState('')
  console.log(story);
  return (
    <div className='about'>
      <h1>About</h1>
      <Story  setStory={setStory}/>
    </div>
  )
}

