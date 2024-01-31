import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, push, set, get } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";




const firebaseConfig = {
apiKey: "AIzaSyDCb6OYOzPuaApMXQEvffQNV0WLLjiIZ3k",
authDomain: "proj-1-af99b.firebaseapp.com",
projectId: "proj-1-af99b",
storageBucket: "proj-1-af99b.appspot.com",
messagingSenderId: "148550589092",
appId: "1:148550589092:web:7b6ff33d2f103d37312431",
measurementId: "G-STD8EL5GKW"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const user = auth.currentUser;










var user_data = {
    paid: "Yes"
}





document.getElementById('pay').addEventListener('click', function() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        // Get the database reference
        const database = getDatabase();
        const userRef = ref(database, 'users/' + user.uid);

        // Set the 'paid' status for the user
        set(userRef, {
            paid: "Yes"
        }).then(() => {
            console.log('Data saved successfully!');
            // You can redirect or perform other actions here after successful data submission
        }).catch((error) => {
            console.error('Failed to save data', error);
        });
    } else {
        console.log('No user is signed in.');
    }
    
});
