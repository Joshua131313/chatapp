import {db} from '../Fire'
import firebase from 'firebase'

export function StartConvo(recipientid, message, convoid, recipientname){
    const user = firebase.auth().currentUser
    
    let convoinfo = {
      convoid,
      creatorid: user.uid,
      creatorname: user.displayName,
      recipientid,
      recipientname,
      typerid: user.uid,
      userref: db.collection('users').doc(recipientid),
      // usertyping: false,

    }
    let customizedconvo = {
      theme: 'https://i.imgur.com/4hzNTTq.png',
      emoji: 'fad fa-smile-wink',
    }
    let nicknames ={
      nickname1: '',
      nickname2 : '',
    }
    let messages = {
      message,
      reaction: '',
      msgdate: firebase.firestore.Timestamp.now(),
      msgid: db.collection('conversations').doc().id,
      read: false,
      senderid: user.uid,
      sendername: user.displayName, 
      editing: false,
    }
    db.collection('users').doc(user.uid).update({
      msgids: firebase.firestore.FieldValue.arrayUnion(convoid),
      msgpersonids: firebase.firestore.FieldValue.arrayUnion(recipientid)
    })
    db.collection('users').doc(recipientid).update({
      msgids: firebase.firestore.FieldValue.arrayUnion(convoid),
      msgpersonids: firebase.firestore.FieldValue.arrayUnion(user.uid)

    })
    db.collection('conversations').doc(convoid).set({
      convoinfo,
      messages: firebase.firestore.FieldValue.arrayUnion(messages),
      customizedconvo      
    })
  }