import React, {useState, useEffect} from "react";
import "./styles.css";
import {db, Fire} from './Fire'
import firebase from 'firebase'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import Sidebar from './components/Sidebar'
import Login from './components/Login'
import Body from './components/Body'
import ContextAppProvider from './ContextAPI'
function App() {
  const [update, setUpdate]=useState(0)
  const [user, setUser]=useState('')
  const [name, setName]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [emailError, setEmailError]=useState('')
  const [passwordError, setPasswordError]=useState('')
  const [hasAccount, setHasAccount]=useState(false)
  const [lname, setlName]=useState('')
  const [userinfo, setUserinfo]=useState([])
  const [users, setUsers]=useState([])
  const [cover, setCover]=useState('https://www.gettyimages.ca/gi-resources/images/500px/983794168.jpg')
  const [forgotpassword, setForgotpassword]=useState(false)
  const [msgids, setMsgIds] = useState([''])
  const [loading, setLoading]=useState(false)
  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }
  const clearErrors = () => {
    setEmailError('')
    setPasswordError('')
  }
  const handleLogin = () => {
   
    clearErrors()
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{setLoading(true)})
    .catch(err => {
      switch(err.code) {
        case "auth/invalid-email":
        case "auth/user/disabled":
        case "auth/user-not-found":
          setEmailError(err.message)
        break
        case "auth/wrong-password":
          setPasswordError(err.message)
        break
        default:
      }  
    })

  } 
  const handleSignup = () => {
    console.log('signup')
    clearErrors()
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
      switch(err.code) {
        case "auth/email-already-in-use":
        case "auth/invalid-email":
          setEmailError(err.message)
        break
        case "auth/weak-password":
          setPasswordError(err.message)
        break
        default: 
      }
    })
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
          user.updateProfile({
            displayName: name,
          }) 
          db.collection('users').doc(user.uid).set({
              created: new Date(), 
              msgids,
              uid: firebase.auth().currentUser.uid,
              online: true, 
              userinfo: {
                name,
                cover,
                age: '', 
                phone: '', 
                city: '',
                country: '',
                website: 'https://',
                job: '',
                email,
              },
              customization: {
                color: '#10325c',
                darkmode: false,
                widemode: false,
              }
          })
   
      }//if (user)
      else {
        setUser('')
      } 
    }) 
  }
  const handleLogout = () => {
    if(user) {
      db.collection('users').doc(user.uid).update({online: false})
    }
    firebase.auth().signOut()
  }
  const authListener = () => {
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        clearInputs()
        setUser(user)
        db.collection('users').doc(user.uid).update({online: true})
      }
      else {
        setUser('')
        db.collection('users').doc(user.uid).update({online: false})
      }
    })
  } 

  useEffect(() => { 
    authListener()
    window.addEventListener('onbeforeunload', removeActiveStatus) 
    function removeActiveStatus() {
      if(user) {
        db.collection('users').doc(user.uid).update({activestatus: false})
      }
    }
    if(user) {
      db.collection('users').doc(user.uid).update({activestatus: true})
    }
  },[])  

  return ( 
    
        <Router >
    <div className="App">
       {user?
        <ContextAppProvider>
        <>
          <Body setLoading={setLoading}  handleLogout={handleLogout}/>
        </>
        </ContextAppProvider>
        :
       <> 
          <Login loading={loading} name={name} setName={setName} lname={lname} setlName={setlName}email={email} setEmail={setEmail} password= {password} setPassword={setPassword} handleLogin={handleLogin} handleSignup={handleSignup} hasAccount={hasAccount} setHasAccount={setHasAccount} emailError={emailError} passwordError={passwordError}/>       
          <Redirect to='/'/>
       </>
        }
    </div>  
     </Router>

  );
}

export default App 
