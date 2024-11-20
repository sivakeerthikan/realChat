// Import the Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Firebase configuration (your app's credentials)
const firebaseConfig = {
    apiKey: "AIzaSyB0TZGoUD0wB4KNhD3dSoTaufDuIdZi7ZU",
    authDomain: "login-8d6db.firebaseapp.com",
    databaseURL: "https://login-8d6db-default-rtdb.firebaseio.com",
    projectId: "login-8d6db",
    storageBucket: "login-8d6db.firebasestorage.app",
    messagingSenderId: "535288660473",
    appId: "1:535288660473:web:18555b28ef332ca1cd3d28",
    measurementId: "G-L3PBCRMLQV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Firebase Database
const auth = getAuth(app); // Firebase Authentication

// DOM Elements
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const sendMessageButton = document.getElementById('send-message');
const logoutButton = document.getElementById('logout');

// Ensure user is authenticated
onAuthStateChanged(auth, (user) => {
    if (!user) {
        // Redirect to login page if user is not authenticated
        window.location.href = 'index.html';
    }
});

// Reference to the database path for messages
const messagesRef = ref(db, 'messages/');

// Listen for new messages and display them
onChildAdded(messagesRef, (data) => {
    const message = data.val();
    const messageElement = document.createElement('p');
    messageElement.textContent = `${message.sender}: ${message.text}`;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight; // Auto-scroll to the latest message
});

// Send a message
sendMessageButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
        const user = auth.currentUser;
        if (user) {
            push(messagesRef, {
                sender: user.displayName || user.email,
                text: messageText,
                timestamp: Date.now()
            }).then(() => {
                messageInput.value = ""; // Clear the input
            }).catch((error) => {
                console.error("Error sending message:", error);
            });
        } else {
            alert("You must be logged in to send messages.");
        }
    }
});

// Handle logout
logoutButton.addEventListener('click', () => {
    signOut(auth).then(() => {
        // Redirect to login page after successful logout
        window.location.href = 'index.html';
    }).catch((error) => {
        console.error('Error during logout:', error);
    });
});
