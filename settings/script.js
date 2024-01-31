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



document.getElementById('confirm').addEventListener('click', async function() {
    var name = document.getElementById("companyName").value
    var email = document.getElementById("customerEmail").value
    var phone = document.getElementById("customerPhone").value

    if (name && email && phone){
        console.log("form")

        const data = await getUserData()
        data["companyName"] = name
        data["companyEmail"] = email
        data["companyPhone"] = phone
        data["setup"] = "Yes"

        console.log(data)
        console.log(JSON.stringify(data))
        submitJSONAsUserData(JSON.stringify(data))

    } else {
        alert("You must fill all fields to continue.")
    }



});






async function getUserData() {
    const data = await getUserDataAsJSON();
    console.log(data)
    return data
    
}

function getUserDataAsJSON() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const database = getDatabase();
        const userRef = ref(database, 'users/' + user.uid);

        // Return the promise here
        return get(userRef).then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                return userData;
            } else {
                console.log("No data available");
                return null;
            }
        }).catch((error) => {
            console.error(error);
            return null;
        });
    } else {
        console.log("User is not logged in");
        return Promise.resolve(null);
    }
}


function submitJSONAsUserData(jsonData) {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
        const database = getDatabase();
        const userRef = ref(database, 'users/' + user.uid);

        try {
            const userData = JSON.parse(jsonData);
            set(userRef, userData).then(() => {
                console.log("User data updated successfully");
                window.location.href = "../dashboard/index.html"
            }).catch((error) => {
                console.error("Error updating user data: ", error);
                alert("error")
            });
        } catch (error) {
            console.error("Error parsing JSON data: ", error);
            alert("Error")
        }
    } else {
        console.log("User is not logged in");
        window.location.href = "../login/login.html"
    }
}
