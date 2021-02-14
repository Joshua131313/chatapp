import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import {db} from '../Fire'
import firebase from 'firebase'
function Inputs (props) {
    const {updateProfile,age, setAge, name, setName, city, setCity, phonenumber, setPhonenumber, website, setWebsite, country, setCountry}=props
    const user = firebase.auth().currentUser

 return (
<div className="inputs inps">
  <label>
    <span>Name</span>
    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} required placeholder='Name'/>
  </label>
  <label>
      <span>Age</span>
     <input type="number" value={age} onChange={(e)=>setAge(e.target.value)} min='1' required placeholder='Age'/>
  </label>
  <label>
      <span>Phone Number</span>
      <input type="number" value={phonenumber} onChange={(e)=>setPhonenumber(e.target.value)} required placeholder='Phone Number'/>
  </label>
  <label>
      <span>City</span>
     <input type="text" value={city} onChange={(e)=>setCity(e.target.value)} required placeholder='City'/>
  </label>
  <label>
     <span>Country</span>
     <input type="text" value={country} onChange={(e)=>setCountry(e.target.value)} required placeholder='Country'/>
  </label>
  <label>
     <span>Website URL</span>
     <input type="text" value={website} onChange={(e)=>setWebsite(e.target.value)} required placeholder='https://example.com'/>
  </label>
    <label className='btnContainer'>
    <button className="themeBtn" onClick={()=>updateProfile()}>Save</button>
    </label>
</div>
  )
}
export default Inputs