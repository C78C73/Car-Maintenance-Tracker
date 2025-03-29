import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

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
    const setupTogglePassword = (inputId, toggleId) => {
        const passwordInput = document.getElementById(inputId);
        const togglePassword = document.getElementById(toggleId);

        if (togglePassword && passwordInput) {
            togglePassword.addEventListener("click", () => {
                if (passwordInput.type === "password") {
                    passwordInput.type = "text";
                    togglePassword.innerHTML = '🗖';
                } else {
                    passwordInput.type = "password";
                    togglePassword.innerHTML = '👁';
                }
            });
        }
    };

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const customPopup = document.getElementById('customPopup');
    const closePopupButton = document.getElementById('closePopup');

    if (loginForm) {
        setupTogglePassword('loginPassword', 'togglePassword');

        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const emailInput = document.getElementById('loginEmail');
            const passwordInput = document.getElementById('loginPassword');

            const email = emailInput.value;
            const password = passwordInput.value;

            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                
                console.log("User logged in:", userCredential.user);
                customPopup.style.display = 'flex';
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

    if (registerForm) {
        setupTogglePassword('registerPassword', 'toggleRegisterPassword');
        setupTogglePassword('confirmPassword', 'toggleConfirmPassword');

        registerForm.addEventListener('submit', async (event) => {
            event.preventDefault(); 

            const emailInput = document.getElementById('registerEmail');
            const passwordInput = document.getElementById('registerPassword');
            const confirmPasswordInput = document.getElementById('confirmPassword');

            const email = emailInput.value;
            const password = passwordInput.value;
            const confirmPassword = confirmPasswordInput.value;

            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                
                console.log("User registered:", userCredential.user);
                customPopup.style.display = 'flex';
            } catch (error) {
                switch(error.code) {
                    case 'auth/email-already-in-use':
                        alert("Email is already registered. Please use a different email or log in.");
                        break;
                    case 'auth/invalid-email':
                        alert("Invalid email address.");
                        break;
                    case 'auth/weak-password':
                        alert("Password is too weak. Please use a stronger password.");
                        break;
                    default:
                        alert("Error registering: " + error.message);
                        console.error("Registration error:", error);
                }
            }
        });
    }

    if (closePopupButton) {
        closePopupButton.addEventListener('click', () => {
            customPopup.style.display = 'none';
            window.location.href = '../landing/landing.html';
        });
    }
});