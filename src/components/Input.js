import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
function Input (props) {
  const {type, title, value, setValue, placeholder} = props
  return (
   <div className='input flexrow sb'>
     <p>{title}</p>
     <input required placeholder={placeholder} type={type} value={value} onChange={(e)=>setValue(e.target.value)}/>
    </div>
  )
}
export default Input