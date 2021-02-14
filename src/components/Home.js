import React, {useState, useEffect, useContext} from 'react'
import firebase from 'firebase'
import {db} from '../Fire'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect, useLocation } from "react-router-dom" 
import Usersettings from './Usersettings'
import {ContextApp} from '../ContextAPI'
function Body (props) {
  const user = firebase.auth().currentUser
  function determineTime(){
      const d = new Date()
      if(d.getHours()>=12&&d.getHours()<17) {
       return 'Good Afternoon,'
      }else if(d.getHours()>=17&&d.getHours()<20) {
       return 'Good Evening,'
      }else if(d.getHours()>=20&& d.getHours()<6){
        return 'Good Night,'
      }else if(d.getHours()>=6 && d.getHours()<12){
       return 'Good Morning,'
      }
    
  }
  function determinetext(){
    if(user){
      return determineTime()+' '+ user.displayName.split(' ').slice(0,1)
    }
  }
  return (
      <div className="home">
         <div className="header flexrow sb">
         <h2>{determinetext()}</h2>
        
         </div>
         <div className='flex fe'>
         <h2>Navigate</h2>
         <div className="gridobjects bs">
          <Link to='/chat' className='blueback one flexrow sa'><i className="fal fa-comment-alt"></i><p>Chat</p></Link>
          <Link to='/notifications' className='blueback two flexrow sa'><i className="fal fa-bell"></i>Notifications</Link>
          <Link to='/settings' className='blueback three flexrow sa'><i className="fal fa-cog"></i>Settings</Link>
          <Link to='/' onClick={()=>props.handleLogout()} className='blueback four flexrow sa'><i className="fal fa-sign-out"></i><p>Logout</p></Link>
         </div>
         </div>
      </div>
  )
}
export default Body