import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, get, set } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

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

// Function to check user authentication state
function checkAuthState() {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            console.log("User is logged in");
            const data = await getUserData(user);

            if (data["setup"]){
                if(data["setup"] !== "Yes"){
                    window.location.href = "../settings/settings.html"
                }
            } else {
                window.location.href = "../settings/settings.html"
            }
            
            if (data["paid"]){
                if(data["paid"] == "Yes"){
                    window.location.href = "../dashboard/index.html"
                }
            }

        } else {
            console.log("User is not logged in");
            window.location.href = "../login/login.html"
        }
    });
}

// Call the function to check authentication state
checkAuthState();

// Rest of your script...



document.getElementById('pay').addEventListener('click', async function() {
    const auth = getAuth();
    const user = auth.currentUser;
    const data = await getUserData(user);
    data["paid"] = "Yes"

    if (user) {
        // Get the database reference
        const database = getDatabase();
        const userRef = ref(database, 'users/' + user.uid);

        // Set the 'paid' status for the user
        set(userRef, data).then(() => {
            console.log('Data saved successfully!');
            // You can redirect or perform other actions here after successful data submission
            window.location.href = "../dashboard/index.html"
        }).catch((error) => {
            console.error('Failed to save data', error);
        });
    } else {
        console.log('No user is signed in.');
    }
    
});

