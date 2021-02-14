import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import firebase from 'firebase'
import {db} from '../Fire'
function Users (props) {
  // const [name, setName]=useState('')
  // const [img, setImg]=useState('')
  // const [city, setCity]=useState('')
  // const [country, setCountry]=useState('')
  // const [job, setJob]=useState('')
  // const [recipnumber, setRecipnumber]=useState('')
  // const [recipemail, setRecipemail]=useState('')
  // const [recipwebsite, setRecipwebsite]=useState('')
  // const [extend, setExtend]=useState(false)
    const {convoinfo, setConvoinfo, el, setChatuser, chatuser}=props
    const [recipimg, setRecipimg]=useState('')
    // const {recipname, setRecipname, sendername, setSendername}=props
    const [recipname, setRecipname] = useState('')
    const [sendername, setSendername]=useState('')
    const [activestatus, setActivestatus]=useState(false)
    const [senderimg, setSenderimg]=useState('')
    const [loading, setLoading]=useState(true)
    const [msg, setMsg]=useState('')
    let user = firebase.auth().currentUser

    useEffect(()=>{
      db.collection('users').doc(el.convoinfo.recipientid).onSnapshot(snap=>{
        const user = snap.data()
        setRecipname(user.userinfo.name)
        setRecipimg(user.userinfo.cover)
        setActivestatus(user.userinfo.online)
        setLoading(false)
      })
      db.collection('users').doc(el.convoinfo.creatorid).onSnapshot(snap=>{
        const user = snap.data()
        setSendername(user.userinfo.name)
        setSenderimg(user.userinfo.cover)
        setLoading(false)
      })
      db.collection('conversations').doc(el.convoinfo.convoid).onSnapshot(snap=>{
        const msgs = snap.data()  
        setMsg(msgs.messages[msgs.messages.length-1])
      })
    },[el.convoinfo.recipientid, el, chatuser])
    return (
   <>
  <NavLink activeClassName='active' to={'/chat/'+el.convoinfo.convoid} onClick={()=>{setChatuser(el.convoinfo.creatorid===user.uid?el.convoinfo.recipientid:el.convoinfo.creatorid)}}>
      <div className="user">
          <div className="profilepic">
          {loading?<div class="lds-ring"><div></div><div></div><div></div><div></div></div>: <img src={el.convoinfo.creatorid===user.uid?recipimg:senderimg} alt=""/>}
          </div>
        <div className="info flex">
          <p>{el.convoinfo.creatorid===user.uid?recipname:sendername}</p>
          <small>{msg.senderid===user.uid?"You:":''} {msg.message}</small>        
          </div>
      </div>
  </NavLink>
  </>
  )
}
export default Users