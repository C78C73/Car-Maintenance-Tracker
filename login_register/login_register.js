// Redirect to the landing page when the login form is submitted
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const email = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    if (email && password) {
        // Redirect to the landing page
        window.location.href = '../landing/landing.html';
    } else {
        alert('Please fill out both email and password fields.');
    }
});