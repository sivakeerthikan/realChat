// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js";

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyB0TZGoUD0wB4KNhD3dSoTaufDuIdZi7ZU",
    authDomain: "login-8d6db.firebaseapp.com",
    databaseURL: "https://login-8d6db-default-rtdb.firebaseio.com",
    projectId: "login-8d6db",
    storageBucket: "login-8d6db.firebasestorage.app",
    messagingSenderId: "535288660473",
    appId: "1:535288660473:web:18555b28ef332ca1cd3d28",
    measurementId: "G-L3PBCRMLQV"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get Auth instance
const analytics = getAnalytics(app);
// Handle Google Login
const googleLoginButton = document.getElementById('google-login');
googleLoginButton.addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((result) => {
            const user = result.user;
            document.getElementById('user-email').textContent = `Welcome, ${user.email}`;
            document.getElementById('login-container').style.display = 'none';
            document.getElementById('user-info').style.display = 'block';

            // Redirect to realChat.html after successful login
            window.location.href = 'realChat.html';  // Updated redirection path
        })
        .catch((error) => {
            console.error('Error during login', error);
        });
});

/*
// Handle Logout
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        document.getElementById('login-container').style.display = 'block';
        document.getElementById('user-info').style.display = 'none';
    }).catch((error) => {
        console.error('Error during logout', error);
    });
});*/
