import React from 'react'

import { useState } from 'react'
import { TipTap } from './TipTap';

export const Story = ({story,setStory}) => {
    
  return (
    <div >  
        <TipTap  story={story} setStory={setStory}/>
    </div>
  )
}

