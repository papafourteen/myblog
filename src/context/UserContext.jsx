import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged,signInWithEmailAndPassword,signOut,
createUserWithEmailAndPassword, 
updateProfile,
sendSignInLinkToEmail,
sendPasswordResetEmail} from 'firebase/auth';
import { auth } from '../utility/firebaseApp';
import { adminUserId } from '../firebaseConfig';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [msg,setMsg]=useState(null)
  const navigate=useNavigate()
  const [role,setrole]=useState('user')
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      currentUser?.uid==adminUserId ? setrole('admin') : setrole('user')
    });

    return () => unsubscribe();
  }, []);

  const logoutUser=async ()=>{
    await signOut(auth)
    if(location.pathname=='/create'|| location.pathname=='/profile')
    navigate('/')   

  }
  const loginUser=async (email,password)=>{
    try{
       await signInWithEmailAndPassword(auth,email,password)
       setMsg({...msg,signin:null})
      navigate('/')
      }catch(err){
        console.log(err.message)
        setMsg({...msg,signin:err.message})
    }
  }

  const sendEmailLink=async (email)=>{
    try{
        await sendSignInLinkToEmail(auth,email,{
          url:"http://localhost:5173/signin",
          handleCodeInApp:true
        })
        setMsg({...msg,signup:'we have sent you on reg email.'})
        
    }catch(err){
      console.log(err.message);
      setMsg({...msg,signup:err.message})
    }
  }

  const signUpUser=async (email,password,displayName)=>{
    try{
      await createUserWithEmailAndPassword(auth,email,password)
      await updateProfile(auth.currentUser,{displayName})
      sendEmailLink(email)
      logoutUser()
      setMsg({...msg,signup:null})
     
   }catch(err){
       console.log(err.message)
       setMsg({...msg,signup:err.message})
   }
  }

  const resetPassword=async (email)=>{
    try{
      await sendPasswordResetEmail(auth,email)
      alert('jelszómódosítási link elküldve....');
      navigate('/signin')
    }catch(err){
      console.log(err.message);
      setMsg({...msg, resetpw: err.message})
    }
  }

    return (
    <UserContext.Provider value={{ user,logoutUser,loginUser,signUpUser, resetPassword,msg,role}}>
      {children}
    </UserContext.Provider>
  );
};
