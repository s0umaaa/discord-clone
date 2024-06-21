import React, { useEffect } from 'react';
import './App.scss';
import Sidebar from './components/sidebar/Sidebar';
import Chat from './components/chat/Chat';
import  Login  from './components/login/Login';
import { useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { auth } from './firebase';
import { login, logout } from './features/userSlice';


function App() {

  const user= useAppSelector((state)=> state.user.user);
  //const user =null;
  //console.log(user);

  const dispatch = useAppDispatch()

  useEffect(( )=>{
    auth.onAuthStateChanged((loginUser)=>{
      console.log(loginUser);
      if(loginUser){
        dispatch(login({
          uid: loginUser.uid,
          photo: loginUser.photoURL,
          emial: loginUser.email,
          displayName: loginUser.displayName,
        }))
      }else{
        dispatch(logout())
      }
    })
  },[dispatch]);

  return (<div className="App">
    {user ?
    (
      <>
    <Sidebar/>
    <Chat/>
      </>

    ):(
      <>
      <Login/>
      </>
    )}</div>
    );
}

export default App;
