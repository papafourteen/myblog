import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { createContext } from 'react'


const postCategories=['Sport','Food','Health','Culture','Travel']

export const CategContext=createContext()

export const CategProvider = ({children}) => {
    const [categories,setCategories]=useState(null)
    useEffect(()=>{
        setCategories(postCategories)
    },[])

  return (
    <CategContext.Provider value={{categories}}>
        {children}
    </CategContext.Provider>
  )
}
