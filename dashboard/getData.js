import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

// Firebase configuration
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
const auth = getAuth(app);

// Function to get user data
async function getUserData(user) {
    const database = getDatabase(app);
    const userRef = ref(database, 'users/' + user.uid);
    try {
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.log("No data available");
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}