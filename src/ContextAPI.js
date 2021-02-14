import React, { createContext, useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import firebase from 'firebase'
import { db } from './Fire'
export let ContextApp=createContext()
let ContextAppProvider=(props)=>{
  const user = firebase.auth().currentUser
  const [darkmode, setDarkmode]=useState(false)
  const [widemode, setWidemode]=useState(false)
  const [chatcolor, setChatcolor]=useState('')
  if(user) {
    db.collection('users').doc(user.uid).onSnapshot(snap=>{
      let user = snap.data()
      setDarkmode(user.customization.darkmode)
      setWidemode(user.customization.widemode)
      setChatcolor(user.customization.chatcolor)
    })
  }
  return (
    <ContextApp.Provider value={{darkmode, widemode, chatcolor}}>
      {props.children}
    </ContextApp.Provider>
  )
}
export default ContextAppProvider