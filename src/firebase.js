//install firebase using npm i firebase before executing this file

import firebase from "firebase";
//copied from firebase project setting-->config
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDbU4jkOF4Hay23CCnQ3FxoV1_VoKqq0mk",
    authDomain: "insta-clone-c3a24.firebaseapp.com",
    projectId: "insta-clone-c3a24",
    storageBucket: "insta-clone-c3a24.appspot.com",
    messagingSenderId: "732201565602",
    appId: "1:732201565602:web:6b327592c09c422f2586fb",
    measurementId: "G-P58KE4BX35"
  })


  //creating three firebase services
  const db=firebaseApp.firestore();//storing json object
  const auth=firebase.auth();//fore security
  const storage=firebase.storage();//file storage


  export{db,auth,storage};
