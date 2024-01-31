// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDCb6OYOzPuaApMXQEvffQNV0WLLjiIZ3k",
  authDomain: "proj-1-af99b.firebaseapp.com",
  projectId: "proj-1-af99b",
  storageBucket: "proj-1-af99b.appspot.com",
  messagingSenderId: "148550589092",
  appId: "1:148550589092:web:7b6ff33d2f103d37312431",
  measurementId: "G-STD8EL5GKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);