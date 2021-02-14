import firebase from 'firebase'

const  firebaseApp = firebase.initializeApp ({
  apiKey: "AIzaSyChwGy1Z1jzlrAxivYaq71r7Nlbc65u_Wo",
  authDomain: "chat-3943a.firebaseapp.com",
  projectId: "chat-3943a",
  storageBucket: "chat-3943a.appspot.com",
  messagingSenderId: "53187875245",
  appId: "1:53187875245:web:ed73204351ac3b9f709124",
  measurementId: "G-028L2BESN6"
});

const db= firebaseApp.firestore()
const Fire = firebaseApp
export  {db, Fire}
