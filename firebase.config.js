//import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyDz6dPj0LbWby7o5ffMLNtghSwdvNFFoEI",
  authDomain: "pocketshopper-b60ed.firebaseapp.com",
  projectId: "pocketshopper-b60ed",
  storageBucket: "pocketshopper-b60ed.appspot.com",
  messagingSenderId: "356096408639",
  appId: "1:356096408639:web:3e46d88e75a32604540c8a",
  measurementId: "G-E7FGJZ4XNY"
};

// Initialize Firebase
//const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);