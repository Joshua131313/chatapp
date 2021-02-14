import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import Inputs from '../Inputs'
import firebase from 'firebase'
import {db} from '../../Fire'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

function Account (props) {
  const user = firebase.auth().currentUser
  const [deleteuser, setDeleteuser]=useState('')
  const [name, setName]=useState('')
  const [age, setAge]=useState('')
  const [phonenumber, setPhonenumber]=useState('')
  const [city, setCity]=useState('')
  const [country, setCountry]=useState('')
  const [website, setWebsite]=useState('')
  const [uploaded, setUploaded]=useState(false)
  const [cover, setCover]=useState('')
  const [email, setEmail]=useState('')
  const [job, setJob]=useState('')
  const {notifi, setNotifi, notificont, setNotificont}=props
  function deleteUser(){
      if(deleteuser===user.displayName){
        db.collection('users').doc(user.uid).delete()
        user.delete().catch((err)=>{
          console.log(err)
        })
      }
  }
  function uploadImg(){
   
    let file = document.querySelector('.uploadpic').files[0]
    if(file.size <=2097152){ 
      setUploaded(!uploaded)
      let reader = new FileReader()
      reader.onloadend = function (){
        setCover(reader.result)
      }
      if(file){
        reader.readAsDataURL(file)
      }
    }else {
      setNotifi(true)
      setNotificont({
        msg: 'Image is too large',
        emoji: 'fal fa-exclamation-circle'
      })
      setTimeout(()=>{
        setNotifi(false)
      },3500)
    }
  }
  function saveImg(){
    setUploaded(!uploaded)
    updateProfile()
  
  }
  function removeImg(){
    setUploaded(false)  
    updateProfile()
    user.updateProfile({
      displayName: name,
    })
    const userobj = {
      job,
      age,
      city,
      country,
      phone: phonenumber,
      website, 
      name, 
      email,
      cover: 'https://www.gettyimages.ca/gi-resources/images/500px/983794168.jpg'
    }
    db.collection('users').doc(user.uid).update({
        userinfo: userobj
    })    

  }
  function updateProfile(){
    const userobj = {
      age,
      city,
      country,
      phone: phonenumber,
      website, 
      cover, 
      name, 
      email,
      job,
    }
    db.collection('users').doc(user.uid).update({
        userinfo: userobj
    }).then(()=>{ 
        setNotifi(true)
        setNotificont({
          msg: 'Profile was updated!',
          emoji: 'fal fa-check-circle'
        })
    }).catch(err=>{
      setNotifi(true)
      setNotificont({
        msg: 'Image is too large',
        emoji: 'fal fa-exclamation-circle'
      })
    })
    setTimeout(()=>{
      setNotifi(false)
    },3500)
  
  }
  useEffect(()=>{
    db.collection('users').doc(user.uid).onSnapshot(snap=>{
      const user = snap.data()
      setName(user.userinfo.name)
      setAge(user.userinfo.age)
      setPhonenumber(user.userinfo.phone)
      setCity(user.userinfo.city)
      setCountry(user.userinfo.country)
      setWebsite(user.userinfo.website)
      setCover(user.userinfo.cover)
      setEmail(user.userinfo.email)
      setJob(user.userinfo.job)
    })
  },[])

  return (
   <div className='account'>
      <div className="head">
        <h2>Account</h2>
      </div>
      <div className="profilepic">
            <img src={cover} alt=""/>
           {!uploaded?
            <label>
            <div className="settingBtn" onClick={()=>setNotifi(false)}>Upload</div>
            <input className='uploadpic' onChange={()=>uploadImg()} type="file" style={{display: 'none'}}/>
          </label>:
            <button className='settingBtn' onClick={()=>saveImg()}>Save</button>
        }
            <button className='settingBtn warning' onClick={()=>removeImg()}>Remove</button>
      </div>
      <hr/>
        <Inputs 
        name={name}
        setName={setName}
        age={age}
        setAge={setAge}
        phonenumber={phonenumber}
        setPhonenumber={setPhonenumber}
        city={city}
        setCity={setCity}
        country={country}
        setCountry={setCountry}
        website={website}
        setWebsite={setWebsite}
        updateProfile={updateProfile}
        />
      <hr/>
        <div className="flexrow inps">
        <label>
          <span style={{marginBottom: '10px'}}>Delete Account</span>
          <small>If you delete your account, all your data will be lost.</small>
         <input style={{width: '80%'}} placeholder={'Type in '+user.displayName} type="text" required onChange={(e)=>{setDeleteuser(e.target.value);}}/>
        </label>
        <label>
        <button  className={deleteuser===user.displayName?'themeBtn warning':'themeBtn warning disabled'} disabled={deleteUser===user.displayName?'false':'true'} style={{marginTop: '10px', width: '80%'}}  onClick={()=>deleteUser()}>Delete Account</button>
        </label>
        </div>
  </div>
  )
}
export default Account