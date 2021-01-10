import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/functions'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyDQXlUHSYNUEWF8sI3t3mW2mpAAF19QUpk",
  authDomain: "ogiri-73674.firebaseapp.com",
  projectId: "ogiri-73674",
  storageBucket: "ogiri-73674.appspot.com",
  messagingSenderId: "608639623509",
  appId: "1:608639623509:web:9313811dfc12865423cfdc",
  measurementId: "G-1TXLB3Q70Z"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase