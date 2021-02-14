import React, {useState, useEffect} from 'react'

function Adduser (props) {
let {allusers, setRecipientname,setRecipientid, recipientid, setMessage, sendMessage, msgpersonids, adduser,setAdduser, message} = props
const [keyword, setKeyword]=useState('')
function determineDisplay(user){
  if(msgpersonids && msgpersonids.includes(user.uid)){
    return <i class="fal fa-exclamation-circle"></i>
  }
else if(recipientid===user.uid){
  return <i className="fal fa-check slct"></i>
}else {
  return <span className='slct'>Select</span>
}

}
const pattern = new RegExp('\\b' + keyword.replace(/[\W_]+/g,""), 'i')

const allusersrow = allusers && allusers.map(user=>{
  if(pattern.test(user.userinfo.name.toLowerCase())) {
    return  <div className={msgpersonids && msgpersonids.includes(user.uid)?"profilepic selected":'profilepic'}>
      <div>
      <img src={user.userinfo.cover?user.userinfo.cover:"https://www.gettyimages.ca/gi-resources/images/500px/983794168.jpg"} alt=""/>
       <p>{user.userinfo.name}</p>
      </div>
      <small onClick={msgpersonids && msgpersonids.includes(user.uid)?() => {setAdduser(!adduser);}:() => {setRecipientid(user.uid); setRecipientname(user.userinfo.name)}} className={recipientid===user.uid?"usersrowselected":""}>
        {determineDisplay(user)}
      </small>
</div>
  }
  })
  function actions (){
    setMessage('')
    setAdduser(!adduser)
  }
  return (
    <>
    <div className="adduser"onClick={()=>props.setAdduser()}>
      
    </div>
    <div className="userlist bs" >
          <div className="hd">
          <h2>Add Contact</h2>
          <div className="search">
            <input type="text" placeholder='Search' onChange={(e)=>setKeyword(e.target.value)}/>
          </div>
          </div>
          <div className="overflow flex">
       {allusersrow}
          </div>
          <div className="search">
          <input type="text" placeholder='Send a message...' onChange={(e)=>setMessage(e.target.value)} value={message}/>
          <button className="themeBtn" onClick={()=>{recipientid?sendMessage():actions()}}>Send Message</button>
          </div>
          <i className="fal fa-times" onClick={()=>props.setAdduser()}></i>
      </div>
    
    </>
  )
}
export default Adduser