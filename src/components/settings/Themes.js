import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import Switches from '../Switches'
import Input from '../Input'
import firebase from 'firebase'
import { db } from '../../Fire'
import Button from '../Button'

function Themes (props) {
  const user = firebase.auth().currentUser
  const {themeimg,setThemeimg,themebool,setEmojibool,setThemebool,notifi, setNotifi, notificont, setNotificont} = props
  const [hovered, setHovered]=useState(false)
  const [nickname, setNickname]=useState('')
  const [emoji, setEmoji]=useState('')
  const {convoid, setEmojitype, emojitype, miniview, setMiniview}=props
  function updateProfile(){
    setNotifi(true)
    setNotificont({
      msg: 'Profile was updated!',
      emoji: 'fal fa-check-circle'
    })
    db.collection('conversations').doc(convoid).update({
      customizedconvo: {
          emoji: emojitype,
          theme: themeimg
      }
    })

    setTimeout(()=>{
      setNotifi(false)
    },3500)
  }
  useEffect(()=>{
    db.collection('conversations').doc(convoid).onSnapshot(snap=>{
        const convo =  snap.data()
        setThemeimg(convo.customizedconvo.theme) 
        setEmojitype(convo.customizedconvo.emoji)
      })
  },[convoid])
  return (
   <div className='customize'>
 <div><h2>Themes</h2></div>
    <small>Customize your conversation settings.</small>
    <hr/>
      <div className="spacer1"></div>
    <div className="flex">
       <Button type='emoji' emoji='fad fa-adjust' title={'Theme'} setState1={setThemebool} state1={themebool} state3={miniview} setState3={setMiniview}/>
       <Button type={'emoji'} emoji={emojitype} title={'Emoji'} state1={emoji} setState1={setEmoji} setState2={setEmojibool}/>
       <Input  placeholder={'Nickname'} type={'text'}  title={'Nickname'} value={nickname} setValue={setNickname}/>
       <Button type={'button'}  function1={updateProfile}/>
    </div>
  </div>
  )
}
export default Themes