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

// Save Settings Button
const saveSettingsButton = document.getElementById('saveSettings');
if (saveSettingsButton) {
    saveSettingsButton.addEventListener('click', () => {
        console.log('Settings changes saved!');
        showAlert('Settings changes saved!');
    });
}

// Profile Save Button
const saveProfileButton = document.getElementById('saveProfile');
if (saveProfileButton) {
    saveProfileButton.addEventListener('click', () => {
        console.log('Profile changes saved!');
        showAlert('Profile changes saved!');
    });
}