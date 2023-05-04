// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore'
//import { getStorage } from "firebase/storage";
//import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz6dPj0LbWby7o5ffMLNtghSwdvNFFoEI",
  authDomain: "pocketshopper-b60ed.firebaseapp.com",
  databaseURL: "https://pocketshopper-b60ed-default-rtdb.firebaseio.com",
  projectId: "pocketshopper-b60ed",
  storageBucket: "pocketshopper-b60ed.appspot.com",
  messagingSenderId: "356096408639",
  appId: "1:356096408639:web:3e46d88e75a32604540c8a",
  measurementId: "G-E7FGJZ4XNY"
};

// Initialize Firebase
//const analytics = getAnalytics(app);
/*const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export {db}; */

// Initialize Cloud Storage and get a reference to the service
//const storage = getStorage(app);

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
export {firebase};