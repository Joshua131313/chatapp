import React, {useState, useEffect, useContext} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import firebase from 'firebase'
import { db } from '../Fire'
import {ContextApp} from '../ContextAPI'
function Sidebar (props) {
  const {darkmode, chatcolor, widemode}=useContext(ContextApp)

  const {handleLogout}=props
  const [userimg, setUserimg]=useState('')
  const [username, setUsername]=useState('')
  const [loader, setLoader]=useState(false)
  const user = firebase.auth().currentUser
  
  function updateProfile(){
      db.collection('users').doc(user.uid).update({
          customization: {
            widemode: !widemode,
            darkmode,
            chatcolor
          }
      })
  }
  useEffect(()=>{
    setLoader(true)
    db.collection('users').doc(user.uid).get().then(snap=>{
      const user = snap.data()  
      setUserimg(user.userinfo.cover)
      setUsername(user.userinfo.name)
      setLoader(false)
    })
  },[])
  return (
   <>
        <div className="profilepic profilepiccol">
            {loader?<div className={loader?'loader':'loader'}><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>:widemode?<><img src={userimg} alt=""/><p>{username}</p></>:<img src={userimg} alt=""/>}
        </div>
        <div className="icons">
           <NavLink activeClassName='activelink' exact to='/'><i class="far fa-home"></i>{widemode?<p>Home</p>:''}</NavLink>
            <NavLink activeClassName='activelink'   to='/chat'><i class="far fa-comment-alt"></i>{widemode?<p>Chat</p>:''}</NavLink>
           <NavLink activeClassName='activelink' to='notifications'><i class="far fa-bell"></i>{widemode?<p>Notifications</p>:''}</NavLink>
           <NavLink activeClassName='activelink' to='podcast'><i class="fal fa-podcast"></i>{widemode?<p>Podcast</p>:''}</NavLink>
            <NavLink activeClassName='activelink'  to='/settings'><i class="fal fa-cog"></i>{widemode?<p>Settings</p>:''}</NavLink>
            <NavLink exact to='/' onClick={()=>{handleLogout()}}> <i  class="fal fa-sign-out-alt"></i>{widemode?<p>Logout</p>:''}</NavLink> 
           <Link onClick={()=>{updateProfile()}}><i class={widemode?"fal fa-chevron-double-right rotate":'fal fa-chevron-double-right'}></i></Link>
        </div>    
       { widemode?'':<><div></div>
        <div></div></>}
  </>
  )
}
export default Sidebar