const savedTheme = localStorage.getItem('theme') || 'dark';

function updateTheme(theme) {
    localStorage.setItem('theme', theme);
    document.body.className = theme + '-mode';
}

function initializeTheme() {
    updateTheme(savedTheme);
}

document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const alert = document.getElementById('alert');

    initializeTheme();

    if (themeToggle) {
        themeToggle.value = savedTheme;

        themeToggle.addEventListener('change', () => {
            const selectedTheme = themeToggle.value;
            updateTheme(selectedTheme);
            
            if (alert) {
                alert.textContent = 'Theme updated!';
                alert.classList.add('show');
                setTimeout(() => {
                    alert.classList.remove('show');
                }, 3000);
            }
        });
    }
});

function showAlert(message) {
    const alert = document.getElementById('alert');
    if (alert) {
        alert.textContent = message;
        alert.classList.add('show');
        setTimeout(() => {
            alert.classList.remove('show');
        }, 3000);
    }
}