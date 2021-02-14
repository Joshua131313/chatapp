import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import Users from './Users'
import {db} from '../Fire'
import firebase from 'firebase'
function Userrow (props) {
  const [keyword, setKeyword]=useState('')
  const pattern = new RegExp('\\b' + keyword.replace(/[\W_]+/g,""), 'i')

    const {convoinfo, setConvoinfo, setChatuser, chatuser}= props 
    const [userlist, setUserlist]=useState([])
    const [convos, setConvos]=useState([])

    const  user = firebase.auth().currentUser
    const allconvos = convos && convos.map(el=>{
      if(user){
          return <Users  chatuser={chatuser} setChatuser={setChatuser} el={el} convoinfo={convoinfo} setConvoinfo={setConvoinfo}/>    

      }else {
        return null
      }
    })
    useEffect(()=>{
     db.collection('users').doc(user.uid).onSnapshot(user=>{
       const userlist = user.data()
       setUserlist(userlist)
       db.collection('conversations').onSnapshot(snap=>{
         let convos = []
          snap.forEach(doc=>{
            if(userlist.msgids.includes(doc.id)){
              convos.push(doc.data())
            }
          })
          setConvos(convos)
       })
     })
    },[])
  return (
   <>
    <h2>Chats</h2>
     <div className="search abs">
      
       <i class="far fa-plus"  onClick={()=>props.setAdduser()}></i>
       <input type="text" placeholder='Search' onFocus={()=>props.setAdduser()}/>
     </div> 
     <div className="startconvo">
      
     </div>
   
     <div className="users">
     {allconvos}     
     </div>
    
  </>
  )
}
export default Userrow