import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBK7AQTFWXSHPQj93uuauypL9ZtIDz1d_Y",
    authDomain: "car-maintenance-tracker-fac0a.firebaseapp.com",
    projectId: "car-maintenance-tracker-fac0a",
    messagingSenderId: "4022406592",
    appId: "1:4022406592:web:7b6f2e13842dca36780c25",
    measurementId: "G-JT5GDF6VQS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.getElementById('togglePassword');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const emailInput = loginForm.querySelector('input[type="email"]');
            const passwordInput = loginForm.querySelector('input[type="password"]');
            
            const email = emailInput.value;
            const password = passwordInput.value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                
                console.log("User logged in:", userCredential.user);
                alert("Login successful!");
                
                window.location.href = '../landing.html';
            } catch (error) {
                switch(error.code) {
                    case 'auth/user-not-found':
                        alert("No user found with this email. Please register first.");
                        break;
                    case 'auth/wrong-password':
                        alert("Incorrect password. Please try again.");
                        break;
                    case 'auth/invalid-email':
                        alert("Invalid email address.");
                        break;
                    default:
                        alert("Error logging in: " + error.message);
                        console.error("Login error:", error);
                }
            }
        });
    }

    if (togglePassword) {
        togglePassword.addEventListener("click", () => {
            const passwordField = document.getElementById("password");
            
            if (passwordField.type === "password") {
                passwordField.type = "text";
                togglePassword.innerHTML = '🗖';
            } else {
                passwordField.type = "password";
                togglePassword.innerHTML = '👁';
            }
        });
    }
});