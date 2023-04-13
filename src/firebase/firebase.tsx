// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getFirestore } from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAsdZSBtGJnbFdODmgkFOoER3KR68lvmdE',
  authDomain: 'challanges-787f6.firebaseapp.com',
  projectId: 'challanges-787f6',
  storageBucket: 'challanges-787f6.appspot.com',
  messagingSenderId: '224769861722',
  appId: '1:224769861722:web:19d563765745b832679063',
  measurementId: 'G-06531PPXZ2',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
const analytics = getAnalytics(app)
