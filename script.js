// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBK7AQTFWXSHPQj93uuauypL9ZtIDz1d_Y",
  authDomain: "car-maintenance-tracker-fac0a.firebaseapp.com",
  projectId: "car-maintenance-tracker-fac0a",
  messagingSenderId: "4022406592",
  appId: "1:4022406592:web:7b6f2e13842dca36780c25",
  measurementId: "G-JT5GDF6VQS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const analytics = getAnalytics(app);
const auth = getAuth(app);

console.log("Firebase initialized");

// Register a new user
const registerUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User registered:", user);
      alert("Registration successful!");
      window.location.href = "../landing.html";
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please log in.");
      } else if (error.code === "auth/weak-password") {
        alert("Password should be at least 6 characters.");
      } else {
        console.error("Error registering user:", error.message);
        alert("Error registering: " + error.message);
      }
    });
};

// Log in an existing user
const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User logged in:", user);
      alert("Login successful!");
      window.location.href = "../landing.html";
    })
    .catch((error) => {
      if (error.code === "auth/user-not-found") {
        alert("No user found with this email. Please register first.");
      } else if (error.code === "auth/wrong-password") {
        alert("Incorrect password. Please try again.");
      } else {
        console.error("Error logging in:", error.message);
        alert("Error logging in: " + error.message);
      }
    });
};

// Password toggle functionality
const setupPasswordToggle = () => {
  const passwordFields = document.querySelectorAll('.password-container input');
  const toggleButtons = document.querySelectorAll('.toggle-password');

  toggleButtons.forEach((toggleButton, index) => {
    toggleButton.addEventListener('click', () => {
      const passwordField = passwordFields[index];
      
      if (passwordField.type === "password") {
        passwordField.type = "text";
        toggleButton.innerHTML = '&#128470;'; // Eye with slash icon
      } else {
        passwordField.type = "password";
        toggleButton.innerHTML = '&#128065;'; // Regular eye icon
      }
    });
  });
};

// Form submission handlers
const setupFormHandlers = () => {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = loginForm.querySelector("#email").value;
      const password = loginForm.querySelector("#password").value;
      loginUser(email, password);
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = registerForm.querySelector("#email").value;
      const password = registerForm.querySelector("#password").value;
      registerUser(email, password);
    });
  }
};

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  setupPasswordToggle();
  setupFormHandlers();
});

// Existing example buttons (optional, can be removed)
document.getElementById("registerButton")?.addEventListener("click", () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  registerUser(email, password);
});

document.getElementById("loginButton")?.addEventListener("click", () => {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  loginUser(email, password);
});