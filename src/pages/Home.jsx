import React,{useState} from 'react'
import { Categories } from '../components/Categories'
import { Posts } from '../components/Posts'
import './Home.css'
import { PopularPosts } from '../components/PopularPosts'

export const Home = () => {
  const [selectedCategories,setSelectedCategories] =useState([])
  return (
    <div className='home'>
      <div className="categ shadow">
         
        <Categories  selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
        <PopularPostsMemoized />
      </div>
      <div className="posts">
        <Posts selectedCategories={selectedCategories}/>
      </div>
      
    </div>
  )
}
//memoizálás
const PopularPostsMemoized=React.memo(PopularPosts)
