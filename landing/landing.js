// Set default profile picture with a green background
const profileCircle = document.querySelector('.profile-circle');
const dropdownMenu = document.querySelector('.dropdown-menu');

// Check if an image exists inside the profile circle
if (!profileCircle.querySelector('img')) {
    profileCircle.classList.add('default'); // Add the "default" class
    profileCircle.innerHTML = ''; // Ensure no text or broken image is displayed
}

// Toggle dropdown visibility on profile picture click
profileCircle.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the click from propagating to the document
    dropdownMenu.classList.toggle('active'); // Toggle the "active" class
});

// Keep dropdown open when hovering over it
dropdownMenu.addEventListener('mouseenter', () => {
    dropdownMenu.classList.add('active');
});
dropdownMenu.addEventListener('mouseleave', () => {
    dropdownMenu.classList.remove('active');
});

// Close the dropdown when clicking outside of it
document.addEventListener('click', () => {
    dropdownMenu.classList.remove('active'); // Remove the "active" class
});

// Handle "Add Car" button click
document.getElementById('addCar').addEventListener('click', () => {
    // Redirect to flowchart.html with a default car name
    window.location.href = '../flowchart/flowchart.html?car=NewCar';
});

// Handle existing car links
document.querySelectorAll('.car-link').forEach(carLink => {
    carLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent default anchor behavior
        const carName = carLink.getAttribute('data-car'); // Get car name from data attribute
        // Redirect to flowchart.html with the selected car name
        window.location.href = `../flowchart/flowchart.html?car=${encodeURIComponent(carName)}`;
    });
});