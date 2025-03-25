// Get car nickname from URL
const urlParams = new URLSearchParams(window.location.search);
const carNickname = urlParams.get('car') || 'Unknown';

// Update the car nickname in the header
document.getElementById('carNickname').textContent = carNickname;

// Form elements
const carMakeInput = document.getElementById('carMake');
const carModelInput = document.getElementById('carModel');
const carYearInput = document.getElementById('carYear');
const carNicknameInput = document.getElementById('carNicknameInput');
const flowchartList = document.getElementById('flowchartList');

// Modal elements
const entryModal = document.getElementById('entryModal');
const modalTitle = document.getElementById('modalTitle');
const modalDate = document.getElementById('modalDate');
const modalDescription = document.getElementById('modalDescription');
const closeModalButton = document.getElementById('closeModal');

// Alert element
const alert = document.getElementById('alert');

// Function to show "Save Changes" alert
function showAlert(message) {
    if (alert) {
        alert.textContent = message;
        alert.classList.add('show');
        setTimeout(() => {
            alert.classList.remove('show');
        }, 3000); // Hide after 3 seconds
    } else {
        console.warn('Alert element not found');
    }
}

// Check if the car is new or pre-existing
if (carNickname === 'NewCar') {
    // Clear the form for a new car
    carMakeInput.value = '';
    carModelInput.value = '';
    carYearInput.value = '';
    carNicknameInput.value = '';
} else {
    // Populate the form with mock data for a pre-existing car
    carMakeInput.value = 'Toyota';
    carModelInput.value = 'Camry';
    carYearInput.value = '2020';
    carNicknameInput.value = carNickname;

    // Generate a mock flowchart for repair history
    const mockFlowchartData = [
        { date: '2023-01-15', title: 'Oil Change', description: 'Changed engine oil' },
        { date: '2023-03-10', title: 'Tire Replacement', description: 'Replaced all tires' },
        { date: '2023-12-05', title: 'Brake Pads Replacement', description: 'Replaced front brake pads' },
    ];

    // Add mock data to the flowchart
    mockFlowchartData.forEach(entry => {
        addFlowchartEntry(entry.date, entry.title, entry.description);
    });
}

// Function to format dates to MM/DD/YYYY
function formatDate(dateString) {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

// Function to add a new entry to the flowchart
function addFlowchartEntry(date, title, description) {
    const listItem = document.createElement('li');
    listItem.textContent = `${formatDate(date)} - ${title}`;
    listItem.dataset.date = date;
    listItem.dataset.title = title;
    listItem.dataset.description = description;

    // Add click event to edit the entry
    listItem.addEventListener('click', () => {
        const entryDate = document.getElementById('entryDate');
        const entryTitle = document.getElementById('entryTitle');
        const entryDescription = document.getElementById('entryDescription');

        // Populate the form with the entry's data for editing
        entryDate.value = listItem.dataset.date;
        entryTitle.value = listItem.dataset.title;
        entryDescription.value = listItem.dataset.description;

        // Remove the entry from the list temporarily
        flowchartList.removeChild(listItem);

        // Update the "Add Entry" button to "Update Entry"
        const addEntryButton = document.getElementById('addFlowchartEntry');
        addEntryButton.textContent = 'Update Entry';

        // Handle updating the entry
        addEntryButton.addEventListener('click', () => {
            if (entryDate.value && entryTitle.value && entryDescription.value) {
                addFlowchartEntry(entryDate.value, entryTitle.value, entryDescription.value);
                entryDate.value = '';
                entryTitle.value = '';
                entryDescription.value = '';
                addEntryButton.textContent = 'Add Entry'; // Reset button text
            } else {
                alert('Please fill out all fields.');
            }
        }, { once: true });
    });

    flowchartList.appendChild(listItem);
}

// Handle adding a new flowchart entry
document.getElementById('addFlowchartEntry').addEventListener('click', () => {
    const entryDate = document.getElementById('entryDate').value;
    const entryTitle = document.getElementById('entryTitle').value;
    const entryDescription = document.getElementById('entryDescription').value;

    if (entryDate && entryTitle && entryDescription) {
        addFlowchartEntry(entryDate, entryTitle, entryDescription);
        document.getElementById('entryDate').value = '';
        document.getElementById('entryTitle').value = '';
        document.getElementById('entryDescription').value = '';
        showAlert('Entry added successfully!');
    } else {
        alert('Please fill out all fields.');
    }
});

// Handle saving the flowchart
document.getElementById('saveFlowchart').addEventListener('click', () => {
    showAlert('Flowchart saved successfully!');
    // Add logic to save the flowchart data to storage or backend
});

// Handle closing the modal
closeModalButton.addEventListener('click', () => {
    entryModal.classList.add('hidden');
});