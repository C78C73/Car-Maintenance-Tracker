// Reference the theme toggle dropdown
const themeToggle = document.getElementById('themeToggle');
const alert = document.getElementById('alert');

// Function to show "Changes Saved" alert
function showAlert(message) {
    if (alert) {
        alert.textContent = message;
        alert.classList.add('show');
        setTimeout(() => {
            alert.classList.remove('show');
        }, 3000);
    } else {
        console.warn('Alert element not found');
    }
}

// Fallback updateTheme function if not defined
function updateTheme(theme) {
    localStorage.setItem('theme', theme);
    document.body.className = theme + '-mode';
}

// Set the dropdown to the saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
if (themeToggle) {
    themeToggle.value = savedTheme;

    // Update the theme when the dropdown changes
    themeToggle.addEventListener('change', () => {
        const selectedTheme = themeToggle.value;
        updateTheme(selectedTheme);
        showAlert('Theme updated!');
    });
}

// Save Settings Button
const saveSettingsButton = document.getElementById('saveSettings');
if (saveSettingsButton) {
    saveSettingsButton.addEventListener('click', () => {
        console.log('Settings changes saved!');
        showAlert('Settings changes saved!');
    });
}

// Save Settings Button
const saveProfileButton = document.getElementById('saveProfile');
if (saveProfileButton) {
    saveProfileButton.addEventListener('click', () => {
        console.log('Settings changes saved!');
        showAlert('Settings changes saved!');
    });
}