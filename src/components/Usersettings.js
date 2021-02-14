import React, {useState, useEffect, useContext} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import firebase from 'firebase'
import {db} from '../Fire'
import Account from './settings/Account'
import Personalization from './settings/Personalization'
import Support from './settings/Support'
import Preferences from './settings/Preferences'
import { CSSTransition } from 'react-transition-group'
import Themes from './settings/Themes'
import {ContextApp} from '../ContextAPI'
import {useHistory} from 'react-router-dom'
import Contextmenu from './Contextmenu'

function Usersettings (props) {
  const [keyword, setKeyword]=useState('')
  const pattern = new RegExp('\\b' + keyword.replace(/[\W_]+/g,""), 'i')
  const history = useHistory()
  const {settings, type, link, linklabel, BrowserHistory}=props
  const [themebool, setThemebool]=useState(false)
  const [emojibool, setEmojibool]=useState(false)
  const [miniview, setMiniview]=useState(false)
  const {darkmode}=useContext(ContextApp)
  const user = firebase.auth().currentUser
  const [notifi, setNotifi]=useState(false)
  const [notificont, setNotificont]=useState({
    emoji: '',
    msg: ''
  })
  const [themeimg, setThemeimg]=useState('')
  const [emojitype, setEmojitype]=useState('')
  const [darkmode1, setDarkmode]=useState(false)
  const [widemode, setWidemode]=useState(false)
  const [chatcolor, setChatcolor]=useState('')
  const [contextmenu, setContextmenu]=useState(false)
  const [contextstyle, setContextstyle]=useState({
    top: 0,
    left: 0,
  })
  const themes = [
    {img:'https://wallpaperaccess.com/full/1288078.jpg', type: 'background'},
    {img:'https://www.setaswall.com/wp-content/uploads/2019/08/Whatsapp-Wallpaper-072.jpg',type: 'background'},
    {img:'http://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max', type: 'background'},
    {img:'https://i.imgur.com/05HfuHW.jpg',type: 'background'},
    {img:'https://i.imgur.com/Frdc6vv.jpg',type: 'background'},
    {img:'https://i.imgur.com/3St6WoQ.jpg',type: 'background'},
    {img: 'https://i.imgur.com/R4TMmVd.jpg', type: 'background'},
    {img: 'https://i.imgur.com/8UIUZae.jpg', type: 'background'},
    {img:'https://i.imgur.com/yfwxwo1.jpg' , type: 'gradient'},
    {img:'https://i.imgur.com/HTQ2T1O.jpg', type: 'gradient'},
    {img:'https://i.imgur.com/z0zjGrS.jpg', type: 'gradient'},
    {img:'https://i.imgur.com/NXUqzHa.jpg', type: 'gradient'},
    {img:'https://i.imgur.com/bT0t5lL.jpg' , type: 'gradient'},
    {img: 'https://i.imgur.com/TE4sKjU.jpg', type: 'gradient'},
    {img: 'https://i.imgur.com/4hzNTTq.png', type: 'default'},  
]
  const emojis= [
      ' fa-tired yellow',
      ' fa-surprise yellow',
      ' fa-smile-wink yellow',
      ' fa-smile-beam yellow',
      ' fa-sad-tear blue',
      ' fa-sad-cry blue',
      ' fa-meh-rolling-eyes blue',
      ' fa-meh-blank yellow',
      ' fa-laugh-wink yellow',
      ' fa-laugh-squint yellow',
      ' fa-laugh-beam yellow',
      ' fa-laugh yellow',
      ' fa-kiss-wink-heart red',
      ' fa-kiss-beam red',
      ' fa-kiss red',
      ' fa-grin-wink purple',
      ' fa-grin-tongue-wink purple',
      ' fa-grin-tongue-squint yellow',
      ' fa-grin-tongue yellow',
      ' fa-grin-tears yellow',
      ' fa-grin-stars blue',
      ' fa-grin-squint-tears yellow',
      ' fa-grin-squint yellow',
      ' fa-grin-hearts red',
      ' fa-grin-beam-sweat yellow',
      ' fa-grin-beam yellow',
      ' fa-grin-alt yellow',
      ' fa-grin yellow',
      ' fa-grimace red',
      ' fa-frown-open yellow',
      ' fa-flushed yellow',
      ' fa-dizzy yellow',
      ' fa-angry red',
      ' fa-smile yellow',
      ' fa-meh yellow',
      ' fa-frown purple',
  ]
function selectEmoji(el){
  setEmojitype("fad"+el)
  setNotifi(true)
  setNotificont({
    emoji: 'fad'+el,
    msg: 'Emoji selected!'
  })
  setTimeout(()=>{
    setNotifi(false)
  },3500)
  setEmojibool(false)
  }
function selectTheme(el){
  setThemeimg(el)
  setNotifi(true)
  setNotificont({
    emoji: 'fal fa-check-circle',
    msg: 'Theme selected!'
  })
  setTimeout(()=>{
    setNotifi(false)
  },3500)
  setThemebool(false)
}
  let emojisrow = emojis &&emojis.map(emoji=>{
      return <div className="emojidiv"onClick={()=>selectEmoji(emoji)}>
        <i className={'fad'+emoji} ></i>
      </div>
  })

    let themesrow = themes && themes.map(theme=>{
        if(pattern.test(theme.type.toLowerCase())){
          return <div className="theme bs flex">
          <div className="img"> <img src={theme.img} alt=''/></div>
           <div className="select flexrow">
           <p>Select this theme:</p>
           <i className='fal fa-check-circle'  onClick={()=>{selectTheme(theme.img)}}></i>
           </div>
       </div>
        }
    })

  function updateProfile(){
    const updateObj ={
      darkmode: darkmode1,
      widemode,
      chatcolor
    }
    db.collection('users').doc(user.uid).update({
      customization :  updateObj  
    }).then(()=>{
      setNotifi(true)
      setNotificont({
        emoji: 'fal fa-check-circle',
        msg: 'Profile has been updated!'
      })
    })
    setTimeout(()=>{
      setNotifi(false)
    },3500)
  }
  function contextMenu(e){
    let customcontext = document.querySelector('.contextmenu')
    const bounding = customcontext.getBoundingClientRect();
      e.preventDefault() 
      setContextmenu(true)
      customcontext.style.top= `${e.pageY-customcontext.clientHeight}px`
      customcontext.style.left= `${e.pageX-customcontext.clientWidth}px`

    }
  useEffect(()=>{
    db.collection('users').doc(user.uid).onSnapshot(snap=>{
      const user = snap.data()
      setDarkmode(user.customization.darkmode)
      setWidemode(user.customization.widemode)
      setChatcolor(user.customization.chatcolor)
    })
  },[])

    return (
   <>
    <div onContextMenu={(e)=>contextMenu(e)} className={darkmode?"settingsgrid flex darkmode":'settingsgrid flex'}>
        <div className="links  flex">
            <div className="section1 flex">
              <h2>Settings</h2>
            <NavLink onClick={()=>setNotifi(false)} activeClassName='bs' exact to={'/'+link.link0}>{linklabel.link0}</NavLink>
            <NavLink onClick={()=>setNotifi(false)} activeClassName='bs'  to={`/${type}/${link.link1}`}>{linklabel.link1}</NavLink>
            </div>
            <hr/>
            <div className="section2 flex">
            <NavLink onClick={()=>setNotifi(false)} activeClassName='bs'  to={`/${type}/${link.link2}`}>{linklabel.link2}</NavLink>
            <NavLink onClick={()=>setNotifi(false)} activeClassName='bs' to={`/${type}/${link.link3}`}>{linklabel.link3}</NavLink>
              {type==='settings'?'':<hr/>}
             {type==='settings'?'':  <Link  to={'/chat/'+props.diag.convoinfo.convoid} style={{marginTop:'5px'}}>Return to Chat</Link>}
            </div>
        </div>
        <div className="paths bs">
          <Switch>
          <Route exact path={`/${link.link0}`}>
            {type==='settings'?<Account  notifi={notifi} notificont={notificont} setNotifi={setNotifi} setNotificont={setNotificont}/>:<Themes setEmojitype={setEmojitype} emojitype={emojitype} setEmojibool={setEmojibool} themeimg={themeimg} setThemeimg={setThemeimg} themebool={themebool} setThemebool={setThemebool} chatuser={props.chatuser} notifi={notifi} notificont={notificont} setNotifi={setNotifi} setNotificont={setNotificont} convoid={props.diag.convoinfo.convoid} miniview={miniview} setMiniview={setMiniview}/>}
          </Route>
          <Route  path={`/${type}/${link.link1}`}>
              <Preferences />
          </Route>
          <Route  path={`/${type}/${link.link2}`}>
            {type==='settings'?<Personalization function1={updateProfile} input1={darkmode1} input3={chatcolor} input2={widemode} setInput1={setDarkmode} setInput3={setChatcolor} setInput2={setWidemode}/>:''}
          </Route>
          <Route path={`/${type}/${link.link3}`}>
              <Support />
          </Route>

          </Switch>
        
        </div>
       <CSSTransition in={notifi} timeout={300} classNames='displayerror' unmountOnExit>
       <div className="errormsg bs" >
        <i className={notificont.emoji}></i> <p>{notificont.msg}</p>
        <i className="far fa-times" onClick={()=>setNotifi(false)}></i>    
        </div>
       </CSSTransition>
        <CSSTransition in={themebool} timeout={300} classNames={"themesdisplay"} unmountOnExit>
          <>
        <div className="screen" onClick={()=>setThemebool(false)}></div> 
          
        <div className='themes bs flex'>
          
      
          <div className="filterBtn flex">
            <h2>Filter: </h2>
              <div className="flexrow">
              <button className={keyword===''?'themeBtn active':'themeBtn'} onClick={()=>setKeyword('')}>All</button>      
              <button className={keyword==='background'?'themeBtn active':'themeBtn'} onClick={()=>setKeyword('background')}>Images</button>      
              <button className={keyword==='gradient'?'themeBtn active':'themeBtn'} onClick={()=>setKeyword('gradient')}>Gradients</button>      
              <button className={keyword==='default'?'themeBtn active':'themeBtn'} onClick={()=>setKeyword('default')}>Default</button>      
              </div>
            </div>
        
          <div className="flex">  
         <p className='themestitle'>Themes: </p>
         {themesrow}
          </div>
          </div>
          </>
        </CSSTransition>
        <CSSTransition in={emojibool} timeout={300} classNames={"emojidisplay"} unmountOnExit>
          <>
          <div className="screen" onClick={()=>setEmojibool(false)}></div> 
          
        <div className='emojiwindow bs flexrow'>
            <div className="emojistitle">
              <h2>Select Emoji</h2>
              <div className="flexrow flexwrap">
              {emojisrow}
              </div>
            </div>
          </div>
          </>
        </CSSTransition>
        <CSSTransition in={miniview} timeout={300} classNames={'miniviewdisplay'} unmountOnExit>
            <div className="miniviewdisplay bs" >
              <img src={themeimg} alt=""/>
            </div>
        </CSSTransition>
      
          <Contextmenu emojitype={emojitype} setEmojibool={setEmojibool} setThemebool={setThemebool} contextstyle={contextstyle} type={'settings'} contextmenu={contextmenu} setContextmenu={setContextmenu}/>
    </div>
  </>
  )
}
export default Usersettings