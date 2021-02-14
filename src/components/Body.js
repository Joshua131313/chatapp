import React, {useState, useEffect, useContext} from 'react'
import Sidebar from './Sidebar'
import firebase from 'firebase'
import {db} from '../Fire'
import Usernav from './Usernav'
import Userrow from './Userrow'
import Dialogue from './Dialogue'
import Userprofile from './Userprofile'
import Adduser from './Adduser'
import {CSSTransition, TransitionGroup} from 'react-transition-group'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect, useLocation } from "react-router-dom" 
import {StartConvo} from './StartConvo'
import Paths from './Paths'
import Account from './settings/Account'
import Personalization from './settings/Personalization'
import Chatsettings from './Chatsettings'
import Usersettings from './Usersettings'
import {ContextApp} from '../ContextAPI'
function Body (props) {
  const user = firebase.auth().currentUser
  const [convoinfo, setConvoinfo]=useState({
    unreadmsgs: 0
  })
  const {darkmode, widemode}=useContext(ContextApp)
  const [chatuser, setChatuser]=useState('')
  const {handleLogout, setLoading} =props
  const [msgpersonids, setMsgpersonids]=useState([])
  const [adduser, setAdduser]=useState(false)
  const [convolist, setConvolist]=useState([])
  const [userlist, setUserlist]=useState([])
  const [allusers, setAllusers]=useState([])
  const [message, setMessage]=useState('')
  const [recipientid, setRecipientid]=useState('')
  const [recipientname, setRecipientname]=useState('')
  const onedialogue = convolist && convolist.map(diag=>{
    return  <Route exact path={'/chat/'+diag.convoinfo.convoid}>
      <Dialogue diag={diag} chatuser={chatuser}/>
    </Route>
       
  })
  const chatsettings = convolist && convolist.map(diag=>{
    return <Route  path={'/chatsettings/'+diag.convoinfo.convoid}> 
       <Usersettings chatuser={chatuser} diag={diag} settings={'chat'} type={'chatsettings'} link={{link0: 'chatsettings/'+diag.convoinfo.convoid,link1: diag.convoinfo.convoid+'/actions', link2: diag.convoinfo.convoid+'/privacy', link3: diag.convoinfo.convoid+'/support' }} linklabel={{link0: 'Themes',link1: 'Actions', link2: 'Privacy', link3: 'Support'}}/>
    </Route>
  })
  const userprofile = convolist&&convolist.map(diag=>{
        return (<Route exact path={'/chat/'+diag.convoinfo.convoid}>
          <Userprofile diag={diag} chatuser={chatuser}/>
        </Route>)
  })
  function sendMessage() {
    if(message.length){
      setAdduser(!adduser)
      let convoid = db.collection('conversations').doc().id
      StartConvo(recipientid, message, convoid, recipientname)
    }
  } 


  useEffect(()=>{
    db.collection('users').doc(user.uid).onSnapshot(user=>{
      const userlist = user.data()
      setMsgpersonids(userlist.msgpersonids)
      setUserlist(userlist)
      db.collection('conversations').onSnapshot(snap=>{
        let convos = []
        snap.forEach(doc=>{
          if(userlist.msgids.includes(doc.id))
            convos.push(doc.data())
        })         
        setConvolist(convos)    
      })
    })
    db.collection('users').where('uid','!=',user.uid).onSnapshot(snap=>{
      const users = []
      snap.forEach(el=>{
        users.push(el.data())
      })
      setAllusers(users)
    })
    setLoading(false)
        
  },[])
  return (
    <div className={widemode?'body widebody':'body'}>
        
      <div className={darkmode?"sidebar darkmode":'sidebar'} >
          <Sidebar  handleLogout={handleLogout} />
      </div>
        <Switch>
            <Paths handleLogout={handleLogout} chatsettings={chatsettings} chatuser={chatuser} setChatuser={setChatuser} userprofile={userprofile} onedialogue={onedialogue} convoinfo={convoinfo}  setConvoinfo={setConvoinfo} adduser={adduser} setAdduser={()=>setAdduser(!adduser)}/>
        </Switch>
       <CSSTransition in={adduser} classNames={'adduser'} unmountOnExit timeout={300}>
       <Adduser setRecipientname={setRecipientname} message={message} msgpersonids={msgpersonids} sendMessage={sendMessage} setMessage={setMessage} setRecipientid={setRecipientid} allusers={allusers} setAdduser={setAdduser} recipientid={recipientid} adduser={adduser}/>
       </CSSTransition>
    </div>
  )
}
export default Body