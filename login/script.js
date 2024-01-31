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
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)



        document.getElementById('googleLogin').addEventListener('click', function() {
            const provider = new GoogleAuthProvider();

            signInWithPopup(auth, provider)
            .then((result) => {
            // After successful authentication, redirect to the signup page
            
            routeUser()
            //window.location.href = '../signup/signup.html';
            })
            .catch((error) => {
            // Handle Errors here
            console.error(error);
                });
        });






        async function routeUser() {
            const data = await getUserDataAsJSON();
            

            if (data == null){
                window.location.href = "../settings/settings.html"
            }




            if (data["setup"]){
                if(data["setup"] !== "Yes"){
                    window.location.href = "../settings/settings.html"
                }
            } else {
                window.location.href = "../settings/settings.html"
            }
            
            if (data["paid"]){
                if(data["paid"] !== "Yes"){
                    window.location.href = "../pay/pay.html"
                }
            } else {
                window.location.href = "../pay/pay.html"
            }

            if (data["setup"] == "Yes" && data["paid"] == "Yes"){
                window.location.href = "../dashboard/index.html"
            }
            








            
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
                        console.log(userData);
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
        