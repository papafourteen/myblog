import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { deleteFile, deletePost, editLikes, readPost } from '../utility/crudUtility'
import parse from 'html-react-parser'
import {FaPen, FaThumbsUp, FaTrash} from 'react-icons/fa6'
import { useContext } from 'react'
import {UserContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useConfirm } from "material-ui-confirm";
import { MyAlert } from '../components/MyAlert'
import './Detail.css'

export const Detail = () => {
  const {user}=useContext(UserContext)
  const [post,setPost]=useState(null)
  const navigate=useNavigate()
  const params=useParams()
  const confirm=useConfirm()
  const [msg,setMsg]=useState('')
  const [likes,setLikes]=useState(null)
  //console.log(params.id);

  useEffect(()=>{
    readPost(params.id,setPost,setLikes)
  },[])

const handleDelete=async()=>{
  try{
      await confirm({
        description:'Visszavonhatatlan mővelet',
        confirmationText:'Igen',
        cancellationText:'Mégsem',
        title:'Biztos törlöd?!'
      })
      console.log('igen')
      const result=await deleteFile(post.photoUrl)
      if(result){
        deletePost(post.id)
        navigate('/')

      }else
        console.log('nem sikeres törlés')
  }catch(err){
    console.log('Mégsem...')

  }
}
const handleLikes=async ()=>{
  if(user){
   // console.log(user.uid,params.id)
    let likesCount= await editLikes(params.id,user.uid)
    console.log(`Alikok száma:{likesCount}`)
    setLikes(likesCount)
    
  }else{
    console.log("Bejeletkezés szükséges!")
    setMsg('Bejelentkezés szükséges')
  }

}

  console.log(post);
  return (
    <div className='container p-3 details mx-auto'>
      <div className="img-container" 
      onClick={()=>window.open(post?.photoUrl,'_blank')}>
        {post && <img src={post?.photoUrl} alt={post?.title} className='img-fluid rounded  img'/>}
      </div>
      
      <h3 className='text-center'>{post?.title}</h3>
      <p>{post?.author}</p>
      {post && <p>{ parse(post?.description)}</p>}
      <div className="d-flex justify-content-between">
        <div className=''>
          <FaThumbsUp className='text-primary' onClick={handleLikes}/>
          <span>{likes==0 ? '': likes}</span>
        </div>
        {(user && post && user.uid==post.userId) &&
        <div >
          <FaTrash className='text-danger me-2' onClick={handleDelete}/>
          <FaPen className='text-info' onClick={()=>navigate('/update/'+post.id)}/>
        </div>}
      </div>
      {msg && <MyAlert text={msg} />}
      <div className="d-flex justify-content-center">
        <button className="btn btn-light"
          onClick={()=>navigate('/')}
        >Vissza...</button>
      </div>
    </div>
  )
}
