import React, {useState, useEffect, useRef} from 'react'
import { NavLink, Route , Link} from 'react-router-dom'
import Users from './Users'
import firebase from 'firebase'
import {db} from '../Fire'
import Contextmenu from './Contextmenu'

import {CSSTransition, TransitionGroup} from 'react-transition-group'
import ElapsedTime from './Elapsedtime'
function Dialogue (props) {
    const [msgs, setMsgs]=useState([])
    const [msgstring, setMsgstring]=useState('')
    const [updateelapsed, setUpdateelapsed]=useState(0)
    const [typing, setTyping]=useState(false)
    const [realtyping, setRealtyping]=useState(false)
    const [typerid, setTyperid]=useState('')
    const [activestatus, setActivestatus]=useState(false)
    const [recipname, setRecipname]=useState('')
    const [recipimg, setRecipimg]=useState('')
    const [recipcity, setRecipcity]=useState('')
    const [recipcountry, setRecipcountry]=useState('')
    const [userimg, setUserimg]=useState('')
    const [username, setUsername]=useState('')
    const [visible, setVisible]=useState(false)
    const [contextmenu, setContextmenu]=useState(false)
    const [contextstyle, setContextstyle]=useState({
      top: 0,
      left: 0,
    })
    const [emojitype, setEmojitype]=useState('')
    const [loader, setLoader]=useState(true)
    const [loading, setLoading]=useState(true)
    const [chatcolor, setChatcolor]=useState('')
    const [showinput, setShowinput]=useState(false)
    const [updatedMsg, setUpdatedMsg]=useState('')    
    const [emojilist, setEmojilist]=useState(false)
    const [theme, setTheme]=useState('')
    const [msgid, setMsgid]=useState('')
    const [chatname, setChatname]=useState('')
    const [chatimg, setChatimg]=useState('')
    const [chatcity, setChatcity]=useState('')
    const [chatcountry, setChatcountry]=useState('')
    const [chatactive, setChatactive]=useState('')
    const [nickname, setNickname]=useState([])
    const {chatuser}=props
    const {messages} = props.diag
    const {convoid, creatorid, recipientid} = props.diag.convoinfo
    const user = firebase.auth().currentUser
    const typerRef = useRef()
    const allmsgs = messages && messages.slice(0).reverse().map(msg=>{
    return  <div id={msg.msgid} className={msg.senderid===user.uid?'right m':'left m'} onContextMenu={(e)=>contextMenu(e)}>
      <div className='flex'>
       <p  className="msg" contentEditable={false} style={msg.senderid===user.uid?{backgroundColor: chatcolor}:{}}>{msg.message}</p>
      <small  className='edit' onClick={()=>editMsg()} style={{display: 'none'}}>Edit</small>
      <small className={msg.senderid===user.uid?'alignRight elapsedtime':'alignLeft elapsedtime'}></small>
      <div className='reaction' style={{display: msg.reaction?'flex':'none'}} >
     <i className={msg.reaction==='fad fa-heart'?'emoj fas fa-'+msg.reaction:'emoj fad fa-'+msg.reaction}></i>
      </div>
     </div>
     <img src={msg.senderid===user.uid?userimg:chatimg} alt="" />
     </div>
    })
    const icons = ['image', 'paperclip', 'microphone']
    let iconsrow = icons.map(icon=>{
          return <div className='bs'><i className={'fal fa-'+icon}></i></div>
    })
    
    function editMsg(){
      msgs && msgs.map(msg=>{
        if(msgid===msg.msgid){
          let itemindex = msgs.indexOf(msg)
          msgs[itemindex].message=updatedMsg
          db.collection('conversations').doc(convoid).update({
              messages: msgs
          })
        }
    })
    }
    function contextMenu(e){
      let customcontext = document.querySelector('.contextmenu')
      const bounding = customcontext.getBoundingClientRect();
        e.preventDefault() 
        setMsgid(e.currentTarget.getAttribute('id'))
        setContextmenu(true)
        customcontext.style.top= `${e.pageY-201}px`
        customcontext.style.left= `${e.pageX}px`

       if(!updatedMsg===''){
        editMsg()
       }
      }

    function sendMessage(){
      if(msgstring.replace(/\s/g, '').length){
        let msgobject = {
          message: msgstring,
          reaction: '',
          msgdate: firebase.firestore.Timestamp.now(),
          msgid: db.collection('conversations').doc().id,
          read: false,
          senderid: user.uid,
          editing : false,
        }
        db.collection('conversations').doc(convoid).update({
          messages: firebase.firestore.FieldValue.arrayUnion(msgobject)
        })
        setMsgstring('')
        typerRef.current.setAttribute('style','height: 50px')
      }
    }
    function triggerSend(e){
      if(e.keyCode === 13 && !e.shiftKey){
        e.preventDefault()
        sendMessage()
      }
    }
    function formatTextarea(){
      let typer = typerRef.current
      if(msgstring.replace(/\s/g,'').length){
        typer.setAttribute('style', 'height:'+(typer.scrollHeight)+'px')
        typer.style.height= (this.scrollHeight)+'px'
      }
      if(msgstring===''){
        typer.style.height='20px'
      }
      // setTyping(true)
      // showTypingAnim()
    }
    function showTypingAnim(){
      setTyperid(user.uid)
      let infoobj = {
        convoid, 
        creatorid,
        recipientid,
        usertyping: typing,
        userref: db.collection('users').doc(recipientid),
        typerid
      }
      db.collection('conversations').doc(convoid).update({
        // convoinfo: infoobj
      }).then(()=>{
        db.collection('conversations').doc(convoid).onSnapshot(snap=>{
          // setTyperid(snap.data().convoinfo.typerid)
          // setRealtyping(snap.data().convoinfo.usertyping)
        })
      })
    }
  useEffect(()=>{
      let timer = setInterval(()=>{
        setUpdateelapsed(prev=>prev+1)
      }, 60000)
      return()=>{
        clearInterval(timer)
      }

  },[])
  useEffect(() => {
    let timer = setInterval(() => {
      setTyping(false)
    }, 4000)
    // showTypingAnim()
    return() => {
      clearInterval(timer)  
    }
  },[typing])

  useEffect(()=>{
    db.collection('users').doc(creatorid).onSnapshot(snap=>{
      const user = snap.data()
      setRecipname(user.userinfo.name)
      setRecipimg(user.userinfo.cover)
      setRecipcity(user.userinfo.city)
      setRecipcountry(user.userinfo.country)
      })
      db.collection('users').doc(recipientid).onSnapshot(snap=>{
        const user = snap.data()
        // setUserimg(user.userinfo.cover)
        // setUsername(user.userinfo.name)
      })
      db.collection('users').doc(chatuser).onSnapshot(snap=>{
        const user = snap.data()
        setChatname(user.userinfo.name)
        setChatimg(user.userinfo.cover)
        setChatcity(user.userinfo.city)
        setChatcountry(user.userinfo.country)
        setChatactive(user.online) 
        setActivestatus(user.userinfo.online)  
        setLoading(false)
      })


  },[creatorid, recipientid, chatuser])
  useEffect(()=>{
    db.collection('users').doc(user.uid).onSnapshot(snap=>{
      const user = snap.data()
      setChatcolor(user.customization.chatcolor)
      setUserimg(user.userinfo.cover)
    })
  },[chatcolor])
  useEffect(()=>{ 
    db.collection('conversations').doc(convoid).onSnapshot(snap=>{
      let use = snap.data()
      setMsgs(use.messages)
      setLoader(false)
      setTheme(use.customizedconvo.theme)
      setEmojitype(use.customizedconvo.emoji)
    })
},[convoid])

  return (
   <>
    <div className="top bs">
       <div className="profilepic">
         <div className='relative'>
         {loading?<div className={'loader blue reloader'}><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>:[<img src={chatimg} alt=""/>, <div className="notifi" style={{backgroundColor:chatactive?'rgb(44, 255, 44)':'#FF3D3D'}}></div>]}
         </div>
         <div>
         <p>{chatname}</p>
          <small>{chatactive?'Online':'Offline'}</small>
         </div>
       </div>
       <div className="controls">
       <i class="fal fa-phone-alt"></i>
       <i class="fal fa-video"></i>
        <Link exact to={'/chatsettings/'+convoid} ><i style={{padding: '0 5px'}} class="fal fa-ellipsis-v" ></i></Link>
     </div>
    </div>
             <Route render={({location})=>(
              <div className='msgs' style={theme?{backgroundImage: 'url('+theme+')'}:{backgroundImage: 'url(https://i.imgur.com/4hzNTTq.png)'}}>
             
              <div className="grid" >
                <div className="scrollto"></div>

               {loader?<div className={loader?'loader opa':'loader'}><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>:allmsgs}
               </div>

              </div>
            )}/>

    <Contextmenu setShowinput={setShowinput} editMsg={editMsg} setUpdatedMsg={setUpdatedMsg} convoid={convoid} type={'msg'} msgid={msgid} setMsgid={setMsgid} setContextmenu={setContextmenu} contextmenu={contextmenu} contextstyle={contextstyle}/>
    <div className="search whiteb bs">
      <div className="plus" >
     
          <i class={visible?'fal fa-minus':'fal fa-plus'} onClick={()=>setVisible(!visible)}></i>
          <CSSTransition
          in={visible}
          timeout={300}
          classNames="iconshover"
          unmountOnExit
          >
          <div className={'icons'} >
          {iconsrow}
          </div>
          </CSSTransition>
      </div>
      <textarea type="text" placeholder='Send a message...' onKeyUp={(e)=>triggerSend(e)} ref={typerRef} value={msgstring} onChange={(e)=>{setMsgstring(e.target.value);formatTextarea()}}/>
      <i class={emojitype}></i>
      <i class="fal fa-paper-plane" onClick={()=>sendMessage()}></i>
    </div>
  </>
  )
}
export default Dialogue