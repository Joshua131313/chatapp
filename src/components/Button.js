import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import firebase from 'firebase'



function Button (props) {
  const {emoji,state1, setState1, setState2,style, function1, type, title, addstyle, state3, setState3}=props
  function styleFunc(){
    if(addstyle){
      if(state1){
        return {backgroundColor: 'transparent', border: 'solid 3px'+style, color: 'black'}
      }else {
        return {backgroundColor: style, border: 'solid 3px transparent'}
      }
    }
  }
  return (
      <div className='flexrow sb'>
      {type==='button'?<div></div>:<p>{title}</p>}
      {type==='button'?<button className='btn'   style={styleFunc()} onClick={()=>{function1()}} onMouseOver={()=>setState1 && setState1(true)} onMouseLeave={()=>setState1 && setState1(false)} >Save</button>:<i class={emoji} onClick={()=>{props.setState1(!state1); setState2 && setState2(true)}} onMouseOver={()=>setState3 && setState3(true)} onMouseLeave={()=>setState3 && setState3(false)}></i>}
      </div>
  )
}
export default Button
