import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import {db} from '../Fire'
import firebase from 'firebase'
import Forgotpassword from './Forgotpassword'

function Login(props){
  const {setlName,lname,name, setName, email, setEmail, password, setPassword, handleLogin, handleSignup, hasAccount, setHasAccount, emailError, passwordError } = props
  function determineLoading (){
      if(props.loading) {
       return <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      }else {
        return 'Log in'
      }
  }
  return (
    <>
     <Route exact path='/'>
     <div className='login'>
    <div className="spacer1"></div>
    
        <div className="title">
        <i class="fal fa-comments"></i>
        <h1>{hasAccount?'Log In':'Register'}</h1>
        </div>
        <div className="spacer1"></div>
          <div className="logincontainer">
            <form onSubmit={(e)=>e.preventDefault()}>
              <label style={{display: hasAccount?'none': 'flex'}}>
                <span>Name</span>
                <input type="text" placeholder='John Doe' onChange={(e)=>setName(e.target.value)}/>
              </label>

              <label>
                <span>Email</span>
                <input type="text" value={email} placeholder='store@mail.com' onChange={(e)=>setEmail(e.target.value)}/>
              </label>
              <label>
                <span>Password</span>
                <input type="password" placeholder='password' value={password}onChange={(e)=>setPassword(e.target.value)}/>
              </label>
              {hasAccount?
              <div className='btnContainer'>
                <button className='themeBtn' onClick={handleLogin}>{determineLoading()}</button>
              <Link exact to='/forgotpassword' className='forgotPasswordButton' >Forgot your password?</Link>
              <small>Don't have an account<span onClick={()=>setHasAccount(!hasAccount)}>? Register</span></small>
                
              </div>:
              
              <div className='btnContainer'>
                  <button className='themeBtn' style={{marginBottom: '10px'}} onClick={handleSignup}>Register</button>
                  <small>Already have an account<span onClick={()=>setHasAccount(!hasAccount)}>? Sign in</span></small>
                  
              </div>}
            </form> 
             
          </div>
        
      </div>
     </Route>
     <Route exact path='/forgotpassword'>
          <Forgotpassword />
     </Route>
     </>
  )
}
export default Login
