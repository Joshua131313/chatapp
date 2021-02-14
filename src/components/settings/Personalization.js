import React, {useState, useEffect} from 'react'
import { BrowserRouter as Router,Switch,Route,Link,NavLink, Redirect } from "react-router-dom" 
import Switches from '../Switches'
import Input from '../Input'
import firebase from 'firebase'
import { db } from '../../Fire'
import Button from '../Button'

function Personalization (props) {
  const user = firebase.auth().currentUser
  const {function1, input1, input2, input3, setInput1, setInput2, setInput3} = props
  const [hovered, setHovered]=useState(false)


  return (
   <div className='customize'>
 <div><h2>Customize</h2></div>
    <small>Customize your chat settings.</small>
    <hr/>
      <div className="spacer1"></div>
    <div className="flex">
      <Switches title={'Dark Mode'} checked={input1} setChecked={setInput1}/>
      <Switches title={'Wide Sidebar'} checked={input2} setChecked={setInput2}/>
      <Input type={'color'} title={'Chat Color'} value={input3} setValue={setInput3}/>
      <Button type={'button'} state1={hovered} setState1={setHovered} style={input3}  function1={function1} addstyle={true} />
    </div>
  </div>
  )
}
export default Personalization