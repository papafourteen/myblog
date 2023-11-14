import React from "react";
import {Form,FormGroup,Label,Row,Col} from 'reactstrap'
import { useForm } from 'react-hook-form';
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { NotFound } from "./NotFound";
import { useState } from "react";
import { Loader } from "../components/Loader";
import { uploadAvatar, uploadFile } from "../utility/uploadFile";
import { MyAlert } from "../components/MyAlert";
import { useConfirm } from "material-ui-confirm";
import { deleteProfile } from "../utility/crudUtility";




export const Profile = ({setAvatar}) => {
  const {user,logoutUser}=useContext(UserContext)
  const {register,handleSubmit,formState: { errors },} = useForm();
  const [loading,setLoading]=useState(false)
  const [photo,setPhoto]=useState(null)
  const [uploaded,setUploaded]=useState(false)
  const confirm=useConfirm()
  if(!user) return ( <NotFound/>)

  const onSubmit=async (data,e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      const file=data.file[0]
      const photoUrl=await uploadAvatar(file,user.uid)
      console.log('a feltöltött fájl URLje:',photoUrl);
      setAvatar(photoUrl)
      setUploaded(true)
    }catch(error){
      console.log('Hiba a fájlfeltöltés során!');
    }finally{
      setLoading(false)
      //console.log('sikeres feltöltés');
    }
  
    e.target.reset()
    
  }
  console.log(user?.uid)

//console.log(errors);
//console.log(categories);

const handleDelete=async()=>{
  try{
    await confirm({
      description:'Visszavonhatatlan mővelet',
      confirmationText:'Igen',
      cancellationText:'Mégsem',
      title:'Biztos törlöd a fiókod?!'
    })
    console.log('delete-.....')
    deleteProfile(user.uid)
}catch(err){
    console.log('mégsem....')
}
}

  return (
    <div className="createBlog">
      <h3>Usre Profile</h3>
      <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
       <Col md={6}>
        <FormGroup>
          <Label>Avatar:</Label>
          <input type="file" {...register('file',{
                              required:true,
                              validate:(value)=>{
                                const acceptedFormats=['jpg','png']
                                const fileExtension=value[0]?.name.split('.').pop().toLowerCase()
                                if(!acceptedFormats.includes(fileExtension)) 
                                  return 'Invalid file format!'
                                if(value[0].size>1*1000*1024)
                                  return 'Max.file size allowed is 1MB !'
                                return true
                              }
                            })}  
          className="form-control" 
          onChange={(e)=>setPhoto(URL.createObjectURL(e.target.files[0]))}
          />

        <p className="errMsg">{errors?.file?.message}</p>
        </FormGroup>
        </Col>
        
       <Col md={2}>
         <input type="submit" className="btn btn-info" />
       </Col>
       
      <Col md={2}>
         {photo && <img src={photo} alt="postPhoto" className="img-thumbnail"/>}
      </Col>
     </Row>
          {loading && <Loader />}
        {uploaded && <MyAlert text='Avatar saved succesfully!' />}
      </Form>
      <button className="btn btn-danger m-2" onClick={handleDelete}>Felhasználó fiók törlése</button>
    </div>
  );
};

